import { NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

// POST /api/return — 반품 신청 저장 + 다음 박스 무료 교체 처리 (키 설정 후 활성화)
export async function POST(req: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json(
      { ok: false, error: "Supabase 미설정 — 환경변수 설정 후 활성화됩니다." },
      { status: 501 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "client init failed" }, { status: 500 });
  }

  // TODO: returns insert + 다음 박스 무료 교체 항목 row 생성
  return NextResponse.json({ ok: true, received: body });
}
