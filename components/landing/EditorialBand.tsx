import Reveal from "@/components/ui/Reveal";

export default function EditorialBand() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <Reveal>
          <div
            className="aspect-[5/4] rounded-2xl border-2 border-borderk bg-cover shadow-kraft"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=1000&q=80&auto=format&fit=crop')",
              backgroundPosition: "center 20%",
            }}
            role="img"
            aria-label="반려견과 함께하는 보호자"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Our Promise
            </span>
            <h2 className="mt-3 font-serif-kr text-section font-bold text-ink">
              간식을 고르는 일이 아니라,
              <br />
              <span className="accent">아이를 아는 일</span>입니다.
            </h2>
            <p className="mt-5 text-ink-light">
              디어펫은 매달 우리 아이의 반응을 데이터로 기억합니다. 남긴 간식,
              잘 먹은 간식, 알레르기 신호까지 — 박스를 거듭할수록 프로파일은
              선명해지고, 다음 박스는 오늘보다 더 정확해집니다.
            </p>
            <ul className="mt-6 space-y-2 text-ink">
              <li className="flex items-center gap-3">
                <span className="text-gold">✦</span> 알레르기 성분 100% 제외
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold">✦</span> 국내 소규모 공방 수제 제작
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold">✦</span> 반품 → 포인트, 그리고 더 나은 다음 박스
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
