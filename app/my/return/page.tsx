"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const TREATS = [
  { id: "t1", name: "블루베리 요거트 바", price: 3000 },
  { id: "t2", name: "연어 오메가 스틱", price: 3500 },
  { id: "t3", name: "고구마 트릿", price: 2500 },
  { id: "t4", name: "황태 트릿", price: 3000 },
];
const REASONS = ["안 먹어요", "알레르기 반응", "성분이 마음에 안 들어요", "기타"];

export default function ReturnPage() {
  const [picked, setPicked] = useState<string[]>([]);
  const [reason, setReason] = useState<string>(REASONS[0]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  if (submitted) {
    return (
      <div className="rounded-lg border-2 border-leaf bg-leaf/5 p-8 text-center shadow-kraft-sm">
        <div className="text-4xl">🐾</div>
        <h1 className="mt-3 font-serif-kr text-xl font-bold text-ink">반품 신청이 접수되었어요</h1>
        <p className="mt-2 text-ink-light">
          선택하신 {picked.length}종은 다음 박스에서 다른 간식으로 무료 교체해드리고, 이 피드백으로 다음 박스가 더 잘 맞아집니다.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif-kr text-xl font-bold text-ink">반품 신청</h1>
      <p className="mt-1 text-sm text-ink-light">반품할 간식을 선택하세요. 선택한 간식은 다음 박스에서 무료로 교체됩니다.</p>

      <div className="mt-4 space-y-2">
        {TREATS.map((t) => (
          <label
            key={t.id}
            className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 ${
              picked.includes(t.id) ? "border-stamp bg-stamp/5" : "border-borderk bg-cream"
            }`}
          >
            <span className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={picked.includes(t.id)}
                onChange={() => toggle(t.id)}
                className="h-4 w-4 accent-stamp"
              />
              {t.name}
            </span>
            <span className="text-sm text-ink-light">{t.price.toLocaleString()}원</span>
          </label>
        ))}
      </div>

      <label className="mt-6 block text-sm font-semibold text-ink">반품 이유</label>
      <select
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="mt-2 w-full rounded-lg border-2 border-borderk bg-cream px-4 py-3 outline-none focus:border-stamp"
      >
        {REASONS.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      <div className="mt-6 flex items-center justify-between rounded-lg bg-kraft-light p-4">
        <span className="text-sm text-ink-light">무료 교체 예정</span>
        <span className="font-serif-kr text-xl font-bold text-stamp">{picked.length}종</span>
      </div>

      <div className="mt-6">
        <Button fullWidth withArrow disabled={picked.length === 0} onClick={() => setSubmitted(true)}>
          반품 신청하고 무료 교체받기
        </Button>
      </div>
    </div>
  );
}
