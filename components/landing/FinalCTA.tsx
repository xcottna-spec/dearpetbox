import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="bg-kraft-light py-20">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <h2 className="text-section font-bold text-ink">
          시작은 3분짜리 진단 하나.
        </h2>
        <p className="mt-4 text-lg text-ink-light">
          알레르기·취향·건강만 알려주세요. 나머지는 디어펫이.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/quiz" withArrow>
            내 아이 맞춤 진단 시작하기
          </Button>
        </div>
        <p className="mt-4 text-sm text-ink-light">
          구독 전 취소 가능 · 첫 달 100% 만족 보장 · 알레르기 성분 100% 제외 보장
        </p>
      </div>
    </section>
  );
}
