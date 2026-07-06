// 반려견 맞춤 영양 큐레이션 엔진 (규칙 기반 · 결정론적)
//
// 설계 원칙 — 안전 최우선:
//   1) 제외 알레르겐(선택 + 기타메모 키워드)과 겹치는 간식은 절대 후보에 넣지 않는다.
//   2) 그다음 케어 목표·선호 맛·식감·씹는 힘·생애주기로 점수화해 TOP5를 뽑는다.
//   3) 판별이 어려운(사람 확인이 필요한) 입력이 있으면 신뢰도를 낮추고 수의사 상담을 권한다.
//
// LLM을 쓰지 않으므로 동일 입력 → 동일 결과가 보장되고, 알레르기 충돌 추천이
// 원천적으로 불가능하다.

import { TREATS, type Treat, type CareKey, type TextureKey } from "@/data/treats";
import { ALLERGENS } from "@/data/allergens";

export interface DogProfile {
  name: string;
  breed: string;
  ageMonths: number;
  weight: string; // "M (7~15kg)" 형태의 라벨
  gender: string;
  allergies: string[]; // 알레르겐 id
  allergyNote: string;
  noAllergy: boolean;
  textures: string[]; // 퀴즈 식감 라벨
  flavors: string[]; // 퀴즈 선호 맛 라벨
  healthGoals: string[]; // 퀴즈 건강 목표 라벨
  plan: string;
}

export type LifeStage = "puppy" | "adult" | "senior";

export interface Recommendation {
  treat: Treat;
  score: number; // 정규화된 매칭도 (0~100)
  reasons: string[];
}

export interface CurationResult {
  lifeStage: LifeStage;
  lifeStageLabel: string;
  /** 건강 상태 분석 문장 */
  healthAnalysis: string[];
  /** 위험 요소 분석 */
  riskFactors: string[];
  /** 추천 간식 TOP5 */
  top5: Recommendation[];
  /** 피해야 할 성분(라벨) */
  avoidIngredients: string[];
  /** 대체 상품 제안 */
  alternatives: Recommendation[];
  /** 추천 신뢰도 (0~100) */
  confidence: number;
  /** 수의사 상담 권장 여부 */
  vetConsult: boolean;
  vetConsultReason?: string;
}

// ── 라벨 → 내부 키 매핑 ────────────────────────────────────────────────

const GOAL_TO_CARE: Record<string, CareKey> = {
  "피부·털 건강": "skin",
  "소화 건강": "digestion",
  "관절 케어": "joint",
  면역력: "immune",
  "체중 관리": "weight",
};

const TEXTURE_TO_KEY: Record<string, TextureKey> = {
  "바삭한 식감": "crunchy",
  "쫄깃한 식감": "chewy",
  "부드러운 식감": "soft",
};

const CARE_LABEL: Record<CareKey, string> = {
  skin: "피부·털",
  digestion: "소화",
  joint: "관절",
  immune: "면역력",
  weight: "체중 관리",
  tear: "눈물 자국",
  dental: "치아·구강",
};

const FLAVOR_TO_CATEGORY: Record<string, Treat["proteinCategory"]> = {
  "육류 (닭·소·오리)": "meat",
  "생선 (연어·황태)": "fish",
  "채소·과일": "veggie",
  유제품: "dairy",
};

// 기타 메모에서 잡아내는 알레르겐 키워드 → 알레르겐 id (없으면 라벨만 회수)
const NOTE_ALLERGEN_KEYWORDS: { re: RegExp; id?: string; label: string }[] = [
  { re: /(닭|치킨|계육)/, id: "chicken", label: "닭고기" },
  { re: /(소고기|쇠고기|우육|비프)/, id: "beef", label: "소고기" },
  { re: /(돼지|돈육|포크)/, id: "pork", label: "돼지고기" },
  { re: /(오리|덕)/, id: "duck", label: "오리고기" },
  { re: /(양고기|램)/, id: "lamb", label: "양고기" },
  { re: /(생선|연어|황태|참치|대구|어류)/, id: "fish", label: "생선" },
  { re: /(우유|유제품|치즈|요거트|유당)/, id: "dairy", label: "유제품" },
  { re: /(달걀|계란|난류)/, id: "egg", label: "달걀" },
  { re: /(밀|글루텐|소맥)/, label: "밀·글루텐" },
  { re: /(옥수수|콘)/, label: "옥수수" },
  { re: /(콩|대두)/, label: "콩·대두" },
];

