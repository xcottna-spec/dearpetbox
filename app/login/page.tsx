import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = { title: "로그인 | 디어펫 박스" };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-parchment px-5">
      <div className="w-full max-w-sm text-center">
        <Link href="/" aria-label="Dear Pet 홈으로">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-gold.png" alt="Dear Pet" className="mx-auto h-16 w-auto" />
        </Link>
        <h1 className="mt-4 font-serif-kr text-2xl font-bold text-ink">로그인</h1>
        <p className="mb-8 mt-2 text-sm text-ink-light">
          로그인하면 맞춤 진단과 프로파일 보관이 열려요.
        </p>

        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
