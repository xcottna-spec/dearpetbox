import { NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

// GET /api/profile/restore?user=<회원ID>  (또는 &phone=<휴대폰>)
// 계정과 연결된 가장 최근 프로파일을 반환한다 — 새 기기/브라우저 로그인 시 복원용.
// 매칭 키: 가입·결제 lead 에 실린 raw.userId, 보조 키: phone.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get("user");
  const phone = searchParams.get("phone");
  if (!user && !phone) {
    return NextResponse.json({ ok: false, error: "user or phone required" }, { status: 400 });
  }
  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: false, error: "supabase not configured" }, { status: 501 });
  }
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "client init failed" }, { status: 500 });
  }

  let query = supabase.from("dog_profiles").select("*");
  query = user ? query.eq("raw->>userId", user) : query.eq("phone", phone);
  let { data, error } = await query.order("created_at", { ascending: false }).limit(1);
  if (error) {
    // created_at 미존재 등 정렬 실패 시 정렬 없이 재시도
    const q2 = supabase.from("dog_profiles").select("*");
    const r2 = await (user ? q2.eq("raw->>userId", user) : q2.eq("phone", phone)).limit(1);
    data = r2.data;
    error = r2.error;
  }
  if (error || !data?.length) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  const row = data[0] as Record<string, unknown>;
  const raw = (row.raw ?? {}) as Record<string, unknown>;
  const prefs = (row.preferences ?? {}) as { textures?: string[]; flavors?: string[] };
  const profile = {
    name: raw.name ?? row.name ?? "",
    breed: raw.breed ?? row.breed ?? "",
    ageMonths: raw.ageMonths ?? row.age_months ?? 24,
    weight: raw.weight ?? row.weight_range ?? "",
    gender: raw.gender ?? row.gender ?? "",
    allergies: raw.allergies ?? row.allergies ?? [],
    allergyNote: raw.allergyNote ?? row.allergy_note ?? "",
    noAllergy: raw.noAllergy ?? row.no_allergy ?? false,
    textures: raw.textures ?? prefs.textures ?? [],
    flavors: raw.flavors ?? prefs.flavors ?? [],
    healthGoals: raw.healthGoals ?? row.health_goals ?? [],
    plan: raw.plan ?? row.plan ?? "B",
  };
  return NextResponse.json({ ok: true, profile });
}
