import Reveal from "@/components/ui/Reveal";

export default function EditorialBand() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <Reveal>
          <div
            className="aspect-[5/4] border border-border bg-cover shadow-kraft"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=1600&q=85&auto=format&fit=crop')",
              backgroundPosition: "center 35%",
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
              남긴 간식, 잘 먹은 간식, 알레르기 신호까지 기억해요.
              <br />
              박스를 거듭할수록, 다음 박스는 더 정확해집니다.
            </p>
            <ul className="mt-6 space-y-2 text-ink">
              <li className="flex items-center gap-3">
                <span className="text-gold">✦</span> 알레르기 성분 100% 제외
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold">✦</span> 성분·원산지 확인한 간식만 선별
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