// ── 유틸 ──────────────────────────────────────────────────────────────

export function getLifeStage(ageMonths: number): LifeStage {
  if (ageMonths < 12) return "puppy";
  if (ageMonths >= 84) return "senior"; // 만 7세+
  return "adult";
}

function lifeStageLabel(stage: LifeStage): string {
  return stage === "puppy" ? "퍼피(성장기)" : stage === "senior" ? "시니어(노령기)" : "어덜트(성견)";
}

const allergenLabel = (id: string): string =>
  ALLERGENS.find((a) => a.id === id)?.label ?? id;

/** 제외 알레르겐 id + 사람 확인이 필요한 기타 라벨을 계산 */
function resolveAvoid(profile: DogProfile): {
  ids: Set<string>;
  labels: string[];
  noteUncertain: boolean;
} {
  const ids = new Set<string>();
  const labels: string[] = [];
  let noteUncertain = false;

  if (!profile.noAllergy) {
    for (const id of profile.allergies) {
      ids.add(id);
      labels.push(allergenLabel(id));
    }
  }

  const note = (profile.allergyNote || "").trim();
  if (note) {
    let matched = false;
    for (const kw of NOTE_ALLERGEN_KEYWORDS) {
      if (kw.re.test(note)) {
        matched = true;
        if (kw.id) ids.add(kw.id);
        if (!labels.includes(kw.label)) labels.push(kw.label);
      }
    }
    // 메모는 있는데 알려진 알레르겐 키워드로 특정되지 않으면 사람 확인이 필요
    if (!matched) noteUncertain = true;
  }

  return { ids, labels, noteUncertain };
}

// ── 메인 엔진 ─────────────────────────────────────────────────────────

