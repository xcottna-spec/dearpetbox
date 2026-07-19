"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import StampBadge from "@/components/ui/StampBadge";
import { ALLERGENS } from "@/data/allergens";
import { BREEDS } from "@/data/breeds";
import { PLANS } from "@/data/pricing";
import { TRACK } from "@/lib/analytics";
import { curate, type Recommendation } from "@/lib/curator";
import { getMemberId, restoreProfileFromServer } from "@/lib/profile-sync";

type Step = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "CAT";
const INPUT_STEPS: Step[] = ["A", "B", "C", "D", "E"];

interface QuizState {
  step: Step;
  species: "dog" | "cat";
  name: string;
  breed: string;
  ageMonths: number;
  weight: string;
  gender: string;
  allergies: string[];
  allergyNote: string;
  noAllergy: boolean;
  textures: string[];
  flavors: string[];
  healthGoals: string[];
  plan: string;
}

const initialState: QuizState = {
  step: "A",
  species: "dog",
  name: "",
  breed: "",
  ageMonths: 24,
  weight: "",
  gender: "",
  allergies: [],
  allergyNote: "",
  noAllergy: false,
  textures: [],
  flavors: [],
  healthGoals: [],
  plan: "B",
};

type Action =
  | { type: "SET"; key: keyof QuizState; value: QuizState[keyof QuizState] }
  | { type: "TOGGLE"; key: "allergies" | "textures" | "flavors" | "healthGoals"; value: string }
  | { type: "GO"; step: Step }
  | { type: "HYDRATE"; state: Partial<QuizState> };

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case "SET":
      return { ...state, [action.key]: action.value };
    case "TOGGLE": {
      const list = state[action.key];
      const next = list.includes(action.value)
        ? list.filter((v) => v !== action.value)
        : [...list, action.value];
      return { ...state, [action.key]: next };
    }
    case "GO":
      return { ...state, step: action.step };
    case "HYDRATE":
      return { ...state, ...action.state };
    default:
      return state;
  }
}

const WEIGHTS = ["XS (~4kg)", "S (4~7kg)", "M (7~15kg)", "L (15~25kg)", "XL (25kg+)"];
const TEXTURES = ["바삭한 식감", "쫄깃한 식감", "부드러운 식감"];
const FLAVORS = ["육류 (닭·소·오리)", "생선 (연어·황태)", "채소·과일", "유제품"];
const GOALS = ["피부·털 건강", "소화 건강", "관절 케어", "면역력", "체중 관리", "특별히 없음"];

