"use client";

import { useState } from "react";
import StampBadge from "@/components/ui/StampBadge";

const TREATS = [
  "무첨가 닭가슴살 져키",
  "고구마 트릿",
  "블루베리 요거트 바",
  "연어 오메가 스틱",
  "황태 트릿",
  "단호박 큐브",
  "오리안심 말랭이",
  "당근 크런치",
  "사과 칩",
  "북어 스낵",
];

export default function ProductPreview() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <div className="relative">
          <div className="texture-kraft flex aspect-[4/3] items-center justify-center rounded-2xl border-2 border-borderk bg-kraft-light shadow-kraft">
            <span className="font-brand text-2xl font-bold text-kraft-dark">
              Monthly Box
            </span>
          </div>
          <div className="absolute -bottom-4 -left-3">
            <StampBadge rotate="left">10종 큐레이션 · 매달 새 구성</StampBadge>
          </div>
        </div>

        <div>
          <h2 className="text-section font-bold text-ink">
            실제로 이런 간식들이 들어갑니다
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {TREATS.slice(0, 5).map((t) => (
              <li
                key={t}
                className="rounded-full bg-leaf px-4 py-2 text-sm font-medium text-cream"
              >
                {t}
              </li>
            ))}
            <li className="rounded-full border-2 border-leaf px-4 py-2 text-sm font-medium text-leaf">
              + 5종 더
            </li>
          </ul>

          <button
            onClick={() => setOpen((v) => !v)}
            className="mt-6 text-sm font-semibold text-stamp underline underline-offset-4"
            aria-expanded={open}
          >
            {open ? "성분 구성 접기 −" : "이번 달 전체 구성 보기 +"}
          </button>
          {open && (
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-ink-light">
              {TREATS.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-leaf">✔</span>
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
