import Reveal from "@/components/ui/Reveal";

// 보호자들의 실제 고민 — 에디토리얼 인용 카드
const CARDS = [
  {
    no: "01",
    label: "성분 불안",
    text: (
      <>
        성분표를 아무리 읽어도 불안해서,
        <br />
        결국 늘 사던 것만 반복해요.
      </>
    ),
  },
  {
    no: "02",
    label: "갑작스런 외면",
    text: (
      <>
        잘 먹던 간식을 갑자기 외면해요.
        <br />
        뜯지도 않은 포장만 쌓여가요.
      </>
    ),
  },
  {
    no: "03",
    label: "깜깜이 표기",
    text: (
      <>
        &lsquo;무첨가&rsquo;라는데, 정작
        <br />
        뭐가 들었는지 알 수가 없어요.
      </>
    ),
  },
];

export default function PainSection() {
  return (
    <section className="bg-parchment py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Pet Parents Say
        </p>
        <h2 className="mt-3 text-center text-section font-bold text-ink">
          이런 경험, 있으신가요?
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.no} delay={i * 0.12} className="h-full">
              <figure className="flex h-full flex-col bg-cream p-8">
                <div className="flex items-center justify-between">
                  <span className="font-brand text-sm font-bold tracking-[0.2em] text-gold">
                    {c.no}
                  </span>
                  <figcaption className="text-xs font-semibold uppercase tracking-widest text-ink-light">
                    {c.label}
                  </figcaption>
                </div>
                <span
                  className="font-brand mt-5 block text-4xl leading-none text-gold-light"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 font-serif-kr text-lg leading-relaxed text-ink">
                  {c.text}
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center font-serif-kr text-lg font-semibold text-ink">
          이 고민들, 디어펫이 해결할 수 있어요.
        </p>
      </div>
    </section>
  );
}
