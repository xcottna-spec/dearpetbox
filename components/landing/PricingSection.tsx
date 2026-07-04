import { PLANS } from "@/data/pricing";
import Button from "@/components/ui/Button";

// 플랜별 무드 사진 (4K 원본 → 카드 사이즈 최적화)
const PLAN_IMG: Record<string, { id: string; pos: string; alt: string }> = {
  A: {
    id: "photo-1548199973-03cce0bbc87b",
    pos: "center 45%",
    alt: "산책길을 함께 달리는 강아지들 — 매일의 즐거움",
  },
  B: {
    id: "photo-1583511655857-d19b40a7a54e",
    pos: "center 30%",
    alt: "카메라를 바라보는 골든리트리버 — 디어펫 대표 플랜",
  },
  C: {
    id: "photo-1601758124510-52d02ddb7cbd",
    pos: "center 20%",
    alt: "보호자 품에 안긴 강아지 — 세심한 케어",
  },
};

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Subscription
        </p>
        <h2 className="mt-3 text-center text-section font-bold text-ink">
          우리 아이에게 맞는 플랜을 골라보세요
        </h2>
        <p className="mt-3 text-center text-ink-light">
          어떤 플랜이든, 우리 아이 프로파일에 맞춰 구성됩니다.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
          {PLANS.map((p) => {
            const img = PLAN_IMG[p.id];
            return (
              <div
                key={p.id}
                className={`relative flex flex-col overflow-hidden border bg-cream ${
                  p.highlight
                    ? "border-gold shadow-kraft md:-translate-y-2"
                    : "border-border"
                }`}
              >
                {/* 플랜 무드 사진 */}
                <div
                  className="h-44 bg-cover"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/${img.id}?w=1200&q=85&auto=format&fit=crop')`,
                    backgroundPosition: img.pos,
                  }}
                  role="img"
                  aria-label={img.alt}
                />
                {p.badge && (
                  <span className="absolute left-4 top-4 bg-ink px-3 py-1 text-xs font-bold tracking-widest text-cream">
                    {p.badge}
                  </span>
                )}

                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-baseline gap-2">
                    <span className="font-brand text-3xl font-bold text-gold">
                      {p.grade}
                    </span>
                    <span className="font-serif-kr text-xl font-bold text-ink">
                      {p.name}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-light">{p.tagline}</p>

                  <div className="mt-4">
                    <span className="font-serif-kr text-3xl font-bold text-ink">
                      {p.price.toLocaleString()}
                    </span>
                    <span className="text-ink-light"> 원 / 월</span>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-ink">
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
                    {p.name} 시작하기
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-ink-light">
          언제든 해지 가능 · 다음 배송 3일 전까지 취소
        </p>
      </div>
    </section>
  );
}
