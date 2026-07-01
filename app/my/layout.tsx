import Link from "next/link";

const NAV = [
  { href: "/my", label: "대시보드" },
  { href: "/my/profile", label: "반려견 프로파일" },
  { href: "/my/orders", label: "주문·배송" },
  { href: "/my/points", label: "포인트" },
  { href: "/my/return", label: "반품 신청" },
];

export default function MyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-borderk bg-parchment">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-brand text-xl font-bold text-ink">
            Dear Pet<span className="text-stamp">.</span>
          </Link>
          <span className="text-sm text-ink-light">마이페이지</span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl gap-8 px-5 py-8 md:flex">
        <nav className="mb-6 md:mb-0 md:w-48 md:shrink-0">
          <ul className="flex gap-2 overflow-x-auto md:flex-col md:gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="block whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium text-ink-light hover:bg-kraft-light hover:text-ink"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1">
          <div className="mb-6 rounded-lg border border-borderk bg-kraft-light px-4 py-2 text-xs text-ink-light">
            데모 화면입니다 — 로그인·실데이터 연동(Supabase)은 키 설정 후 활성화됩니다.
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
