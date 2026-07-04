import { NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

// POST /api/lead — 맞춤진단 완료 데이터 수신
// 1) Vercel 대시보드 > 프로젝트 > Logs 에서 [DEARPET-LEAD] 로 즉시 확인 가능
// 2) Supabase 키 설정 시 dog_profiles 테이블에 영구 저장
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
        name: body.name ?? null,
        breed: body.breed ?? null,
        age_months: body.ageMonths ?? null,
        weight_range: body.weight ?? null,
        gender: body.gender ?? null,
        allergies: body.allergies ?? [],
        preferences: { textures: body.textures ?? [], flavors: body.flavors ?? [] },
        health_goals: body.healthGoals ?? [],
      });
      if (error) {
        console.error("[DEARPET-LEAD] supabase insert 실패:", error.message);
      }
    }
  }

  return NextResponse.json({ ok: true });
}
