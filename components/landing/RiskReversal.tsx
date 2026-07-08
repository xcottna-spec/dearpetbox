import StampBadge from "@/components/ui/StampBadge";

export default function RiskReversal() {
  return (
    <section className="bg-ink py-20 text-parchment">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <h2 className="text-section font-bold text-cream">
          마음에 안 들면 반품하세요
        </h2>
        <p className="mt-3 text-lg text-parchment/90">
          그리고 그게 더 잘 맞는 박스를 만드는 방법이에요.
        </p>

        <p className="mx-auto mt-8 max-w-xl text-parchment/90">
          간식은 먹어보기 전까진 몰라요.
          <br />
          안 맞으면 반품하고 다음 박스에서 무료로 교체받으세요.
        </p>

        <p className="font-brand mt-8 text-2xl font-bold text-cream sm:text-3xl">
          반품이 쌓일수록 더 잘 맞아집니다.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <StampBadge className="border-parchment bg-parchment/10 text-parchment">
            첫 박스 안심 케어
          </StampBadge>
          <StampBadge
            rotate="right"
            className="border-parchment bg-parchment/10 text-parchment"
          >
            반품 → 무료 교체
          </StampBadge>
          <StampBadge className="border-parchment bg-parchment/10 text-parchment">
            언제든 해지 가능
          </StampBadge>
        </div>
      </div>
    </section>
  );
}