export default function QuizFlow() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [paying, setPaying] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [phone, setPhone] = useState("");
  const phoneOk = phone.replace(/[^0-9]/g, "").length >= 10;

  // 진단은 누구나(비회원 포함) 바로 시작 — 결과 확인 후 회원가입/구매로 유도
  const [member, setMember] = useState(false);
  useEffect(() => {
    try {
      setMember(Boolean(localStorage.getItem("dpAuth")));
    } catch {}
  }, []);

  // localStorage hydrate + persist (+ 로컬이 비면 계정 프로파일 서버 복원)
  useEffect(() => {
    let hasLocal = false;
    try {
      const raw = localStorage.getItem("dpQuiz");
      if (raw) {
        const parsed = JSON.parse(raw);
        hasLocal = Boolean(parsed?.name);
        dispatch({ type: "HYDRATE", state: parsed });
      }
      const dn = localStorage.getItem("dogName");
      if (dn) {
        hasLocal = true;
        dispatch({ type: "SET", key: "name", value: dn });
      }
    } catch {}
    setHydrated(true);
    TRACK.quizStart();
    // 새 기기·브라우저 변경·저장소 삭제: 회원이면 서버에서 히스토리 복원
    if (!hasLocal) {
      restoreProfileFromServer().then((p) => {
        if (p) dispatch({ type: "HYDRATE", state: p as Partial<QuizState> });
      });
    }
  }, []);

  useEffect(() => {
    // hydrate 완료 전에는 저장하지 않는다 (초기값이 저장분을 덮어쓰는 race 방지)
    if (!hydrated) return;
    try {
      localStorage.setItem("dpQuiz", JSON.stringify(state));
      if (state.name) localStorage.setItem("dogName", state.name);
    } catch {}
  }, [state, hydrated]);

  // 프로파일 완성(StepF 진입) 시 운영자에게 진단 데이터 전송 (1회)
  useEffect(() => {
    if (state.step !== "F" || !hydrated) return;
    try {
      const sentKey = "dpLeadSent:" + state.name;
      if (sessionStorage.getItem(sentKey)) return;
      sessionStorage.setItem(sentKey, "1");
      fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          breed: state.breed,
          ageMonths: state.ageMonths,
          weight: state.weight,
          gender: state.gender,
          allergies: state.allergies,
          allergyNote: state.allergyNote,
          noAllergy: state.noAllergy,
          textures: state.textures,
          flavors: state.flavors,
          healthGoals: state.healthGoals,
          plan: state.plan,
        }),
      }).catch(() => {});
    } catch {}
  }, [state, hydrated]);

  const stepIndex = INPUT_STEPS.indexOf(state.step);
  const name = state.name || "우리 아이";

  const set = (key: keyof QuizState, value: QuizState[keyof QuizState]) =>
    dispatch({ type: "SET", key, value });
  const go = (step: Step) => {
    dispatch({ type: "GO", step });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedPlan = PLANS.find((p) => p.id === state.plan);

  // 규칙 기반 큐레이션 — 프로파일이 준비되는 결과 단계에서만 계산
  const curation = useMemo(
    () =>
      curate({
        name: state.name,
        breed: state.breed,
        ageMonths: state.ageMonths,
        weight: state.weight,
        gender: state.gender,
        allergies: state.allergies,
        allergyNote: state.allergyNote,
        noAllergy: state.noAllergy,
        textures: state.textures,
        flavors: state.flavors,
        healthGoals: state.healthGoals,
        plan: state.plan,
      }),
    [state]
  );

  // 고양이 대기명단 — 박스 오픈 전 수요·프로파일 수집 (데이터 자산)
  const [catDone, setCatDone] = useState(false);
  const submitCatWaitlist = async () => {
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "cat_waitlist",
          species: "cat",
          name: state.name,
          breed: state.breed,
          ageMonths: state.ageMonths,
          note: state.allergyNote,
          phone,
        }),
      });
    } catch {}
    setCatDone(true);
  };

  // 결제·주문은 카페24 공식몰에서 진행 (주문 데이터 카페24 집계).
  // 이동 직전 진단 프로파일+연락처를 운영자에게 전송해 주문과 매칭할 수 있게 한다.
  const handleCheckout = async () => {
    if (!selectedPlan) return;
    setPaying(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "checkout",
          userId: getMemberId(),
          name: state.name,
          phone,
          plan: selectedPlan.id,
          planName: selectedPlan.name,
          breed: state.breed,
          allergies: state.allergies,
          allergyNote: state.allergyNote,
          textures: state.textures,
          flavors: state.flavors,
          healthGoals: state.healthGoals,
        }),
      });
    } catch {}
    window.location.href = selectedPlan.cafe24Url;
  };

  const logoHeader = (
    <div className="mb-8 flex justify-center">
      <Link href="/" aria-label="Dear Pet 홈으로">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-gold.png" alt="Dear Pet" className="h-14 w-auto" />
      </Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-parchment px-5 pb-24 pt-8">
      <div className="mx-auto max-w-xl">
        {logoHeader}

        {INPUT_STEPS.includes(state.step) && (
          <div className="mb-8">
            <ProgressBar
              currentStep={stepIndex + 1}
              totalStep={INPUT_STEPS.length}
              minutesLeft={Math.max(1, INPUT_STEPS.length - stepIndex)}
            />
          </div>
        )}

        {/* STEP A — 이름 */}
        {state.step === "A" && (
          <section>
            <h1 className="font-serif-kr text-2xl font-bold text-ink">
              우리 아이 맞춤 진단을 시작할게요
            </h1>
            <p className="mt-2 text-ink-light">어떤 아이인가요?</p>
            <div className="mt-4 flex gap-2">
              <Chip active={state.species === "dog"} onClick={() => set("species", "dog")}>
                🐶 강아지
              </Chip>
              <Chip active={state.species === "cat"} onClick={() => set("species", "cat")}>
                🐱 고양이
              </Chip>
            </div>
            <p className="mt-5 text-ink-light">아이의 이름을 알려주세요.</p>
            <input
              autoFocus
              value={state.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="예: 망고"
              className="mt-6 w-full rounded-lg border-2 border-borderk bg-cream px-4 py-3 text-lg outline-none focus:border-stamp"
            />
            <div className="mt-8">
              <Button
                onClick={() => go(state.species === "cat" ? "CAT" : "B")}
                withArrow
                disabled={!state.name.trim()}
              >
                {state.name.trim() ? `${name} 진단 시작하기` : "이름을 입력해주세요"}
              </Button>
            </div>
          </section>
        )}

        {/* STEP CAT — 고양이 대기명단 (박스 오픈 전 수요·프로파일 수집) */}
        {state.step === "CAT" && (
          <section>
            {!catDone ? (
              <>
                <StampBadge>Coming Soon</StampBadge>
                <h1 className="mt-4 font-serif-kr text-2xl font-bold text-ink">
                  고양이 박스, 준비하고 있어요
                </h1>
                <p className="mt-3 break-keep text-ink-light">
                  지금은 강아지 박스를 먼저 운영하고 있어요. {name}의 정보를
                  남겨주시면 고양이 박스가 열릴 때 가장 먼저 알려드릴게요.
                  가입 혜택 3,000P도 그대로 받으실 수 있어요.
                </p>
                <label className="mt-6 block text-sm font-semibold text-ink">묘종</label>
                <input
                  value={state.breed}
                  onChange={(e) => set("breed", e.target.value)}
                  placeholder="예: 코리안숏헤어"
                  className="mt-2 w-full rounded-lg border-2 border-borderk bg-cream px-4 py-3 outline-none focus:border-stamp"
                />
                <label className="mt-5 block text-sm font-semibold text-ink">
                  나이: {Math.floor(state.ageMonths / 12)}살 {state.ageMonths % 12}개월
                </label>
                <input
                  type="range"
                  min={0}
                  max={240}
                  value={state.ageMonths}
                  onChange={(e) => set("ageMonths", Number(e.target.value))}
                  className="mt-2 w-full accent-stamp"
                />
                <label className="mt-5 block text-sm font-semibold text-ink">
                  알레르기·특이사항 <span className="font-normal text-ink-light">(선택)</span>
                </label>
                <textarea
                  value={state.allergyNote}
                  onChange={(e) => set("allergyNote", e.target.value)}
                  rows={2}
                  placeholder="예: 닭고기 간식에 구토 / 습식만 먹어요"
                  className="mt-2 w-full resize-none rounded-lg border-2 border-borderk bg-cream px-4 py-3 text-sm outline-none focus:border-stamp"
                />
                <label className="mt-5 block text-sm font-semibold text-ink">
                  휴대폰 번호 <span className="text-gold">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000 (오픈 알림용)"
                  className="mt-2 w-full rounded-lg border-2 border-borderk bg-cream px-4 py-3 outline-none focus:border-stamp"
                />
                <div className="mt-8">
                  <Button fullWidth withArrow disabled={!phoneOk} onClick={submitCatWaitlist}>
                    오픈 알림 신청하기
                  </Button>
                </div>
                <button
                  onClick={() => {
                    set("species", "dog");
                    go("A");
                  }}
                  className="mt-4 w-full text-sm text-ink-light underline"
                >
                  ← 강아지 진단으로 돌아가기
                </button>
              </>
            ) : (
              <div className="text-center">
                <StampBadge>신청 완료</StampBadge>
                <h1 className="mt-4 font-serif-kr text-2xl font-bold text-ink">
                  {name}, 가장 먼저 만나요
                </h1>
                <p className="mt-3 break-keep text-ink-light">
                  고양이 박스가 열리면 남겨주신 번호로 가장 먼저 알려드릴게요.
                </p>
                <div className="mt-7">
                  <Button href="/" withArrow>
                    디어펫 둘러보기
                  </Button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* STEP B — 기본 정보 */}
        {state.step === "B" && (
          <section>
            <h1 className="font-serif-kr text-2xl font-bold text-ink">
              {name}의 기본 정보를 알려주세요
            </h1>

            <label className="mt-6 block text-sm font-semibold text-ink">견종</label>
            <input
              list="breed-list"
              value={state.breed}
              onChange={(e) => set("breed", e.target.value)}
              placeholder="견종 검색"
              className="mt-2 w-full rounded-lg border-2 border-borderk bg-cream px-4 py-3 outline-none focus:border-stamp"
            />
            <datalist id="breed-list">
              {BREEDS.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>

            <label className="mt-6 block text-sm font-semibold text-ink">
              나이: {Math.floor(state.ageMonths / 12)}살 {state.ageMonths % 12}개월
            </label>
            <input
              type="range"
              min={0}
              max={180}
              value={state.ageMonths}
              onChange={(e) => set("ageMonths", Number(e.target.value))}
              className="mt-2 w-full accent-stamp"
            />

            <label className="mt-6 block text-sm font-semibold text-ink">체중</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {WEIGHTS.map((w) => (
                <Chip key={w} active={state.weight === w} onClick={() => set("weight", w)}>
                  {w}
                </Chip>
              ))}
            </div>

            <label className="mt-6 block text-sm font-semibold text-ink">성별</label>
            <div className="mt-2 flex gap-2">
              {["남아", "여아"].map((g) => (
                <Chip key={g} active={state.gender === g} onClick={() => set("gender", g)}>
                  {g}
                </Chip>
              ))}
            </div>

            <Nav onBack={() => go("A")} onNext={() => go("C")} nextOk={!!state.breed && !!state.weight} />
          </section>
        )}

        {/* STEP C — 알레르기 */}
        {state.step === "C" && (
          <section>
            <h1 className="font-serif-kr text-2xl font-bold text-ink">
              {name}이(가) 피해야 할 성분이 있나요?
            </h1>
            <p className="mt-2 text-ink-light">
              선택하신 성분은 박스에 <b className="text-stamp">절대 포함되지 않습니다.</b>
            </p>
            <div className="mt-6 grid grid-cols-4 gap-2">
              {ALLERGENS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    dispatch({ type: "TOGGLE", key: "allergies", value: a.id });
                    if (state.noAllergy) set("noAllergy", false);
                  }}
                  className={`flex flex-col items-center gap-1 rounded-lg border-2 p-3 text-sm transition-colors ${
                    state.allergies.includes(a.id)
                      ? "border-stamp bg-stamp/10 font-semibold"
                      : "border-borderk bg-cream"
                  }`}
                >
                  <span className="text-xl">{a.icon}</span>
                  {a.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                set("noAllergy", !state.noAllergy);
                set("allergies", []);
              }}
              className={`mt-4 w-full rounded-lg border-2 p-3 text-sm ${
                state.noAllergy ? "border-leaf bg-leaf/10 font-semibold" : "border-borderk bg-cream"
              }`}
            >
              지금까지 이상 반응 없었어요
            </button>

            {/* 기타 — 목록에 없는 반응은 비고로 수집 */}
            <label className="mt-6 block text-sm font-semibold text-ink">
              기타 메모 <span className="font-normal text-ink-light">(선택)</span>
            </label>
            <textarea
              value={state.allergyNote}
              onChange={(e) => set("allergyNote", e.target.value)}
              rows={2}
              placeholder="예: 밀가루 든 간식에 두드러기가 났어요 / 특정 브랜드 제품 구토"
              className="mt-2 w-full resize-none rounded-lg border-2 border-borderk bg-cream px-4 py-3 text-sm outline-none focus:border-stamp"
            />
            <p className="mt-1 text-xs text-ink-light">
              적어주신 내용은 담당자가 직접 확인해 구성에 반영해요.
            </p>

            <Nav
              onBack={() => go("B")}
              onNext={() => go("D")}
              nextOk={state.noAllergy || state.allergies.length > 0 || state.allergyNote.trim().length > 0}
            />
          </section>
        )}

        {/* STEP D — 취향 */}
        {state.step === "D" && (
          <section>
            <h1 className="font-serif-kr text-2xl font-bold text-ink">
              {name}은(는) 어떤 걸 좋아하나요?
            </h1>
            <label className="mt-6 block text-sm font-semibold text-ink">식감</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {TEXTURES.map((t) => (
                <Chip key={t} active={state.textures.includes(t)} onClick={() => dispatch({ type: "TOGGLE", key: "textures", value: t })}>
                  {t}
                </Chip>
              ))}
            </div>
            <label className="mt-6 block text-sm font-semibold text-ink">선호 맛</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {FLAVORS.map((f) => (
                <Chip key={f} active={state.flavors.includes(f)} onClick={() => dispatch({ type: "TOGGLE", key: "flavors", value: f })}>
                  {f}
                </Chip>
              ))}
            </div>
            {state.textures.length + state.flavors.length >= 2 && (
              <p className="mt-5 rounded-lg bg-leaf/10 p-3 text-sm text-leaf">
                좋아요! {name}에게 딱 맞는 조합이 있어요 🐾
              </p>
            )}
            <Nav onBack={() => go("C")} onNext={() => go("E")} nextOk />
          </section>
        )}

        {/* STEP E — 건강 목표 */}
        {state.step === "E" && (
          <section>
            <h1 className="font-serif-kr text-2xl font-bold text-ink">
              마지막 단계예요! 건강 고민이 있나요?
            </h1>
            <div className="mt-6 flex flex-wrap gap-2">
              {GOALS.map((g) => (
                <Chip key={g} active={state.healthGoals.includes(g)} onClick={() => dispatch({ type: "TOGGLE", key: "healthGoals", value: g })}>
                  {g}
                </Chip>
              ))}
            </div>
            <Nav
              onBack={() => go("D")}
              onNext={() => {
                TRACK.planSelect("quiz_result");
                go("F");
              }}
              nextLabel={`${name}의 프로파일 완성하기`}
              nextOk={state.healthGoals.length > 0}
            />
          </section>
        )}

        {/* STEP F — 결과 카드 */}
        {state.step === "F" && (
          <section className="text-center">
            <StampBadge>맞춤 프로파일 완성</StampBadge>
            <h1 className="mt-4 font-serif-kr text-2xl font-bold text-ink">
              {name}의 맞춤 프로파일이 완성되었어요
            </h1>
            <div className="mt-6 rounded-lg border-2 border-borderk bg-cream p-6 text-left shadow-kraft-sm">
              <ResultRow label="제외 성분">
                {state.noAllergy || state.allergies.length === 0
                  ? "없음"
                  : state.allergies
                      .map((id) => ALLERGENS.find((a) => a.id === id)?.label)
                      .filter(Boolean)
                      .map((l) => (
                        <span key={l} className="mr-2 text-stamp">
                          ✕ {l}
                        </span>
                      ))}
              </ResultRow>
              {state.allergyNote.trim() && (
                <ResultRow label="기타 메모(비고)">{state.allergyNote}</ResultRow>
              )}
              <ResultRow label="추천 식감·맛">
                {[...state.textures, ...state.flavors].join(", ") || "인기 조합 자동 구성"}
              </ResultRow>
              <ResultRow label="건강 케어">{state.healthGoals.join(", ") || "종합 케어"}</ResultRow>
              <ResultRow label="기본 정보">
                {state.breed || "믹스견"} · {Math.floor(state.ageMonths / 12)}살 · {state.weight || "체중 미입력"}
              </ResultRow>
            </div>

            {/* AI 큐레이션 리포트 */}
            <CurationReport name={name} curation={curation} />

            <div className="mt-5 flex items-center justify-center gap-5 text-sm">
              <button
                onClick={() => go("B")}
                className="text-ink-light underline underline-offset-4 hover:text-ink"
              >
                프로파일 수정하기
              </button>
              <span className="text-borderk">|</span>
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem("dpQuiz");
                  } catch {}
                  window.location.reload();
                }}
                className="text-ink-light underline underline-offset-4 hover:text-ink"
              >
                처음부터 다시
              </button>
            </div>
            <div className="mt-6">
              <Button onClick={() => go("G")} withArrow>
                {name} 첫 박스 받아보기
              </Button>
            </div>

            {/* 비회원 → 프로파일 저장(가입) 유도: 무료 진단 퍼널의 전환 고리 */}
            {!member && (
              <div className="mt-5 border border-gold/50 bg-cream p-4 text-left">
                <p className="text-sm font-semibold text-ink">
                  {name} 프로파일, 저장해 둘까요?
                </p>
                <p className="mt-1 break-keep text-xs leading-relaxed text-ink-light">
                  회원가입하면 프로파일이 계정에 저장되고 마이페이지에서 언제든
                  수정할 수 있어요. 지금 가입하면 3,000P를 드려요.
                </p>
                <Link
                  href="/signup"
                  className="mt-3 block w-full border border-borderk bg-kraft-light py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:border-gold"
                >
                  가입하고 프로파일 저장하기 (+3,000P)
                </Link>
              </div>
            )}
          </section>
        )}

        {/* STEP G — 플랜 선택 */}
        {state.step === "G" && (
          <section>
            <h1 className="font-serif-kr text-2xl font-bold text-ink">
              우리 아이에게 어떤 박스가 좋을까요?
            </h1>
            <div className="mt-6 space-y-4">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => set("plan", p.id)}
                  className={`flex w-full overflow-hidden border-2 text-left transition-colors ${
                    state.plan === p.id
                      ? "border-gold bg-cream shadow-kraft"
                      : "border-borderk bg-cream"
                  }`}
                >
                  {/* 플랜 무드 사진 */}
                  <div
                    className="w-28 shrink-0 bg-cover sm:w-36"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/${p.image.id}?w=600&q=85&auto=format&fit=crop')`,
                      backgroundPosition: p.image.pos,
                    }}
                    role="img"
                    aria-label={p.image.alt}
                  />
                  <div className="flex flex-1 items-center justify-between gap-3 p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-brand text-xl font-bold text-gold">{p.grade}</span>
                        <span className="font-bold text-ink">{p.name}</span>
                        {p.badge && (
                          <span className="bg-ink px-2 py-0.5 text-[10px] font-bold tracking-widest text-cream">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-ink-light">{p.tagline}</div>
                      <div className="mt-1 text-xs text-ink-light">
                        {p.features.join(" · ")}
                      </div>
                    </div>
                    <div className="shrink-0 font-serif-kr text-lg font-bold">
                      {p.price.toLocaleString()}
                      <span className="text-xs font-normal">원/월</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <Nav onBack={() => go("F")} onNext={() => go("H")} nextLabel="결제 단계로" nextOk />
          </section>
        )}

        {/* STEP H — 결제 */}
        {state.step === "H" && (
          <section>
            <h1 className="font-serif-kr text-2xl font-bold text-ink">주문 확인</h1>
            <div className="mt-6 overflow-hidden border border-border bg-cream shadow-kraft-sm">
              {selectedPlan && (
                <div
                  className="relative h-36 bg-cover"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/${selectedPlan.image.id}?w=1200&q=85&auto=format&fit=crop')`,
                    backgroundPosition: selectedPlan.image.pos,
                  }}
                  role="img"
                  aria-label={selectedPlan.image.alt}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-cream">
                    <span className="font-brand text-lg font-bold text-gold-light">
                      {selectedPlan.grade}
                    </span>{" "}
                    <span className="font-serif-kr font-bold">{selectedPlan.name}</span>
                  </div>
                </div>
              )}
              <div className="p-6">
                <SummaryRow label="반려견">{name}</SummaryRow>
                <SummaryRow label="박스">{selectedPlan?.name}</SummaryRow>
                <SummaryRow label="구성">{selectedPlan?.features.join(" · ")}</SummaryRow>
                <SummaryRow label="결제 금액">
                  {selectedPlan?.price.toLocaleString()}원 / 월
                </SummaryRow>
              </div>
            </div>
            <div className="mt-6">
              <label className="mb-1 block text-sm font-semibold text-ink">
                휴대폰 번호 <span className="text-gold">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000 (배송·카톡 안내용)"
                className="w-full rounded-lg border-2 border-borderk bg-cream px-4 py-3 outline-none focus:border-stamp"
              />
              <p className="mt-1 text-xs text-ink-light">
                배송 전 카카오톡 안내와 배송 연락에 사용돼요.
              </p>
            </div>

            <p className="mt-4 rounded-lg bg-kraft-light p-3 text-center text-sm text-ink-light">
              첫 박스 안심 케어 — 안 맞은 간식은 포인트로 돌려드려요
            </p>
            <div className="mt-6">
              <Button
                fullWidth
                withArrow
                isLoading={paying}
                disabled={paying || !phoneOk}
                onClick={handleCheckout}
              >
                디어펫 공식몰에서 결제하기
              </Button>
              <p className="mt-3 text-center text-xs text-ink-light">
                안전한 카페24 결제 · 카카오페이 · 네이버페이 · 카드
              </p>
            </div>
            <button onClick={() => go("G")} className="mt-4 w-full text-sm text-ink-light underline">
              이전으로
            </button>
          </section>
        )}
      </div>
    </main>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-2 px-4 py-2 text-sm transition-colors ${
        active ? "border-stamp bg-stamp/10 font-semibold" : "border-borderk bg-cream"
      }`}
    >
      {children}
    </button>
  );
}

function Nav({
  onBack,
  onNext,
  nextOk = false,
  nextLabel = "다음",
}: {
  onBack: () => void;
  onNext: () => void;
  nextOk?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="mt-10 flex items-center justify-between gap-3">
      <button onClick={onBack} className="text-sm text-ink-light underline">
        이전
      </button>
      <Button onClick={onNext} withArrow disabled={!nextOk}>
        {nextLabel}
      </Button>
    </div>
  );
}

function CurationReport({
  name,
  curation,
}: {
  name: string;
  curation: ReturnType<typeof curate>;
}) {
  return (
    <div className="mt-8 text-left">
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="h-px w-8 bg-gold/50" />
        <span className="font-brand text-xs font-bold uppercase tracking-[0.24em] text-gold">
          AI Nutrition Report
        </span>
        <span className="h-px w-8 bg-gold/50" />
      </div>

      {/* 건강 상태 분석 */}
      <ReportBlock title="건강 상태 분석" tag={curation.lifeStageLabel}>
        <ul className="space-y-1.5">
          {curation.healthAnalysis.map((line, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink">
              <span className="text-gold">•</span>
              <span className="break-keep">{line}</span>
            </li>
          ))}
        </ul>
      </ReportBlock>

      {/* 위험 요소 분석 */}
      <ReportBlock title="위험 요소 분석">
        <ul className="space-y-1.5">
          {curation.riskFactors.map((line, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink">
              <span className="text-stamp">⚠</span>
              <span className="break-keep">{line}</span>
            </li>
          ))}
        </ul>
      </ReportBlock>

      {/* 추천 간식 TOP5 */}
      <ReportBlock title={`${name} 추천 간식 TOP 5`}>
        <ol className="space-y-3">
          {curation.top5.map((rec, i) => (
            <TreatCard key={rec.treat.id} rank={i + 1} rec={rec} />
          ))}
        </ol>
      </ReportBlock>

      {/* 피해야 할 성분 */}
      <ReportBlock title="피해야 할 성분">
        <div className="flex flex-wrap gap-2">
          {curation.avoidIngredients.map((ing) => (
            <span
              key={ing}
              className="rounded-full border border-stamp/40 bg-stamp/5 px-3 py-1 text-xs font-medium text-stamp"
            >
              ✕ {ing}
            </span>
          ))}
        </div>
      </ReportBlock>

      {/* 대체 상품 제안 */}
      {curation.alternatives.length > 0 && (
        <ReportBlock title="대체 상품 제안">
          <div className="flex flex-wrap gap-2">
            {curation.alternatives.map((rec) => (
              <span
                key={rec.treat.id}
                className="rounded-full border border-borderk bg-cream px-3 py-1 text-xs text-ink"
              >
                {rec.treat.name}{" "}
                <span className="text-ink-light">{rec.score}%</span>
              </span>
            ))}
          </div>
        </ReportBlock>
      )}

      {/* 추천 신뢰도 */}
      <ReportBlock title="추천 신뢰도">
        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-kraft-light">
            <div
              className="h-full rounded-full bg-gold transition-all"
              style={{ width: `${curation.confidence}%` }}
            />
          </div>
          <span className="font-serif-kr text-lg font-bold text-ink">
            {curation.confidence}
            <span className="text-xs font-normal text-ink-light">/100</span>
          </span>
        </div>
        <p className="mt-2 text-xs text-ink-light break-keep">
          프로파일 정보가 자세할수록 신뢰도가 높아져요. 배송 후 피드백으로 다음 추천이 더 정확해져요.
        </p>
      </ReportBlock>

      {/* 수의사 상담 권장 */}
      {curation.vetConsult && (
        <div className="mt-4 rounded-lg border border-gold/40 bg-gold/5 p-4">
          <p className="text-sm font-semibold text-ink">🩺 수의사 상담을 권장해요</p>
          <p className="mt-1 text-sm text-ink-light break-keep">
            {curation.vetConsultReason}
          </p>
        </div>
      )}
    </div>
  );
}

function ReportBlock({
  title,
  tag,
  children,
}: {
  title: string;
  tag?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 rounded-lg border-2 border-borderk bg-cream p-5 shadow-kraft-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif-kr text-base font-bold text-ink">{title}</h3>
        {tag && (
          <span className="rounded-full bg-ink px-2.5 py-0.5 text-[11px] font-bold text-cream">
            {tag}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function TreatCard({ rank, rec }: { rank: number; rec: Recommendation }) {
  return (
    <li className="flex gap-3 rounded-lg border border-borderk bg-parchment/40 p-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold font-brand text-sm font-bold text-cream">
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-ink break-keep">{rec.treat.name}</span>
          <span className="shrink-0 text-xs font-bold text-gold">매칭 {rec.score}%</span>
        </div>
        <p className="mt-0.5 text-xs text-ink-light break-keep">{rec.treat.desc}</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {rec.reasons.map((r, i) => (
            <span
              key={i}
              className="rounded-full bg-leaf/10 px-2 py-0.5 text-[11px] text-leaf break-keep"
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

function ResultRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-borderk py-3 last:border-0">
      <div className="text-xs font-semibold uppercase tracking-wide text-ink-light">{label}</div>
      <div className="mt-1 text-ink">{children}</div>
    </div>
  );
}

function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-borderk py-3 last:border-0">
      <span className="text-ink-light">{label}</span>
      <span className="font-semibold text-ink">{children}</span>
    </div>
  );
}
