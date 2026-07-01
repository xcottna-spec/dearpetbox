import { PLANS } from "@/data/pricing";
import Button from "@/components/ui/Button";

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Subscription
        </p>
        <h2 className="mt-3 text-center text-section font-bold text-ink">
          A·B·C, 우리 아이 등급을 고르세요
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
          {PLANS.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col border bg-cream p-8 ${
                p.highlight
                  ? "border-gold shadow-kraft md:-translate-y-2"
                  : "border-border"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ink px-3 py-1 text-xs font-bold tracking-widest text-cream">
                  {p.badge}
                </span>
              )}
              <div className="flex items-baseline gap-2">
                <span className="font-brand text-4xl font-bold text-gold">
                  {p.grade}
                </span>
                <span className="font-serif-kr text-xl font-bold text-ink">
                  {p.name}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-light">{p.tagline}</p>

              <div className="mt-5">
                <span className="font-serif-kr text-3xl font-bold text-ink">
                  {p.price.toLocaleString()}
                </span>
                <span className="text-ink-light"> 원 / 월</span>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-ink">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-gold">✦</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex-1" />
              <Button
                href={`/quiz?plan=${p.id}`}
                variant={p.highlight ? "primary" : "secondary"}
                fullWidth
                withArrow
              >
                {p.grade} 등급으로 시작
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-light">
          언제든 해지 가능 · 다음 배송 3일 전까지 취소
        </p>
      </div>
    </section>
  );
}
