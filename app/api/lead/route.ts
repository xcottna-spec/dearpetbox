import { NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

// POST /api/lead — 맞춤진단 완료 데이터 수신
// 1) Vercel 대시보드 > 프로젝트 > Logs 에서 [DEARPET-LEAD] 로 즉시 확인 가능
// 2) Supabase 키 설정 시 dog_profiles 테이블에 영구 저장 (event=profile|checkout)
// 3) SHEET_WEBHOOK_URL 설정 시 구글시트(사이트퀴즈 탭)에도 미러링

async function mirrorToSheet(body: Record<string, unknown>) {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) return;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ at: new Date().toISOString(), ...body }),
      signal: controller.signal,
    });
  } catch (e) {
    console.error("[DEARPET-LEAD] sheet mirror 실패:", (e as Error).message);
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, error: "invalid body" }, { status: 400 });
  }

  // 운영자 확인용 구조화 로그 (Vercel Logs)
  console.log(
    "[DEARPET-LEAD]",
    JSON.stringify({ at: new Date().toISOString(), ...body })
  );

  if (isSupabaseConfigured) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.from("dog_profiles").insert({
        event: body.event ?? "profile",
        name: body.name ?? null,
        breed: body.breed ?? null,
        age_months: body.ageMonths ?? null,
        weight_range: body.weight ?? null,
        gender: body.gender ?? null,
        phone: body.phone ?? null,
        allergies: body.allergies ?? [],
        allergy_note: body.allergyNote ?? null,
        no_allergy: body.noAllergy ?? null,
        preferences: { textures: body.textures ?? [], flavors: body.flavors ?? [] },
        health_goals: body.healthGoals ?? [],
        plan: body.plan ?? null,
        plan_name: body.planName ?? null,
        raw: body,
      });
      if (error) {
        console.error("[DEARPET-LEAD] supabase insert 실패:", error.message);
      }
    }
  }

  // 구글시트 미러링 (설정 시) — 응답 지연 최소화를 위해 2.5초 제한
  await mirrorToSheet(body);

  return NextResponse.json({ ok: true });
}
