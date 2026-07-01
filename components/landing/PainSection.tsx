import KraftCard from "@/components/ui/KraftCard";
import Reveal from "@/components/ui/Reveal";

const CARDS = [
  { emoji: "😰", text: "성분표를 아무리 읽어도 불안해, 결국 늘 사던 것만 반복해요." },
  { emoji: "😔", text: "잘 먹던 간식을 갑자기 외면해, 뜯지도 않은 포장이 쌓여요." },
  { emoji: "🤔", text: "‘무첨가’라는데, 정작 뭐가 들었는지 알 수가 없어요." },
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
