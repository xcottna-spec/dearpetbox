"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { TRACK } from "@/lib/analytics";

export default function HeroSection() {
  const [dogName, setDogName] = useState("우리 아이");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("dogName") : null;
    if (stored) setDogName(stored);
  }, []);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="texture-kraft relative overflow-hidden bg-parchment pt-28 pb-20 sm:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={item}
            className="font-serif-kr text-hero font-bold text-ink"
          >
            {dogName}가 처음으로 다 먹어치운 간식이 생기는 날이 올 거예요.
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-6 text-lg text-ink-light"
          >
            알레르기 성분은 빼고, 좋아하는 맛은 넣어서 — 매달 딱 맞는 수제 간식
            10종을 보내드립니다.
            <br />
            마음에 안 들면 반품하세요. 그 피드백으로 다음 박스는 더 잘 맞아집니다.
          </motion.p>
          <motion.div variants={item} className="mt-8">
            <Button href="/quiz" withArrow onClick={() => TRACK.heroCtaClick()}>
              내 아이 맞춤 진단 시작하기
            </Button>
            <p className="mt-3 text-sm text-ink-light">
              3분이면 완성 · 구독 전 취소 가능
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="texture-kraft flex aspect-square w-full items-center justify-center rounded-2xl border-2 border-borderk bg-kraft-light shadow-kraft">
            <div className="text-center">
              <div className="font-brand text-3xl font-bold text-kraft-dark">
                Dear Pet Box
              </div>
              <p className="mt-2 text-sm text-ink-light">
                우리 아이 맞춤 수제 간식 10종
              </p>
            </div>
          </div>
          <div className="absolute -right-3 -top-3 rotate-[8deg] rounded-full border-2 border-stamp bg-parchment px-4 py-2 font-brand text-sm font-bold text-stamp">
            매달 새 구성
          </div>
        </motion.div>
      </div>
    </section>
  );
}
