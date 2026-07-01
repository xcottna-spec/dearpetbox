"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { TRACK } from "@/lib/analytics";

const HERO_IMG =
  "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1600&q=80&auto=format&fit=crop";

export default function HeroSection() {
  const [dogName, setDogName] = useState("우리 아이");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("dogName") : null;
    if (stored) setDogName(stored);
  }, []);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      {/* 배경: 실제 강아지 사진 + 따뜻한 딥 오버레이 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${HERO_IMG}')` }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(23,18,11,0.95) 0%, rgba(23,18,11,0.88) 38%, rgba(23,18,11,0.6) 58%, rgba(23,18,11,0.2) 82%, rgba(23,18,11,0.05) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pt-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.span
            variants={item}
            className="mb-5 inline-block rounded-full border border-gold/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light"
          >
            반려견 맞춤 수제 간식 구독
          </motion.span>
          <motion.h1
            variants={item}
            className="font-serif-kr text-hero font-bold text-cream drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]"
          >
            {dogName}가 처음으로
            <br />
            <span className="accent">다 먹어치운 간식</span>이<br />
            생기는 날.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-lg text-parchment/90"
          >
            알레르기 성분은 빼고, 좋아하는 맛은 넣어서 — 매달 딱 맞는 수제 간식
            10종을 보내드립니다. 마음에 안 들면 반품하세요. 그 피드백으로 다음
            박스는 더 잘 맞아집니다.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="/quiz" withArrow onClick={() => TRACK.heroCtaClick()}>
              내 아이 맞춤 진단 시작하기
            </Button>
            <span className="text-sm text-parchment/70">
              3분이면 완성 · 구독 전 취소 가능
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-parchment/60">
        Scroll
      </div>
    </section>
  );
}
