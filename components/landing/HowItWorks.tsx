import Reveal from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    icon: "🖊",
    title: "3분 맞춤 진단",
    desc: "알레르기 성분, 좋아하는 맛, 건강 고민까지. 한 번 입력하면 매달 자동으로 반영됩니다.",
  },
  {
    n: "02",
    icon: "✉",
    title: "수제 간식 10종 큐레이션",
    desc: "반려견 프로파일에 맞게, 국내 소규모 공방에서 직접 만든 간식으로 구성합니다.",
  },
  {
    n: "03",
    icon: "📦",
    title: "매달 우리 집 앞으로",
    desc: "배송 전 카카오톡으로 구성을 먼저 알려드립니다. 마음에 안 드는 간식은 반품하고 포인트로 돌려받으세요.",
  },
];

export default function HowItWorks() {
  return (
    <section className="texture-kraft bg-kraft-light py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center text-section font-bold text-ink">
          디어펫은 이렇게 합니다
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <div className="relative flex h-full flex-col items-center rounded-lg border-2 border-borderk bg-cream p-8 text-center shadow-kraft-sm">
                <div className="font-brand text-sm font-bold text-stamp">
                  STEP {s.n}
                </div>
                <div className="my-4 text-5xl" aria-hidden>
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-3 text-ink-light">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
