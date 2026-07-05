"use client";

import { useEffect, useState } from "react";

// 우측 고정 채널 레일 (인스타그램·카카오톡 + 맨위로)
export default function FloatingRail() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item =
    "flex h-11 w-11 items-center justify-center border border-border bg-cream text-ink shadow-soft transition-transform hover:-translate-y-0.5";

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-2 md:bottom-8">
      <a
        href="https://www.instagram.com/dearpet.official/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="인스타그램"
        className={item}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a
        href="http://pf.kakao.com/_lqGNn/chat"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 채널 상담"
        className={`${item} bg-[#FEE500]`}
      >
        {/* 카카오 말풍선 */}
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#191919" aria-hidden>
          <path d="M12 3C6.75 3 2.5 6.36 2.5 10.5c0 2.64 1.73 4.96 4.35 6.29-.19.7-.7 2.55-.8 2.95-.13.49.18.48.38.35.16-.1 2.5-1.7 3.51-2.39.66.1 1.35.15 2.06.15 5.25 0 9.5-3.36 9.5-7.35S17.25 3 12 3z" />
        </svg>
      </a>
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="맨 위로"
          className={item}
        >
          ↑
        </button>
      )}
    </div>
  );
}
