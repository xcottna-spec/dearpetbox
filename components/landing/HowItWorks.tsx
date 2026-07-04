import Reveal from "@/components/ui/Reveal";

const STEPS = [
  {
    n: "01",
    icon: "🖊",
    title: "3분 맞춤 진단",
    desc: "한 번 입력하면 매달 자동으로 반영돼요.",
  },
  {
    n: "02",
    icon: "✉",
    title: "맞춤 간식 10종 큐레이션",
    desc: "우리 아이 프로파일에 딱 맞게 골라 담아요.",
  },
  {
    n: "03",
    icon: "📦",
    title: "매달 우리 집 앞으로",
    desc: "배송 전 카톡으로 미리 알려드려요.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-kraft-light py-20">
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
