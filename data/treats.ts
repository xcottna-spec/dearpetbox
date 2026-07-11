// 큐레이션 엔진이 추천 후보로 사용하는 간식 데이터셋.
// 각 간식은 어떤 알레르겐을 포함하는지(allergens), 어떤 케어 효능을 가지는지(care),
// 식감/씹는 힘/단백질원을 명시한다. 엔진은 이 정보를 바탕으로 안전 필터링 후 점수화한다.

/** 건강 케어 효능 키 */
export type CareKey =
  | "skin" // 피부·털
  | "digestion" // 소화
  | "joint" // 관절
  | "immune" // 면역력
  | "weight" // 체중 관리
  | "tear" // 눈물 자국
  | "dental"; // 치아·구강

/** 식감 */
export type TextureKey = "crunchy" | "chewy" | "soft";

/** 씹는 힘(치악력) 적합도 */
export type Hardness = "soft" | "medium" | "hard";

export interface Treat {
  id: string;
  name: string;
  /** 주 단백질원 라벨(설명용) */
  proteinLabel: string;
  /**
   * 포함된 알레르겐 id (data/allergens.ts 와 동일 체계).
   * 안전 필터의 핵심 — 제외 알레르겐과 하나라도 겹치면 절대 추천하지 않는다.
   */
  allergens: string[];
  /** 단백질 카테고리 — 선호 맛 매칭용 */
  proteinCategory: "meat" | "fish" | "veggie" | "dairy";
  texture: TextureKey;
  hardness: Hardness;
  care: CareKey[];
  keyIngredients: string[];
  /** 저자극(신규 단백질/제한 원료) 여부 — 알레르기 보유견에 가점 */
  hypoallergenic?: boolean;
  /** 이 간식이 포함되기 시작하는 최소 박스 등급 */
  tier: "A" | "B" | "C";
  desc: string;
}

