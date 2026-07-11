import Link from "next/link";

const ORDERS = [
  { month: "7월 박스", items: "맞춤 간식 구성", status: "배송 완료", canReturn: true, tracking: "1234-5678" },
  { month: "6월 박스", items: "맞춤 간식 구성", status: "배송 완료", canReturn: false, tracking: "1122-3344" },
];

export default function OrdersPage() {
  return (
    <div>
      <h1 className="font-serif-kr text-xl font-bold text-ink">주문·배송 내역</h1>
      <div className="mt-4 space-y-3">
        {ORDERS.map((o) => (
          <div key={o.month} className="rounded-lg border-2 border-borderk bg-cream p-5 shadow-kraft-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-ink">{o.month}</div>
                <div className="text-sm text-ink-light">{o.items}</div>
              </div>
              <span className="rounded-full bg-leaf px-3 py-1 text-xs text-cream">{o.status}</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-borderk pt-3 text-sm">
              <span className="text-ink-light">운송장 {o.tracking}</span>
              {o.canReturn && (
                <Link href="/my/return" className="font-semibold text-stamp underline">
                  반품 신청하기
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
