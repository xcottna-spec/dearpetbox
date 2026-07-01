import KraftCard from "@/components/ui/KraftCard";
import Reveal from "@/components/ui/Reveal";

const CARDS = [
  {
    emoji: "😰",
    text: "성분표를 다 읽어도 어디서 반응이 생길지 모르겠어서 결국 유명 브랜드 간식만 반복해서 사고 있어요.",
  },
  {
    emoji: "😔",
    text: "처음엔 잘 먹던 간식을 어느 날 갑자기 외면해서 뜯지도 않은 포장지가 서랍에 쌓여 있어요.",
  },
  {
    emoji: "🤔",
    text: "'자연산', '무첨가'라고 써있는데 정확히 뭐가 들었는지 알 수 없어서 불안해요.",
  },
];

export default function PainSection() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center text-section font-bold text-ink">
          이런 경험, 있으신가요?
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.text} delay={i * 0.12}>
              <KraftCard className="h-full">
                <div className="mb-4 text-4xl" aria-hidden>
                  {c.emoji}
                </div>
                <p className="text-ink-light">{c.text}</p>
              </KraftCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-12 text-center text-lg font-semibold text-ink">
          이 문제들, 디어펫이 해결할 수 있는 이유가 있어요.
        </p>
      </div>
    </section>
  );
}
