export interface Plan {
  id: "A" | "B" | "C";
  grade: string;
  name: string;
  tagline: string;
  price: number;
  badge?: string;
  highlight?: boolean;
  features: string[];
  image: { id: string; pos: string; alt: string };
  /** 실제 결제·주문이 이뤄지는 카페24 상품 페이지 (주문 집계는 카페24) */
  cafe24Url: string;
}

export const PLANS: Plan[] = [
  {
    id: "A",
    grade: "A",
    name: "에브리데이",
    tagline: "매일 부담 없이 시작하는 첫 맞춤",
    price: 29000,
    features: ["우리 아이 맞춤 구성", "알레르기 성분 제외", "월 1회 정기배송"],
    image: {
      id: "photo-1548199973-03cce0bbc87b",
      pos: "center 45%",
      alt: "산책길을 함께 달리는 강아지들 — 매일의 즐거움",
    },
    cafe24Url: "https://dearpetbox.co.kr/product/detail.html?product_no=72",
  },
  {
    id: "B",
    grade: "B",
    name: "시그니처",
    tagline: "가장 인기 있는 맞춤 큐레이션",
    price: 48000,
    badge: "BEST",
    highlight: true,
    features: ["동결건조 중심 프리미엄 구성", "프로파일 정밀 반영", "반품 → 포인트 전환"],
    image: {
      id: "photo-1593134257782-e89567b7718a",
      pos: "center 35%",
      alt: "카메라를 바라보는 강아지 — 디어펫 대표 플랜",
    },
    cafe24Url: "https://dearpetbox.co.kr/product/detail.html?product_no=73",
  },
  {
    id: "C",
    grade: "C",
    name: "디어케어",
    tagline: "건강 케어까지 더한 프리미엄",
    price: 72000,
    badge: "PREMIUM",
    features: ["가장 풍성한 구성 + 영양 케어", "전담 큐레이션", "우선 배송·전용 상담"],
    image: {
      id: "photo-1591946614720-90a587da4a36",
      pos: "center 30%",
      alt: "애착 인형을 문 강아지 — 세심한 케어",
    },
    cafe24Url: "https://dearpetbox.co.kr/product/detail.html?product_no=74",
  },
];

export const PAYMENT_METHODS = [
  { id: "kakaopay", label: "카카오페이", priority: 1 },
  { id: "naverpay", label: "네이버페이", priority: 2 },
  { id: "tosspay", label: "토스페이", priority: 3 },
  { id: "card", label: "신용·체크카드", priority: 4 },
] as const;
