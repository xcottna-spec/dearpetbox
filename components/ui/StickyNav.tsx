"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./Button";

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-borderk bg-parchment/95 backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-brand text-2xl font-bold text-ink">
            Dear Pet<span className="text-stamp">.</span>
          </Link>
          <div className="hidden sm:block">
            <Button href="/quiz" withArrow>
              내 아이 맞춤 진단 시작하기
            </Button>
          </div>
        </nav>
      </header>

      {/* 모바일 하단 고정 CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-borderk bg-parchment/95 p-3 backdrop-blur sm:hidden">
        <Button href="/quiz" fullWidth withArrow>
          내 아이 맞춤 진단 시작하기
        </Button>
      </div>
    </>
  );
}
