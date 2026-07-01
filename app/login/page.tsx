import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "로그인 | 디어펫 박스" };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-parchment px-5">
      <div className="w-full max-w-sm text-center">
        <img
          src="/dearpet-logo.jpg"
          alt="Dear Pet"
          className="mx-auto h-20 w-auto mix-blend-multiply"
        />
        <h1 className="mt-4 font-serif-kr text-2xl font-bold text-ink">로그인</h1>
        <p className="mt-2 text-sm text-ink-light">
          카카오·네이버·구글 간편 로그인은 곧 열립니다.
        </p>

        <div className="mt-8 space-y-3">
          <input
            type="text"
            placeholder="아이디"
            className="w-full border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
          />
          <button className="w-full bg-ink py-3 font-semibold text-cream transition-transform hover:-translate-y-0.5">
            로그인
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-ink-light">
          <Link href="/signup" className="hover:text-ink">
            회원가입
          </Link>
          <span className="text-border">|</span>
          <Link href="/quiz" className="hover:text-ink">
            맞춤 진단 먼저 하기
          </Link>
        </div>
      </div>
    </main>
  );
}
