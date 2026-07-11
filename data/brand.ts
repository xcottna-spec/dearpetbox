// 브랜드 공통 카피·상수의 단일 출처.
// 여기만 고치면 메타태그(app/layout)·구조화데이터(JsonLd)에 동시 반영된다.
// 카피 규칙: 수제 금지→맞춤 / 등급·플랜 금지→박스·구성 / 개수(N종) 약속 금지 / 허위수치 금지.
export const BRAND = {
  name: "Dear Pet Box",
  url: "https://dearpetbox.co.kr",
  title: "디어펫 박스 | 우리 아이 맞춤 간식 구독",
  description:
    "반려견 알레르기와 취향을 분석해 매달 딱 맞는 맞춤 간식 박스를 보내드립니다. 안 맞은 간식은 포인트로, 다음 박스는 더 정확하게.",
  ogDescription:
    "알레르기 성분은 빼고, 좋아하는 맛은 넣어서 — 매달 우리 아이 맞춤 간식 박스.",
} as const;
