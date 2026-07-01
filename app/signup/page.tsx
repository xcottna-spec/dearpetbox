import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "회원가입 | 디어펫 박스" };

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-parchment px-5 py-16">
      <div className="w-full max-w-sm text-center">
        <img
          src="/dearpet-logo.jpg"
          alt="Dear Pet"
          className="mx-auto h-20 w-auto mix-blend-multiply"
        />
        <h1 className="mt-4 font-serif-kr text-2xl font-bold text-ink">회원가입</h1>
        <p className="mt-2 text-sm text-ink-light">가입하고 첫 박스 3,000P 받기.</p>

        <div className="mt-8 space-y-3 text-left">
          <input placeholder="아이디" className="w-full border border-border bg-cream px-4 py-3 outline-none focus:border-gold" />
          <input type="password" placeholder="비밀번호" className="w-full border border-border bg-cream px-4 py-3 outline-none focus:border-gold" />
          <input placeholder="이메일" className="w-full border border-border bg-cream px-4 py-3 outline-none focus:border-gold" />
          <input placeholder="반려견 이름" className="w-full border border-border bg-cream px-4 py-3 outline-none focus:border-gold" />
          <button className="w-full bg-ink py-3 font-semibold text-cream transition-transform hover:-translate-y-0.5">
            가입하기
          </button>
        </div>

        <p className="mt-6 text-sm text-ink-light">
          이미 회원이세요?{" "}
          <Link href="/login" className="font-semibold text-gold hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
