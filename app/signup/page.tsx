import Link from "next/link";
import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = { title: "회원가입 | 디어펫 박스" };

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-parchment px-5 py-14">
      <div className="w-full max-w-sm text-center">
        <Link href="/" aria-label="Dear Pet 홈으로">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-gold.png" alt="Dear Pet" className="mx-auto h-16 w-auto" />
        </Link>
        <h1 className="mt-4 font-serif-kr text-2xl font-bold text-ink">회원가입</h1>
        <p className="mb-8 mt-2 text-sm text-ink-light">가입하고 첫 박스 3,000P 받기.</p>

        <SignupForm />

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
