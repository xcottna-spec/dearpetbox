import Link from "next/link";

export default function MyDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border-2 border-borderk bg-parchment p-6 shadow-kraft-sm">
          <div className="text-sm text-ink-light">다음 배송</div>
          <div className="mt-1 font-serif-kr text-2xl font-bold text-ink">망고 · 8월 5일</div>
          <p className="mt-2 text-sm text-ink-light">3개월 플랜 · 2회차</p>
        </div>
        <div className="rounded-lg border-2 border-borderk bg-parchment p-6 shadow-kraft-sm">
          <div className="text-sm text-ink-light">포인트 잔액</div>
          <div className="mt-1 font-serif-kr text-2xl font-bold text-stamp">4,500 P</div>
          <p className="mt-2 text-sm text-ink-light">구독 갱신 시 사용 가능</p>
        </div>
      </div>

      <div className="rounded-lg border-2 border-borderk bg-cream p-6 shadow-kraft-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-serif-kr text-lg font-bold text-ink">최근 주문</h2>
          <Link href="/my/orders" className="text-sm text-stamp underline">
            전체 보기
          </Link>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-borderk pt-3 text-sm">
          <span>7월 박스 · 수제 간식 10종</span>
          <span className="rounded-full bg-leaf px-3 py-1 text-xs text-cream">배송 완료</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { href: "/my/profile", label: "프로파일 수정" },
          { href: "/my/return", label: "반품 신청" },
          { href: "/my/points", label: "포인트 내역" },
        ].map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="rounded-lg border-2 border-borderk bg-kraft-light p-4 text-center text-sm font-semibold text-ink shadow-kraft-sm hover:-translate-y-0.5"
          >
            {q.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
