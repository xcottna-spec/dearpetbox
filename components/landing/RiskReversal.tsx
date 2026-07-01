import StampBadge from "@/components/ui/StampBadge";

export default function RiskReversal() {
  return (
    <section className="texture-kraft bg-kraft-dark py-20 text-parchment">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <h2 className="text-section font-bold text-cream">
          마음에 안 들면 반품하세요
        </h2>
        <p className="mt-3 text-lg text-parchment/90">
          그리고 그게 더 잘 맞는 박스를 만드는 방법이에요.
        </p>

        <div className="mx-auto mt-8 max-w-2xl space-y-4 text-parchment/90">
          <p>간식은 먹어보기 전까지 모릅니다. 우리도 알아요.</p>
          <p>
            반품한 간식의 피드백이 반려견 프로파일을 더 정교하게 만들고, 반품
            금액은 포인트로 전환돼 다음 박스 할인에 사용할 수 있습니다.
          </p>
        </div>

        <p className="font-brand mt-8 text-2xl font-bold text-cream sm:text-3xl">
          반품이 쌓일수록 더 잘 맞아집니다.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <StampBadge className="border-parchment bg-parchment/10 text-parchment">
            첫 달 100% 만족 보장
          </StampBadge>
          <StampBadge
            rotate="right"
            className="border-parchment bg-parchment/10 text-parchment"
          >
            반품 → 포인트 전환
          </StampBadge>
          <StampBadge className="border-parchment bg-parchment/10 text-parchment">
            언제든 해지 가능
          </StampBadge>
        </div>
      </div>
    </section>
  );
}
