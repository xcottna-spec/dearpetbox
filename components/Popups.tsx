"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SLIDES = [
  {
    tag: "WELCOME",
    title: "첫 구독, 3,000P로 시작하세요",
    desc: "신규 회원가입 시 3,000포인트 지급. 우리 아이 첫 맞춤 박스를 더 가볍게 시작해요.",
    img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=700&q=80&auto=format&fit=crop",
    cta: { label: "맞춤 진단 시작하기", href: "/quiz" },
  },
  {
    tag: "EVENT",
    title: "반품할수록 더 잘 맞아지는 박스",
    desc: "마음에 안 든 간식은 반품 → 포인트로 돌려받고, 그 피드백으로 다음 박스가 더 정교해집니다.",
    img: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=700&q=80&auto=format&fit=crop",
    cta: { label: "구독 플랜 보기", href: "/#pricing" },
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

  const s = SLIDES[idx];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border-2 border-borderk bg-cream shadow-soft">
        {/* 이미지 */}
        <div
          className="relative h-44 bg-cover bg-center"
          style={{ backgroundImage: `url('${s.img}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-widest text-ink">
            {s.tag}
          </span>
          <button
            onClick={close}
            aria-label="닫기"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-cream/90 text-ink hover:bg-cream"
          >
            ✕
          </button>
        </div>

        {/* 내용 */}
        <div className="p-6 text-center">
          <h3 className="font-serif-kr text-xl font-bold text-ink">{s.title}</h3>
          <p className="mt-2 text-sm text-ink-light">{s.desc}</p>
          <Link
            href={s.cta.href}
            onClick={close}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-stamp px-6 py-3 font-semibold text-cream transition-transform hover:-translate-y-0.5"
          >
            {s.cta.label} <span aria-hidden>→</span>
          </Link>

          {/* 슬라이드 도트 */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`${i + 1}번 팝업`}
                className={`h-2 rounded-full transition-all ${
                  i === idx ? "w-5 bg-stamp" : "w-2 bg-borderk"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex items-center justify-between border-t border-borderk px-5 py-3 text-xs text-ink-light">
          <button onClick={hideToday} className="hover:text-ink">
            오늘 하루 보지 않기
          </button>
          <button onClick={close} className="hover:text-ink">
            닫기 ✕
          </button>
        </div>
      </div>
    </div>
  );
}