export function curate(profile: DogProfile): CurationResult {
  const stage = getLifeStage(profile.ageMonths);
  const avoid = resolveAvoid(profile);

  const careTargets = profile.healthGoals
    .map((g) => GOAL_TO_CARE[g])
    .filter((c): c is CareKey => Boolean(c));
  const textureTargets = profile.textures
    .map((t) => TEXTURE_TO_KEY[t])
    .filter((t): t is TextureKey => Boolean(t));
  const flavorTargets = profile.flavors
    .map((f) => FLAVOR_TO_CATEGORY[f])
    .filter((c): c is Treat["proteinCategory"] => Boolean(c));

  const hasAllergy = avoid.ids.size > 0 || avoid.labels.length > 0;

  // 1) 안전 필터 — 제외 알레르겐과 겹치는 간식 완전 제외
  const safe = TREATS.filter(
    (t) => !t.allergens.some((a) => avoid.ids.has(a))
  );

  // 2) 점수화
  const scored: Recommendation[] = safe.map((t) => {
    let raw = 0;
    const reasons: string[] = [];

    // 케어 목표 매칭 (최대 가중치)
    const matchedCare = t.care.filter((c) => careTargets.includes(c));
    if (matchedCare.length) {
      raw += matchedCare.length * 30;
      reasons.push(
        `${matchedCare.map((c) => CARE_LABEL[c]).join("·")} 케어에 도움돼요`
      );
    }

    // 선호 맛
    if (flavorTargets.length && flavorTargets.includes(t.proteinCategory)) {
      raw += 15;
      reasons.push(`좋아하는 ${t.proteinLabel} 계열이에요`);
    }

    // 식감
    if (textureTargets.length && textureTargets.includes(t.texture)) {
      raw += 12;
    }

    // 생애주기 · 씹는 힘 적합도
    if (stage === "senior" || stage === "puppy") {
      if (t.hardness === "hard") {
        raw -= 25;
      } else if (t.hardness === "soft") {
        raw += 12;
        reasons.push(
          stage === "senior"
            ? "부드러워 노령견 치아에 부담이 적어요"
            : "부드러워 성장기 이갈이 시기에 편해요"
        );
      }
    }

    // 알레르기 보유견에게는 저자극 신규 단백질 가점
    if (hasAllergy && t.hypoallergenic) {
      raw += 18;
      reasons.push("저자극 원료라 예민한 아이에게 안심돼요");
    }

    // 체중 관리 목표 + 저지방 간식 보정 (care.weight 로 이미 일부 반영됨)
    if (careTargets.includes("weight") && t.proteinCategory === "veggie") {
      raw += 6;
    }

    // 현재 선택 박스 등급에 포함되면 소폭 가점
    if (tierRank(t.tier) <= tierRank(profile.plan)) {
      raw += 4;
    }

    return { treat: t, score: raw, reasons };
  });

  // 3) 정렬 + 정규화(가장 높은 점수를 100 기준으로)
  scored.sort((a, b) => b.score - a.score);
  const maxRaw = Math.max(1, scored[0]?.score ?? 1);
  for (const rec of scored) {
    // 45~99 범위로 매핑 — 후보라면 최소한의 적합도는 보장
    rec.score = Math.round(45 + Math.max(0, rec.score) * (54 / maxRaw));
    if (rec.score > 99) rec.score = 99;
    if (!rec.reasons.length) {
      rec.reasons.push("알레르기 걱정 없이 무난하게 급여할 수 있어요");
    }
  }

  const top5 = scored.slice(0, 5);
  const alternatives = scored.slice(5, 8);

  // 4) 건강 상태 분석
  const healthAnalysis = buildHealthAnalysis(profile, stage, careTargets);

  // 5) 위험 요소
  const riskFactors = buildRiskFactors(profile, stage, avoid, safe.length);

  // 6) 피해야 할 성분
  const avoidIngredients = buildAvoidIngredients(profile, stage, avoid.labels);

  // 7) 신뢰도
  const confidence = buildConfidence(profile, {
    careCount: careTargets.length,
    flavorCount: flavorTargets.length,
    textureCount: textureTargets.length,
    candidateCount: safe.length,
    noteUncertain: avoid.noteUncertain,
  });

  // 8) 수의사 상담 권장 여부
  const { vetConsult, vetConsultReason } = buildVetConsult(
    profile,
    stage,
    avoid,
    safe.length
  );

  return {
    lifeStage: stage,
    lifeStageLabel: lifeStageLabel(stage),
    healthAnalysis,
    riskFactors,
    top5,
    avoidIngredients,
    alternatives,
    confidence,
    vetConsult,
    vetConsultReason,
  };
}

function tierRank(tier: string): number {
  return tier === "A" ? 1 : tier === "B" ? 2 : tier === "C" ? 3 : 2;
}

function buildHealthAnalysis(
  profile: DogProfile,
  stage: LifeStage,
  careTargets: CareKey[]
): string[] {
  const out: string[] = [];
  const years = Math.floor(profile.ageMonths / 12);
  const breed = profile.breed || "우리 아이";

  if (stage === "puppy") {
    out.push(
      `${breed}는 아직 성장기예요. 근육·뼈 발달을 위한 양질의 단백질과 소화가 편한 간식이 중요해요.`
    );
  } else if (stage === "senior") {
    out.push(
      `만 ${years}세, 노령기에 접어들었어요. 관절과 소화 부담을 줄이는 부드러운 저지방 간식이 좋아요.`
    );
  } else {
    out.push(
      `만 ${years}세 성견으로 활동량 유지가 중요한 시기예요. 균형 잡힌 단백질 간식으로 컨디션을 지켜요.`
    );
  }

  if (careTargets.includes("weight")) {
    out.push("체중 관리가 목표라 저칼로리·고식이섬유 간식을 우선 배치했어요.");
  }
  if (careTargets.includes("joint")) {
    out.push("관절 고민이 있어 오메가-3·글루코사민 성분 간식을 추천에 반영했어요.");
  }
  if (careTargets.includes("skin")) {
    out.push("피부·털 개선을 위해 오메가-3와 비오틴이 풍부한 간식을 골랐어요.");
  }
  if (careTargets.includes("digestion")) {
    out.push("소화 건강을 위해 식이섬유·저지방 위주로 구성했어요.");
  }
  if (careTargets.includes("immune")) {
    out.push("면역 관리를 위해 항산화 성분이 담긴 간식을 포함했어요.");
  }
  return out;
}

