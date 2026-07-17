"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ALLERGENS } from "@/data/allergens";

// 마이페이지 프로파일 — 진단(dpQuiz)과 동일한 데이터를 읽는다.
// 수정은 진단 플로우(/quiz)를 재사용: 같은 저장소를 쓰므로 별도 편집 UI가 필요 없다.
interface QuizData {
  name?: string;
  breed?: string;
  ageMonths?: number;
  weight?: string;
  gender?: string;
  allergies?: string[];
  allergyNote?: string;
  noAllergy?: boolean;
  textures?: string[];
  flavors?: string[];
  healthGoals?: string[];
}

export default function ProfilePage() {
  const [q, setQ] = useState<QuizData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("dpQuiz");
      if (raw) setQ(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!q?.name) {
    return (
      <div>
        <h1 className="font-serif-kr text-xl font-bold text-ink">반려견 프로파일</h1>
        <div className="mt-4 rounded-lg border-2 border-borderk bg-cream p-8 text-center shadow-kraft-sm">
          <p className="text-ink-light">아직 등록된 프로파일이 없어요.</p>
          <Link
            href="/quiz"
            className="mt-4 inline-block bg-ink px-6 py-3 font-semibold text-cream"
          >
            3분 맞춤 진단 시작하기 →
          </Link>
        </div>
      </div>
    );
  }

  const age = q.ageMonths ?? 0;
  const rows = [
    { label: "이름", value: q.name },
    { label: "견종", value: q.breed || "미입력" },
    { label: "나이", value: `${Math.floor(age / 12)}살 ${age % 12}개월` },
    { label: "체중", value: q.weight || "미입력" },
    {
      label: "제외 성분",
      value:
        q.noAllergy || !q.allergies?.length
          ? "없음"
          : q.allergies
              .map((id) => ALLERGENS.find((a) => a.id === id)?.label ?? id)
              .join(", "),
    },
    {
      label: "선호",
      value:
        [...(q.textures ?? []), ...(q.flavors ?? [])].join(" · ") || "미입력",
    },
    { label: "건강 목표", value: (q.healthGoals ?? []).join(", ") || "미입력" },
  ];

  return (
    <div>
      <h1 className="font-serif-kr text-xl font-bold text-ink">반려견 프로파일</h1>
      <div className="mt-4 rounded-lg border-2 border-borderk bg-cream p-6 shadow-kraft-sm">
        <dl className="divide-y divide-borderk">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-4 py-3">
              <dt className="shrink-0 text-sm text-ink-light">{r.label}</dt>
              <dd className="break-keep text-right font-medium text-ink">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <Link
        href="/quiz"
        className="mt-4 block w-full border border-borderk bg-kraft-light py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-gold"
      >
        프로파일 수정하기 →
      </Link>
      <p className="mt-3 text-sm text-ink-light">
        수정 시 <b className="text-ink">다음 박스부터 반영</b>됩니다.
      </p>
    </div>
  );
}
