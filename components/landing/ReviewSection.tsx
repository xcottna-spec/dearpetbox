import { REVIEWS, SUBSCRIBER_COUNT } from "@/data/reviews";
import Reveal from "@/components/ui/Reveal";

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`별점 ${n}점`} className="text-stamp">
      {"★".repeat(n)}
      <span className="text-borderk">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export default function ReviewSection() {
  return (
    <section className="texture-kraft bg-parchment py-20">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-center text-section font-bold text-ink">
          이미 {SUBSCRIBER_COUNT.toLocaleString()}마리의 반려견이 맞춤 간식을 받고
          있어요
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 0.1}>
              <figure className="flex h-full flex-col rounded-lg border-2 border-borderk bg-cream p-6 shadow-kraft-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-kraft-light text-lg">
                    🐶
                  </div>
                  <div>
                    <div className="font-bold text-ink">{r.dogName}</div>
                    <Stars n={r.rating} />
                  </div>
                </div>
                <blockquote className="mt-4 flex-1 text-ink-light">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-4 text-sm text-ink-light">
                  {r.guardian}, {r.location}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center">
          <a
            href="https://instagram.com/dearpetbox"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-stamp underline underline-offset-4"
          >
            더 많은 후기 보기 @dearpetbox
          </a>
        </p>
      </div>
    </section>
  );
}
