import { NextResponse } from "next/server";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase-server";

// POST /api/subscribe — 결제 검증 후 구독 생성 (키 설정 후 활성화)
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

  // TODO: PortOne 결제 검증 → subscriptions insert (dog_profile_id, plan, portone_sub_id)
  return NextResponse.json({ ok: true, received: body });
}
