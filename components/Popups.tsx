"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SLIDES = [
  {
    tag: "Welcome Gift",
    title: (
      <>
        첫 구독,
        <br />
        3,000P로 가볍게
      </>
    ),
    desc: "신규가입 시 3,000포인트를 바로 드려요.",
    img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&q=85&auto=format&fit=crop",
    pos: "center 35%",
    cta: { label: "맞춤 진단 시작하기", href: "/quiz" },
  },
  {
    tag: "Feedback Loop",
    title: (
      <>
        반품할수록
        <br />더 잘 맞는 박스
      </>
    ),
    desc: "안 맞은 간식은 포인트로, 다음 박스는 더 정확하게.",
    img: "https://images.unsplash.com/photo-1568393691622-c7ba131d63b4?w=1200&q=85&auto=format&fit=crop",
    pos: "center 30%",
    cta: { label: "구독 상품 보기", href: "/#pricing" },
  },
];

const DISMISS_KEY = "dp_popup_hidden_until";

export default function Popups() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let hide = false;
    try {
      const until = localStorage.getItem(DISMISS_KEY);
      if (until && Date.now() < Number(until)) hide = true;
    } catch {}
    if (!hide) {
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  if (!open) return null;

  const close = () => setOpen(false);
  const hideToday = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
    } catch {}
    setOpen(false);
  };
  const prev = () => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIdx((i) => (i + 1) % SLIDES.length);

  const s = SLIDES[idx];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-[2px]"
        onClick={close}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md border border-gold/50 bg-parchment shadow-soft">
        {/* 골드 이너 프레임 — 에디토리얼 카드 */}
        <div className="m-2 border border-border sm:m-3">
          {/* 이미지 */}
          <div
            className="relative h-52 bg-cover sm:h-56"
            style={{ backgroundImage: `url('${s.img}')`, backgroundPosition: s.pos }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
            <button
              onClick={close}
              aria-label="닫기"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-parchment/50 bg-ink/30 text-parchment backdrop-blur-sm transition-colors hover:bg-ink/60"
            >
              ✕
            </button>
          </div>

          {/* 내용 */}
          <div className="relative px-7 pb-6 pt-6 text-center">
            {/* 좌우 이동 */}
            <button
              onClick={prev}
              aria-label="이전 소식"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-2xl text-ink-light transition-colors hover:text-gold"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="다음 소식"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-2xl text-ink-light transition-colors hover:text-gold"
            >
              ›
            </button>

            <p className="font-brand text-xs font-bold uppercase tracking-[0.28em] text-gold">
              {s.tag}
            </p>
            <div className="mx-auto my-3 h-px w-8 bg-gold" aria-hidden />
            <h3 className="font-serif-kr text-2xl font-bold leading-snug text-ink">
              {s.title}
            </h3>
            <p className="mt-3 text-sm text-ink-light">{s.desc}</p>

            <Link
              href={s.cta.href}
              onClick={close}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-ink px-6 py-3.5 text-sm font-semibold tracking-wide text-cream transition-colors hover:bg-stamp-hover"
            >
              {s.cta.label} <span aria-hidden>→</span>
            </Link>

            {/* 인디케이터 */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`${i + 1}번 소식`}
                  className={`h-[3px] transition-all ${
                    i === idx ? "w-8 bg-gold" : "w-4 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-ink-light">
          <button onClick={hideToday} className="hover:text-ink">
            오늘 하루 보지 않기
          </button>
          <button onClick={close} className="hover:text-ink">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