function buildRiskFactors(
  profile: DogProfile,
  stage: LifeStage,
  avoid: { ids: Set<string>; labels: string[]; noteUncertain: boolean },
  candidateCount: number
): string[] {
  const out: string[] = [];

  if (avoid.labels.length) {
    out.push(`알레르기/기피 성분 ${avoid.labels.join(", ")} — 해당 원료는 전량 제외했어요.`);
  }
  if (avoid.noteUncertain) {
    out.push(
      "기타 메모에 사람이 직접 확인해야 할 내용이 있어요. 담당 큐레이터가 검토 후 반영해요."
    );
  }
  if (stage === "senior") {
    out.push("노령기 — 딱딱한 간식·고지방·고나트륨 간식은 피하는 게 좋아요.");
  }
  if (stage === "puppy") {
    out.push("성장기 — 기름진 간식과 큰 조각은 소화·질식 위험이 있어 주의해요.");
  }
  const weight = (profile.weight || "").toUpperCase();
  if (weight.startsWith("XL") || weight.startsWith("L")) {
    out.push("대형견은 관절 부담이 커 체중·관절 케어를 함께 챙기는 게 좋아요.");
  }
  if (candidateCount <= 4) {
    out.push("제외 조건이 많아 추천 폭이 좁아요. 신규 단백질 위주로 안전하게 구성했어요.");
  }
  if (!out.length) {
    out.push("특별한 위험 요소는 확인되지 않았어요. 급여 시 반응만 가볍게 지켜봐 주세요.");
  }
  return out;
}

function buildAvoidIngredients(
  profile: DogProfile,
  stage: LifeStage,
  avoidLabels: string[]
): string[] {
  const set = new Set<string>(avoidLabels);
  // 생애주기 공통 회피 성분
  set.add("과도한 나트륨·인공첨가물");
  if (stage === "senior") set.add("딱딱한 통뼈·고지방 부위");
  if (stage === "puppy") set.add("자일리톨·양파 등 성장기 유해 성분");
  return Array.from(set);
}

function buildConfidence(
  profile: DogProfile,
  m: {
    careCount: number;
    flavorCount: number;
    textureCount: number;
    candidateCount: number;
    noteUncertain: boolean;
  }
): number {
  let score = 55;
  if (profile.breed) score += 6;
  if (profile.weight) score += 6;
  if (profile.gender) score += 3;
  if (m.careCount > 0) score += Math.min(12, m.careCount * 6);
  if (m.flavorCount > 0) score += 6;
  if (m.textureCount > 0) score += 4;
  // 후보 풀이 넉넉할수록 신뢰도 상승
  if (m.candidateCount >= 10) score += 8;
  else if (m.candidateCount >= 6) score += 4;
  else score -= 6;
  // 사람 확인이 필요한 메모가 있으면 자동 추천만으로는 확신이 낮음
  if (m.noteUncertain) score -= 8;

  return Math.max(50, Math.min(98, score));
}

function buildVetConsult(
  profile: DogProfile,
  stage: LifeStage,
  avoid: { ids: Set<string>; labels: string[]; noteUncertain: boolean },
  candidateCount: number
): { vetConsult: boolean; vetConsultReason?: string } {
  if (avoid.noteUncertain) {
    return {
      vetConsult: true,
      vetConsultReason:
        "기타 메모에 판별이 필요한 반응이 있어요. 새 간식 급여 전 수의사와 한번 상의해 주세요.",
    };
  }
  if (candidateCount <= 3) {
    return {
      vetConsult: true,
      vetConsultReason:
        "제외 성분이 많아 안전한 선택지가 제한적이에요. 영양 균형은 수의사 상담을 권장해요.",
    };
  }
  if (stage === "senior" && profile.healthGoals.includes("관절 케어")) {
    return {
      vetConsult: true,
      vetConsultReason:
        "노령기 관절 케어는 간식만으로 부족할 수 있어요. 필요 시 수의사 처방 보조제를 함께 상의해 보세요.",
    };
  }
  return { vetConsult: false };
}
