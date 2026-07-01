const ROWS = [
  { label: "이름", value: "망고" },
  { label: "견종", value: "포메라니안" },
  { label: "나이", value: "3살 4개월" },
  { label: "체중", value: "S (4~7kg)" },
  { label: "제외 성분", value: "닭고기, 유제품" },
  { label: "선호", value: "바삭한 식감 · 생선" },
  { label: "건강 목표", value: "피부·털 건강" },
];

export default function ProfilePage() {
  return (
    <div>
      <h1 className="font-serif-kr text-xl font-bold text-ink">반려견 프로파일</h1>
      <div className="mt-4 rounded-lg border-2 border-borderk bg-cream p-6 shadow-kraft-sm">
        <dl className="divide-y divide-borderk">
          {ROWS.map((r) => (
            <div key={r.label} className="flex items-center justify-between py-3">
              <dt className="text-sm text-ink-light">{r.label}</dt>
              <dd className="font-medium text-ink">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="mt-3 text-sm text-ink-light">
        수정 시 <b className="text-ink">다음 박스부터 반영</b>됩니다.
      </p>
    </div>
  );
}