export const TREATS: Treat[] = [
  {
    id: "chicken-jerky",
    name: "닭가슴살 저키",
    proteinLabel: "닭고기",
    allergens: ["chicken"],
    proteinCategory: "meat",
    texture: "chewy",
    hardness: "medium",
    care: ["skin", "weight"],
    keyIngredients: ["국내산 닭가슴살", "저지방"],
    tier: "A",
    desc: "고단백 저지방 기본 간식. 체중 관리와 근육 유지에 무난해요.",
  },
  {
    id: "beef-bites",
    name: "소고기 큐브",
    proteinLabel: "소고기",
    allergens: ["beef"],
    proteinCategory: "meat",
    texture: "chewy",
    hardness: "hard",
    care: ["immune", "dental"],
    keyIngredients: ["한우 부산물", "철분"],
    tier: "A",
    desc: "쫄깃한 식감으로 씹는 재미가 좋고 철분·아연이 풍부해요.",
  },
  {
    id: "duck-tender",
    name: "오리안심 트릿",
    proteinLabel: "오리고기",
    allergens: ["duck"],
    proteinCategory: "meat",
    texture: "chewy",
    hardness: "medium",
    care: ["skin", "digestion"],
    keyIngredients: ["오리안심", "불포화지방산"],
    hypoallergenic: true,
    tier: "B",
    desc: "닭·소에 예민한 아이에게 자주 선택되는 대체 단백질이에요.",
  },
  {
    id: "lamb-soft",
    name: "양고기 소프트바이트",
    proteinLabel: "양고기",
    allergens: ["lamb"],
    proteinCategory: "meat",
    texture: "soft",
    hardness: "soft",
    care: ["joint", "skin"],
    keyIngredients: ["양고기", "L-카르니틴"],
    hypoallergenic: true,
    tier: "B",
    desc: "부드러워 노령견·이앓이 아이에게 좋고 관절·피부 케어를 도와요.",
  },
  {
    id: "salmon-cube",
    name: "연어 오메가 큐브",
    proteinLabel: "연어",
    allergens: ["fish"],
    proteinCategory: "fish",
    texture: "crunchy",
    hardness: "medium",
    care: ["skin", "joint", "immune"],
    keyIngredients: ["생연어", "오메가-3(EPA·DHA)"],
    tier: "B",
    desc: "오메가-3가 풍부해 피부·털 윤기와 관절 건강을 함께 챙겨요.",
  },
  {
    id: "pollock-stick",
    name: "황태 스틱",
    proteinLabel: "황태(명태)",
    allergens: ["fish"],
    proteinCategory: "fish",
    texture: "crunchy",
    hardness: "hard",
    care: ["joint", "dental"],
    keyIngredients: ["국내산 황태", "저염 처리"],
    tier: "A",
    desc: "단단해 치석 관리에 도움되고 저지방 고단백이에요.",
  },
  {
    id: "sweet-potato",
    name: "고구마 말랭이",
    proteinLabel: "채소",
    allergens: [],
    proteinCategory: "veggie",
    texture: "chewy",
    hardness: "soft",
    care: ["digestion", "weight"],
    keyIngredients: ["국내산 고구마", "식이섬유"],
    hypoallergenic: true,
    tier: "A",
    desc: "알레르겐 걱정 없는 식이섬유 간식. 소화·포만감에 좋아요.",
  },
  {
    id: "pumpkin-chip",
    name: "단호박 칩",
    proteinLabel: "채소",
    allergens: [],
    proteinCategory: "veggie",
    texture: "crunchy",
    hardness: "medium",
    care: ["digestion", "weight", "immune"],
    keyIngredients: ["단호박", "베타카로틴"],
    hypoallergenic: true,
    tier: "A",
    desc: "저칼로리에 베타카로틴이 풍부해 면역·소화를 함께 도와요.",
  },
  {
    id: "carrot-stick",
    name: "당근 크런치",
    proteinLabel: "채소",
    allergens: [],
    proteinCategory: "veggie",
    texture: "crunchy",
    hardness: "hard",
    care: ["tear", "weight", "dental"],
    keyIngredients: ["당근", "루테인"],
    hypoallergenic: true,
    tier: "A",
    desc: "아삭한 식감으로 치아를 자극하고 눈 건강 성분을 담았어요.",
  },
  {
    id: "blueberry-yogurt",
    name: "블루베리 요거트바이트",
    proteinLabel: "유제품·과일",
    allergens: ["dairy"],
    proteinCategory: "dairy",
    texture: "soft",
    hardness: "soft",
    care: ["tear", "immune"],
    keyIngredients: ["그릭요거트", "블루베리(안토시아닌)"],
    tier: "C",
    desc: "항산화 성분이 풍부해 눈물 자국·면역 관리에 인기예요.",
  },
  {
    id: "cottage-cheese",
    name: "코티지치즈 큐브",
    proteinLabel: "유제품",
    allergens: ["dairy"],
    proteinCategory: "dairy",
    texture: "soft",
    hardness: "soft",
    care: ["immune", "skin"],
    keyIngredients: ["저염 코티지치즈", "칼슘"],
    tier: "B",
    desc: "부드럽고 기호성이 높아 급여·투약 보조 간식으로 좋아요.",
  },
  {
    id: "egg-yolk-ball",
    name: "노른자 볼",
    proteinLabel: "달걀",
    allergens: ["egg"],
    proteinCategory: "meat",
    texture: "crunchy",
    hardness: "medium",
    care: ["skin", "immune"],
    keyIngredients: ["동결건조 노른자", "비오틴"],
    tier: "B",
    desc: "비오틴이 풍부해 피부·모질 개선에 도움을 줘요.",
  },
  {
    id: "salmon-joint-chew",
    name: "연어 관절 소프트츄",
    proteinLabel: "연어",
    allergens: ["fish"],
    proteinCategory: "fish",
    texture: "soft",
    hardness: "soft",
    care: ["joint", "skin"],
    keyIngredients: ["연어", "글루코사민", "MSM"],
    tier: "C",
    desc: "글루코사민·MSM을 담은 기능성 소프트츄. 관절 집중 케어예요.",
  },
  {
    id: "insect-protein",
    name: "곤충단백 하이포 트릿",
    proteinLabel: "동애등에 단백",
    allergens: [],
    proteinCategory: "veggie",
    texture: "crunchy",
    hardness: "medium",
    care: ["skin", "digestion", "immune"],
    keyIngredients: ["동애등에 단백", "라우르산"],
    hypoallergenic: true,
    tier: "C",
    desc: "일반 단백질에 모두 예민한 아이를 위한 신규 단백질 간식이에요.",
  },
  {
    id: "cod-freeze",
    name: "동결건조 대구",
    proteinLabel: "대구(흰살생선)",
    allergens: ["fish"],
    proteinCategory: "fish",
    texture: "crunchy",
    hardness: "soft",
    care: ["skin", "weight", "digestion"],
    keyIngredients: ["대구살", "저지방 흰살"],
    hypoallergenic: true,
    tier: "B",
    desc: "지방이 적은 흰살생선으로 소화가 편하고 다이어트에 좋아요.",
  },
];
