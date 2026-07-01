export interface Plan {
  id: "monthly" | "quarterly" | "biannual";
  name: string;
  monthlyPrice: number; // 월 환산 가격
  totalPrice: number; // 총 결제 금액
  billingLabel: string;
  badge?: string;
  highlight?: boolean;
  savePercent?: number;
}

export const PLANS: Plan[] = [
  {
    id: "monthly",
    name: "월간",
    monthlyPrice: 39000,
    totalPrice: 39000,
    billingLabel: "매달 결제",
  },
  {
    id: "quarterly",
    name: "3개월",
    monthlyPrice: 35000,
    totalPrice: 105000,
    billingLabel: "3개월마다 결제",
    badge: "가장 인기",
    highlight: true,
    savePercent: 10,
  },
  {
    id: "biannual",
    name: "6개월",
    monthlyPrice: 31000,
    totalPrice: 186000,
    billingLabel: "6개월마다 결제",
    badge: "최대 절약",
    savePercent: 20,
  },
];

export const PAYMENT_METHODS = [
  { id: "kakaopay", label: "카카오페이", priority: 1 },
  { id: "naverpay", label: "네이버페이", priority: 2 },
  { id: "tosspay", label: "토스페이", priority: 3 },
  { id: "card", label: "신용·체크카드", priority: 4 },
] as const;
