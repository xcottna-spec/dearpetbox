import { PLANS } from "@/data/pricing";
import Button from "@/components/ui/Button";

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center text-section font-bold text-ink">
          어떤 방식으로 받아보실래요?
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
          {PLANS.map((p) => (
            <div
              key={p.id}
              className={`relative flex flex-col rounded-lg border-2 bg-cream p-8 ${
                p.highlight
                  ? "border-stamp shadow-kraft md:-translate-y-2"
                  : "border-borderk shadow-kraft-sm"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-stamp px-3 py-1 text-xs font-bold text-cream">
                  {p.badge}
                </span>
              )}
              <h3 className="text-xl font-bold text-ink">{p.name}</h3>
              <div className="mt-4">
                <span className="font-serif-kr text-4xl font-bold text-ink">
                  {p.monthlyPrice.toLocaleString()}
                </span>
                <span className="text-ink-light"> 원 / 월</span>
              </div>
              <p className="mt-1 text-sm text-ink-light">
                총 {p.totalPrice.toLocaleString()}원 · {p.billingLabel}
                {p.savePercent ? ` · ${p.savePercent}% 절약` : ""}
              </p>
              <div className="mt-6 flex-1" />
              <Button
                href={`/quiz?plan=${p.id}`}
                variant={p.highlight ? "primary" : "secondary"}
                fullWidth
                withArrow
              >
                이 플랜으로 시작
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
