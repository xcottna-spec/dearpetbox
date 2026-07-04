"use client";

import { useEffect, useReducer, useState } from "react";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import StampBadge from "@/components/ui/StampBadge";
import { ALLERGENS } from "@/data/allergens";
import { BREEDS } from "@/data/breeds";
import { PLANS } from "@/data/pricing";
import { TRACK } from "@/lib/analytics";
import { requestSubscriptionPayment } from "@/lib/portone";

type Step = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
const INPUT_STEPS: Step[] = ["A", "B", "C", "D", "E"];

interface QuizState {
  step: Step;
  name: string;
  breed: string;
  ageMonths: number;
  weight: string;
  gender: string;
  allergies: string[];
  noAllergy: boolean;
  textures: string[];
  flavors: string[];
  healthGoals: string[];
  plan: string;
}

const initialState: QuizState = {
  step: "A",
  name: "",
  breed: "",
  ageMonths: 24,
  weight: "",
  gender: "",
  allergies: [],
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
  const [payMsg, setPayMsg] = useState("");
  const [paying, setPaying] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // localStorage hydrate + persist
  useEffect(() => {
    try {
      const raw = localStorage.getItem("dpQuiz");
      if (raw) dispatch({ type: "HYDRATE", state: JSON.parse(raw) });
      const dn = localStorage.getItem("dogName");
      if (dn) dispatch({ type: "SET", key: "name", value: dn });
    } catch {}
    setHydrated(true);
    TRACK.quizStart();
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
  const handlePay = async () => {
    if (!selectedPlan) return;
    setPaying(true);
    setPayMsg("");
    const res = await requestSubscriptionPayment({
      orderName: `디어펫 박스 · ${name} · ${selectedPlan.grade}등급 ${selectedPlan.name}`,
      totalAmount: selectedPlan.price,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
    });
    setPaying(false);
    if (res.ok) {
      setPayMsg("결제가 완료되었어요! 🐾 첫 박스를 준비할게요.");
    } else if (res.reason === "not_configured") {
      setPayMsg(
        "결제창을 열려면 PortOne 상점 ID(store-...)가 필요해요. 채널 키는 등록됐고, 진단 데이터는 저장됐어요."
      );
    } else {
      setPayMsg(`결제가 취소되었거나 실패했어요: ${res.reason}`);
    }
  };

  return (
    <main className="texture-kraft min-h-screen bg-parchment px-5 pb-24 pt-24">
      <div className="mx-auto max-w-xl">
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
            <p className="mt-2 text-ink-light">아이의 이름을 알려주세요.</p>
            <input
              autoFocus
              value={state.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="예: 망고"
              className="mt-6 w-full rounded-lg border-2 border-borderk bg-cream px-4 py-3 text-lg outline-none focus:border-stamp"
            />
            <div className="mt-8">
              <Button onClick={() => go("B")} withArrow disabled={!state.name.trim()}>
                {state.name.trim() ? `${name} 진단 시작하기` : "이름을 입력해주세요"}
              </Button>
            </div>
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
            <div className="mt-6 grid grid-cols-3 gap-2">
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
            <Nav onBack={() => go("B")} onNext={() => go("D")} nextOk={state.noAllergy || state.allergies.length > 0} />
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
              <ResultRow label="추천 식감·맛">
                {[...state.textures, ...state.flavors].join(", ") || "인기 조합 자동 구성"}
              </ResultRow>
              <ResultRow label="건강 케어">{state.healthGoals.join(", ") || "종합 케어"}</ResultRow>
              <ResultRow label="기본 정보">
                {state.breed || "믹스견"} · {Math.floor(state.ageMonths / 12)}살 · {state.weight || "체중 미입력"}
              </ResultRow>
            </div>
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
          </section>
        )}

        {/* STEP G — 플랜 선택 */}
        {state.step === "G" && (
          <section>
            <h1 className="font-serif-kr text-2xl font-bold text-ink">
              {name}의 첫 박스, 어떤 주기로 받을까요?
            </h1>
            <div className="mt-6 space-y-3">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => set("plan", p.id)}
                  className={`flex w-full items-center justify-between rounded-lg border-2 p-4 text-left ${
                    state.plan === p.id ? "border-stamp bg-stamp/5 shadow-kraft-sm" : "border-borderk bg-cream"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-brand text-2xl font-bold text-gold">{p.grade}</span>
                    <div>
                      <div className="font-bold text-ink">
                        {p.name} {p.badge && <span className="ml-1 text-xs text-gold">· {p.badge}</span>}
                      </div>
                      <div className="text-sm text-ink-light">{p.tagline}</div>
                    </div>
                  </div>
                  <div className="font-serif-kr text-lg font-bold">
                    {p.price.toLocaleString()}원<span className="text-xs font-normal">/월</span>
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
            <div className="mt-6 rounded-lg border-2 border-borderk bg-cream p-6 shadow-kraft-sm">
              <SummaryRow label="반려견">{name}</SummaryRow>
              <SummaryRow label="플랜">
                {selectedPlan?.grade}등급 · {selectedPlan?.name}
              </SummaryRow>
              <SummaryRow label="결제 금액">
                {selectedPlan?.price.toLocaleString()}원 / 월
              </SummaryRow>
            </div>
            <div className="mt-6 space-y-3">
              <div>
                <label className="mb-1 block text-sm font-semibold text-ink">
                  이메일 <span className="text-stamp">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="주문 확인·영수증을 받을 이메일"
                  className="w-full rounded-lg border-2 border-borderk bg-cream px-4 py-3 outline-none focus:border-stamp"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-ink">
                  휴대폰 번호
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  className="w-full rounded-lg border-2 border-borderk bg-cream px-4 py-3 outline-none focus:border-stamp"
                />
              </div>
            </div>

            <p className="mt-4 rounded-lg bg-kraft-light p-3 text-center text-sm text-ink-light">
              첫 박스 안심 케어 — 안 맞은 간식은 포인트로 돌려드려요
            </p>
            <div className="mt-6">
              <Button
                fullWidth
                withArrow
                isLoading={paying}
                disabled={paying || !email.trim()}
                onClick={handlePay}
              >
                결제하고 첫 박스 받기
              </Button>
              <p className="mt-3 text-center text-xs text-ink-light">
                카카오페이 · 네이버페이 · 토스페이 · 카드
              </p>
              {payMsg && (
                <p className="mt-4 rounded-lg bg-kraft-light p-3 text-center text-sm text-ink">
                  {payMsg}
                </p>
              )}
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
