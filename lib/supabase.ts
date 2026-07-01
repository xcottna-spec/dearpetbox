import { createBrowserClient } from "@supabase/ssr";

// 환경변수가 없어도 빌드가 실패하지 않도록 optional 처리 (CLAUDE.md 유의사항 4)
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * 브라우저용 Supabase 클라이언트.
 * 키가 설정되지 않은 경우 null 을 반환하므로 호출부에서 가드 후 사용한다.
 */
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(url!, anonKey!);
}
