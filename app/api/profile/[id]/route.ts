import { NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

// GET /api/profile/[id] — 반려견 프로파일 조회 (키 설정 후 활성화)
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  if (!isSupabaseConfigured) {
    return NextResponse.json(
      { ok: false, error: "Supabase 미설정 — 환경변수 설정 후 활성화됩니다." },
      { status: 501 }
    );
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "client init failed" }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("dog_profiles")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 404 });
  }
  return NextResponse.json({ ok: true, profile: data });
}
