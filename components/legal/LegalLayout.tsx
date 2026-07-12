import { ReactNode } from "react";
import Link from "next/link";

// 약관·개인정보처리방침 공용 레이아웃 — 법무 문서 페이지는 전부 이 틀을 쓴다.
export default function LegalLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-parchment px-5 py-14">
      <article className="mx-auto max-w-3xl">
        <Link href="/" aria-label="Dear Pet 홈으로" className="mb-10 block w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-gold.png" alt="Dear Pet" className="h-12 w-auto" />
        </Link>
        <h1 className="font-serif-kr text-3xl font-bold text-ink">{title}</h1>
        <p className="mt-4 break-keep text-sm leading-relaxed text-ink-light">
          {intro}
        </p>
        <div className="mt-10 space-y-10">{children}</div>
      </article>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-serif-kr text-lg font-bold text-ink">{title}</h2>
      <div className="legal-body mt-3 space-y-3 break-keep text-sm leading-relaxed text-ink-light [&_a]:text-gold [&_li]:ml-5 [&_li]:list-disc [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-borderk [&_td]:p-2 [&_th]:border [&_th]:border-borderk [&_th]:bg-kraft-light [&_th]:p-2 [&_th]:text-left [&_ul]:space-y-1">
        {children}
      </div>
    </section>
  );
}
