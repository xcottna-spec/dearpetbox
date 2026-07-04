"use client";

import Link from "next/link";
import Button from "./Button";

const MENU = [
  { label: "구독 상품", href: "/#pricing" },
  { label: "구독 안내", href: "/#how" },
  { label: "후기", href: "/#reviews" },
  { label: "배송·FAQ", href: "/#faq" },
];

export default function StickyNav() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-parchment/95 backdrop-blur">
        {/* 유틸리티 바 */}
        <div className="border-b border-border/60">
          <div className="mx-auto flex max-w-6xl items-center justify-end gap-4 px-5 py-1.5 text-xs text-ink-light">
            <Link href="/login" className="hover:text-ink">
              로그인
            </Link>
            <span className="text-border">|</span>
            <Link href="/signup" className="hover:text-ink">
              회원가입
            </Link>
            <span className="text-border">|</span>
            <Link href="/my/orders" className="hover:text-ink">
              배송조회
            </Link>
          </div>
        </div>

        {/* 메인 헤더 */}
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5">
          <Link href="/" aria-label="Dear Pet 홈">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-gold.png"
              alt="Dear Pet"
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          <ul className="hidden items-center gap-8 text-sm font-medium text-ink md:flex">
            {MENU.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="hover:text-gold">
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button href="/quiz" withArrow className="px-5 py-3 text-sm">
              맞춤 진단
            </Button>
          </div>

          {/* 모바일: 로그인 + 진단 */}
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/login" className="text-sm text-ink">
              로그인
            </Link>
          </div>
        </nav>
      </header>

      {/* 모바일 하단 고정 CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-parchment/95 p-3 backdrop-blur md:hidden">
        <Button href="/quiz" fullWidth withArrow>
          내 아이 맞춤 진단 시작하기
        </Button>
      </div>
    </>
  );
}
