export interface Plan {
  id: "A" | "B" | "C";
  grade: string;
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  highlight?: boolean;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    id: "A",
    grade: "A",
    name: "에브리데이",
    tagline: "매일 부담 없이 주는 기본 간식",
    price: 29000,
    features: ["수제 간식 6종", "알레르기 성분 제외", "월 1회 정기배송"],
  },
  {
    id: "B",
    grade: "B",
    name: "시그니처",
    tagline: "가장 인기 있는 맞춤 큐레이션",
    price: 48000,
    badge: "BEST",
    highlight: true,
    features: ["수제 간식 10종", "맞춤 프로파일 반영", "반품 → 포인트 전환"],
  },
  {
    id: "C",
    grade: "C",
    name: "디어케어",
    tagline: "건강 케어까지 더한 프리미엄",
    price: 72000,
    badge: "PREMIUM",
    features: ["간식 12종 + 영양 케어", "전담 큐레이션", "우선 배송·전용 상담"],
  },
];

export const PAYMENT_METHODS = [
  { id: "kakaopay", label: "카카오페이", priority: 1 },
  { id: "naverpay", label: "네이버페이", priority: 2 },
  { id: "tosspay", label: "토스페이", priority: 3 },
  { id: "card", label: "신용·체크카드", priority: 4 },
] as const;
