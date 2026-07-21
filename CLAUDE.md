# Dear Pet Box — 프로젝트 지침

## 정체성
반려견 맞춤 간식 정기구독. **dearpetbox.co.kr(카페24) = 결제·주문·회원의 정본.**
이 저장소(Vercel 배포) = 보조 랜딩 + 맞춤진단 퍼널. **이 사이트에서 결제 구현 금지.**

## 카피 불변규칙 (소비자 노출 문구 전체)
- "수제" 금지 → **맞춤**
- "등급·플랜" 금지 → **박스·구성**
- **개수 약속(N종) 금지** → 구성 중심 표현 (매달 구성이 변하므로 개수를 약속하면 허위표기 리스크)
- "100% 환불" 금지 → **첫 박스 안심 케어(포인트)** — 법정 청약철회와 별개의 추가 혜택으로만 표현
- 제형(동결건조 등)을 플랜 약속으로 걸지 않는다
- 허위 수치 금지 · 문구 2~3줄 · break-keep

## 수평 구조 — 수정 지점 최소화 (여기만 고치면 전체 반영)
| 무엇 | 어디 |
|---|---|
| 브랜드 카피·URL | `data/brand.ts` BRAND |
| 사업자 정보 (★값은 등록 후 갱신) | `data/brand.ts` COMPANY — 푸터·약관 2종이 참조 |
| 플랜 문구·가격·카페24 상품링크 | `data/pricing.ts` |
| 간식 DB·큐레이션 규칙 | `data/treats.ts` + `lib/curator.ts` |
| 프로파일 서버 동기화 | `lib/profile-sync.ts` + `/api/profile/restore` |
| 리드 적재 (Supabase+시트 미러) | `/api/lead` (env: SHEET_WEBHOOK_URL) |

## 불변식 (깨뜨리면 안 되는 것)
1. **알러지 세이프**: 제외 알레르겐과 겹치는 간식은 큐레이션 후보에서 원천 제외 (curator.ts 안전 필터 완화 금지)
2. **히스토리 보존**: 회원 프로파일은 가입 시 서버 저장되고, 로컬이 비면 자동 복원된다 — 어떤 변경도 이 흐름을 끊지 말 것
3. 법정 청약철회(7일)는 어떤 자체 정책 문구보다 우선

## 검증 원칙
- 소비자 플로우 변경 시: `tsc --noEmit` + `npm run build` + **브라우저 실측**
  (Playwright: `/opt/node22/lib/node_modules/playwright`, chromium: `/opt/pw-browsers/chromium-*/chrome-linux/chrome`)
- 커밋 전 금지어 검사: `grep -rE '[0-9]+종|수제|플랜' app components data` — data/treats.ts의 개별 상품 사실 설명은 예외

## 배포
`main` push = Vercel 자동배포(프로덕션). 작업 브랜치 `claude/dog-nutrition-curator-73am1z` — 머지 후엔 최신 main에서 재생성.

## 경영 컨텍스트 (요약)
- 유지박스 영업이익 목표: A ≥10% / B·C ≥15% (현 모델: A 9.9 / B 22.8 / C 29.9%)
- A 에브리데이 = 획득 장치 (KPI: 첫구독 2회차 유지율 ≥60%), 가입 3,000P 첫 박스 사용 허용
- 상세 이력·전략: 구글드라이브 `dearpet/HANDOFF_v2` 문서
