"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { TRACK } from "@/lib/analytics";

// 4K급 원본에서 뷰포트별 최적 사이즈 로드
const IMG = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`;

interface Slide {
  id: string;
  pos: string;
  tag: string;
  head: React.ReactNode;
  sub: React.ReactNode;
  cta: { label: string; href: string };
}

const SLIDES: Slide[] = [
  {
    id: "photo-1576201836106-db1758fd1c97",
    pos: "center 40%",
    tag: "반려견 맞춤 간식 구독",
    head: (
      <>
        우리 아이가 처음으로
        <br />
        <span className="accent">다 먹어치운 간식</span>이
        <br />
        생기는 날.
      </>
    ),
    sub: (
      <>
        알레르기는 빼고, 좋아하는 맛만 담았어요.
        <br />
        매달, 우리 아이에게 딱 맞춘 간식 10종.
      </>
    ),
    cta: { label: "내 아이 맞춤 진단 시작하기", href: "/quiz" },
  },
  {
    id: "photo-1601758124510-52d02ddb7cbd",
    pos: "center 25%",
    tag: "Feedback Loop",
    head: (
      <>
        안 맞은 간식은
        <br />
        <span className="accent">무료로</span> 교체받고,
        <br />
        다음 박스는 더 정확하게.
      </>
    ),
    sub: (
      <>
        반품이 손해가 아니라 데이터가 됩니다.
        <br />
        박스를 거듭할수록 취향이 선명해져요.
      </>
    ),
    cta: { label: "구독 상품 보기", href: "/#pricing" },
  },
  {
    id: "photo-1561037404-61cd46aa615b",
    pos: "center 35%",
    tag: "Transparency",
    head: (
      <>
        무엇이 들었는지,
        <br />
        <span className="accent">전부 공개</span>합니다.
      </>
    ),
    sub: (
      <>
        성분과 원산지를 숨기지 않아요.
        <br />
        확인하고, 안심하고, 급여하세요.
      </>
    ),
    cta: { label: "간식 구성 보기", href: "/#box" },
  },
];

export default function HeroSection() {
  const [idx, setIdx] = useState(0);

  const next = useCallback(
    () => setIdx((i) => (i + 1) % SLIDES.length),
    []
  );
  const prev = () => setIdx((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  // 자동 순환 (7초)
  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next]);

  const s = SLIDES[idx];
  const arrow =
    "hidden md:flex absolute top-1/2 z-20 h-11 w-11 -translate-y-1/2 items-center justify-center border border-parchment/40 text-xl text-parchment/80 transition-colors hover:bg-parchment/10 hover:text-parchment";

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-ink">
      {/* 배경 슬라이드 */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={s.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url('${IMG(s.id, 1920)}')`, backgroundPosition: s.pos }}
          aria-hidden
        />
      </AnimatePresence>

      {/* 오버레이 — 데스크탑은 좌측 강조, 모바일은 전체 딥 */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          background:
            "linear-gradient(100deg, rgba(23,18,11,0.95) 0%, rgba(23,18,11,0.88) 38%, rgba(23,18,11,0.55) 60%, rgba(23,18,11,0.15) 85%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(23,18,11,0.55) 0%, rgba(23,18,11,0.8) 55%, rgba(23,18,11,0.93) 100%)",
        }}
        aria-hidden
      />

      {/* 좌우 화살표 */}
      <button onClick={prev} aria-label="이전 슬라이드" className={`${arrow} left-5`}>
        ‹
      </button>
      <button onClick={next} aria-label="다음 슬라이드" className={`${arrow} right-5`}>
        ›
      </button>

      {/* 콘텐츠 */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-10 sm:pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex min-h-[52vh] max-w-2xl flex-col justify-end sm:justify-center"
          >
            <span className="mb-5 inline-block w-fit border border-gold/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">
              {s.tag}
            </span>
            <h1 className="font-serif-kr text-hero font-bold text-cream drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]">
              {s.head}
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-parchment/90">
              {s.sub}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                href={s.cta.href}
                withArrow
                onClick={() => TRACK.heroCtaClick()}
              >
                {s.cta.label}
              </Button>
              <span className="hidden text-sm text-parchment/70 sm:inline">
                3분이면 완성 · 구독 전 취소 가능
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 슬라이드 인디케이터 */}
        <div className="mt-10 flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`${i + 1}번 슬라이드`}
              className={`h-[3px] transition-all ${
                i === idx ? "w-10 bg-gold" : "w-5 bg-parchment/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
