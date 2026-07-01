"use client";

import { useState } from "react";
import { FAQS } from "@/data/faq";
import { TRACK } from "@/lib/analytics";

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number, q: string) => {
    setOpenIdx((cur) => {
      if (cur !== i) TRACK.faqExpand(q);
      return cur === i ? null : i;
    });
  };

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="text-center text-section font-bold text-ink">
          자주 묻는 질문
        </h2>
        <div className="mt-10 divide-y divide-borderk border-y border-borderk">
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => toggle(i, f.q)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-semibold text-ink">{f.q}</span>
                  <span
                    className={`shrink-0 text-stamp transition-transform ${
                      open ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    ＋
                  </span>
                </button>
                {open && (
                  <p className="pb-5 text-ink-light">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
