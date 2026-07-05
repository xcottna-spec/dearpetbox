export interface Allergen {
  id: string;
  label: string;
  icon: string;
}

// 보호자가 실제로 확인하기 쉬운 대표 단백질원 중심 8종.
// 그 외(밀·옥수수 등 판별 어려운 항목)는 퀴즈의 '기타 메모(비고)'로 수집한다.
export const ALLERGENS: Allergen[] = [
  { id: "chicken", label: "닭고기", icon: "🍗" },
  { id: "beef", label: "소고기", icon: "🥩" },
  { id: "pork", label: "돼지고기", icon: "🐷" },
  { id: "duck", label: "오리고기", icon: "🦆" },
  { id: "lamb", label: "양고기", icon: "🐑" },
  { id: "fish", label: "생선(연어 등)", icon: "🐟" },
  { id: "dairy", label: "유제품", icon: "🥛" },
  { id: "egg", label: "달걀", icon: "🥚" },
];
