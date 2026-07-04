import { REVIEWS } from "@/data/reviews";
import Reveal from "@/components/ui/Reveal";

const AVATARS = [
  "photo-1583511655857-d19b40a7a54e",
  "photo-1597633425046-08f5110420b5",
  "photo-1517849845537-4d257902454a",
  "photo-1518717758536-85ae29035b6d",
  "photo-1568393691622-c7ba131d63b4",
  "photo-1593134257782-e89567b7718a",
];

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
    <section id="reviews" className="bg-parchment py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Reviews
        </p>
        <h2 className="mt-3 text-center text-section font-bold text-ink">
          먼저 만난 보호자들의 이야기
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 0.1}>
              <figure className="flex h-full flex-col rounded-lg border-2 border-borderk bg-cream p-6 shadow-kraft-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="h-11 w-11 shrink-0 rounded-full border border-borderk bg-kraft-light bg-cover bg-center"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/${AVATARS[i % AVATARS.length]}?w=120&q=70&auto=format&fit=crop')`,
                    }}
                    role="img"
                    aria-label={`${r.dogName} 사진`}
                  />
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
