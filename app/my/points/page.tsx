const HISTORY = [
  { date: "2026-07-10", reason: "반품 전환 (블루베리 바)", amount: 3000 },
  { date: "2026-06-28", reason: "첫 구독 적립", amount: 3000 },
  { date: "2026-06-15", reason: "구독 갱신 사용", amount: -1500 },
];

export default function PointsPage() {
  return (
    <div>
      <h1 className="font-serif-kr text-xl font-bold text-ink">포인트</h1>
      <div className="mt-4 rounded-lg border-2 border-borderk bg-parchment p-6 text-center shadow-kraft-sm">
        <div className="text-sm text-ink-light">현재 잔액</div>
        <div className="mt-1 font-serif-kr text-4xl font-bold text-stamp">4,500 P</div>
        <p className="mt-2 text-xs text-ink-light">포인트는 구독 갱신 시에만 사용 가능합니다.</p>
      </div>
      <ul className="mt-4 divide-y divide-borderk rounded-lg border-2 border-borderk bg-cream shadow-kraft-sm">
        {HISTORY.map((h, i) => (
          <li key={i} className="flex items-center justify-between px-5 py-3 text-sm">
            <div>
              <div className="text-ink">{h.reason}</div>
              <div className="text-xs text-ink-light">{h.date}</div>
            </div>
            <span className={h.amount > 0 ? "font-bold text-leaf" : "font-bold text-stamp"}>
              {h.amount > 0 ? "+" : ""}
              {h.amount.toLocaleString()} P
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
