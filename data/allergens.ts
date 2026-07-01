export interface Allergen {
  id: string;
  label: string;
  icon: string;
}

export const ALLERGENS: Allergen[] = [
  { id: "chicken", label: "닭고기", icon: "🍗" },
  { id: "beef", label: "소고기", icon: "🥩" },
  { id: "pork", label: "돼지고기", icon: "🐷" },
  { id: "salmon", label: "연어", icon: "🐟" },
  { id: "dairy", label: "유제품", icon: "🥛" },
  { id: "wheat", label: "밀", icon: "🌾" },
  { id: "egg", label: "달걀", icon: "🥚" },
  { id: "soy", label: "대두", icon: "🫘" },
  { id: "corn", label: "옥수수", icon: "🌽" },
  { id: "potato", label: "감자", icon: "🥔" },
  { id: "duck", label: "오리고기", icon: "🦆" },
  { id: "lamb", label: "양고기", icon: "🐑" },
];
