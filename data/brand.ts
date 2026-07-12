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

// 사업자 정보 단일 출처 — 푸터·이용약관·개인정보처리방침이 모두 여기서 읽는다.
// ★ 표시 값은 등록·개통 완료 후 이 파일에서만 갱신하면 전체 반영됨.
export const COMPANY = {
  legalName: "디어펫 (Dear Pet)",
  ceo: "나현",
  bizNo: "000-00-00000", // ★ 사업자등록번호
  mailOrderNo: "신고 준비 중", // ★ 통신판매업 신고번호 (PG 연동 후)
  address: "경기 용인시 기흥구", // ★ 상세 주소
  phone: "070-0000-0000", // ★ 고객센터 번호
  email: "xcottna@gmail.com", // ★ 공식 문의 이메일 개설 시 갱신
  kakaoUrl: "http://pf.kakao.com/_lqGNn",
  privacyOfficer: "나현",
  termsEffectiveDate: "2026년 7월 11일",
} as const;
