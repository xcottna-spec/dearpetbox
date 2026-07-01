"use client";

import { useEffect, useRef } from "react";
import { TRACK } from "@/lib/analytics";

interface Props {
  id: string;
  children: React.ReactNode;
}

// 섹션이 50% 이상 보이면 GA4 section_view 를 1회 발생시킨다.
export default function SectionTracker({ id, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            TRACK.sectionView(id);
            ob.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [id]);
  return <div ref={ref}>{children}</div>;
}
