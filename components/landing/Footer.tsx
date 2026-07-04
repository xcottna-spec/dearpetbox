import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-16 text-parchment/80 sm:pb-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-white.png"
              alt="Dear Pet"
              className="h-16 w-auto"
            />
            <p className="mt-3 max-w-xs text-sm">
              우리 아이에게 딱 맞는 맞춤 간식 구독.
            </p>
          </div>
          <div className="flex gap-10 text-sm">
            <div className="space-y-2">
              <div className="font-semibold text-cream">둘러보기</div>
              <Link href="/about" className="block hover:text-cream">
                브랜드 스토리
              </Link>
              <Link href="/ingredients" className="block hover:text-cream">
                성분 투명성
              </Link>
              <Link href="/faq" className="block hover:text-cream">
                FAQ
              </Link>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-cream">채널</div>
              <a
                href="https://instagram.com/dearpetbox"
                className="block hover:text-cream"
              >
                인스타그램
              </a>
              <a href="#" className="block hover:text-cream">
                카카오채널
              </a>
              <a href="#" className="block hover:text-cream">
                블로그
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-1 border-t border-parchment/20 pt-6 text-xs text-parchment/60">
          <p>
            상호 Dear Pet Box · 대표 나현 · 사업자등록번호 000-00-00000 ·
            통신판매업신고 0000-지역-0000
          </p>
          <p>주소 경기 용인시 기흥구 · 고객센터 070-0000-0000</p>
          <p className="pt-2">
            <Link href="/privacy" className="underline">
              개인정보처리방침
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="underline">
              이용약관
            </Link>
          </p>
          <p className="pt-2">© 2026 Dear Pet Box. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
