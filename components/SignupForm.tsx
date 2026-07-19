"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// 약관(1단계) → 정보 입력(2단계) → 필수값 검증 후 가입
const TERMS = [
  {
    id: "tos",
    required: true,
    title: "이용약관 동의",
    summary: "구독 신청·배송·포인트·해지 등 서비스 이용 기본 규칙입니다. 법정 청약철회(미개봉 7일)가 보장됩니다.",
    href: "/terms",
  },
  {
    id: "privacy",
    required: true,
    title: "개인정보 수집·이용 동의",
    summary: "수집: 아이디·휴대폰·배송지·반려견 정보 / 목적: 주문·배송·맞춤 구성 / 보유: 회원 탈퇴 시까지.",
    href: "/privacy",
  },
  {
    id: "subscription",
    required: true,
    title: "정기결제 안내 동의",
    summary: "매월 선택한 박스 금액이 자동 결제됩니다. 다음 배송 3일 전까지 언제든 해지할 수 있습니다.",
    href: "/terms",
  },
  {
    id: "marketing",
    required: false,
    title: "혜택·소식 알림 수신",
    summary: "신제품·포인트 이벤트를 카카오톡/문자로 알려드려요. 언제든 철회 가능합니다.",
  },
];

interface Fields {
  userId: string;
  pw: string;
  pw2: string;
  ownerName: string;
  phone: string;
  dogName: string;
}

export default function SignupForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [agreed, setAgreed] = useState<string[]>([]);
  const [f, setF] = useState<Fields>({
    userId: "",
    pw: "",
    pw2: "",
    ownerName: "",
    phone: "",
    dogName: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [done, setDone] = useState(false);

  // 진단을 먼저 한 게스트의 아이 이름을 그대로 이어받는다 (이중 입력·불일치 방지)
  useEffect(() => {
    try {
      const dn = localStorage.getItem("dogName");
      if (dn) setF((p) => (p.dogName ? p : { ...p, dogName: dn }));
    } catch {}
  }, []);

  const requiredOk = TERMS.filter((t) => t.required).every((t) =>
    agreed.includes(t.id)
  );
  const allIds = TERMS.map((t) => t.id);
  const toggle = (id: string) =>
    setAgreed((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const set = (k: keyof Fields, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  // 필수값 검증 규칙
  const validate = (): boolean => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (!/^[a-zA-Z0-9]{4,16}$/.test(f.userId))
      e.userId = "영문·숫자 4~16자로 입력해 주세요.";
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(f.pw))
      e.pw = "영문+숫자 조합 8자 이상이어야 해요.";
    if (f.pw2 !== f.pw) e.pw2 = "비밀번호가 서로 달라요.";
    if (!f.ownerName.trim()) e.ownerName = "이름을 입력해 주세요.";
    if (f.phone.replace(/[^0-9]/g, "").length < 10)
      e.phone = "휴대폰 번호를 정확히 입력해 주세요.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const inputCls = (err?: string) =>
    `w-full border bg-cream px-4 py-3 outline-none focus:border-gold ${
      err ? "border-red-700" : "border-border"
    }`;

  if (done) {
    return (
      <div className="border border-gold/60 bg-cream p-8 text-center">
        <div className="text-3xl">🐾</div>
        <h2 className="mt-3 font-serif-kr text-xl font-bold text-ink">
          가입 준비가 완료됐어요
        </h2>
        <p className="mt-2 text-sm text-ink-light">
          실제 계정 저장은 회원 시스템(Supabase) 연동 후 열립니다.
          <br />
          지금 바로 맞춤 진단은 가능해요.
        </p>
        <Link
          href="/quiz"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-ink px-6 py-3 font-semibold text-cream"
        >
          맞춤 진단 시작하기 →
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* 단계 표시 */}
      <div className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold tracking-widest">
        <span className={step === 1 ? "text-gold" : "text-ink-light"}>1 약관</span>
        <span className="h-px w-6 bg-border" />
        <span className={step === 2 ? "text-gold" : "text-ink-light"}>2 정보 입력</span>
      </div>

      {step === 1 && (
        <div className="space-y-3 text-left">
          {/* 전체 동의 */}
          <label className="flex cursor-pointer items-center gap-3 border border-gold/60 bg-cream p-4 font-bold text-ink">
            <input
              type="checkbox"
              checked={agreed.length === allIds.length}
              onChange={() =>
                setAgreed(agreed.length === allIds.length ? [] : allIds)
              }
              className="h-4 w-4 accent-gold"
            />
            전체 동의
          </label>

          {TERMS.map((t) => (
            <label
              key={t.id}
              className="flex cursor-pointer items-start gap-3 border border-border bg-cream p-4"
            >
              <input
                type="checkbox"
                checked={agreed.includes(t.id)}
                onChange={() => toggle(t.id)}
                className="mt-0.5 h-4 w-4 accent-gold"
              />
              <span>
                <span className="text-sm font-semibold text-ink">
                  {t.title}{" "}
                  <span className={t.required ? "text-gold" : "text-ink-light"}>
                    ({t.required ? "필수" : "선택"})
                  </span>
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-ink-light">
                  {t.summary}
                </span>
                {"href" in t && t.href && (
                  <Link
                    href={t.href}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 inline-block text-xs font-semibold text-gold underline underline-offset-2"
                  >
                    전문 보기
                  </Link>
                )}
              </span>
            </label>
          ))}

          <button
            disabled={!requiredOk}
            onClick={() => setStep(2)}
            className="mt-2 w-full bg-ink py-3.5 font-semibold text-cream transition-opacity disabled:opacity-40"
          >
            {requiredOk ? "다음 — 정보 입력" : "필수 약관에 동의해 주세요"}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 text-left">
          {(
            [
              ["userId", "아이디", "영문·숫자 4~16자", "text"],
              ["pw", "비밀번호", "영문+숫자 8자 이상", "password"],
              ["pw2", "비밀번호 확인", "한 번 더 입력", "password"],
              ["ownerName", "이름", "보호자 성함", "text"],
              ["phone", "휴대폰 번호", "010-0000-0000 (배송·카톡 안내)", "tel"],
            ] as const
          ).map(([key, label, ph, type]) => (
            <div key={key}>
              <label className="mb-1 block text-sm font-semibold text-ink">
                {label} <span className="text-gold">*</span>
              </label>
              <input
                type={type}
                value={f[key]}
                onChange={(e) => set(key, e.target.value)}
                placeholder={ph}
                className={inputCls(errors[key])}
              />
              {errors[key] && (
                <p className="mt-1 text-xs text-red-700">{errors[key]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="mb-1 block text-sm font-semibold text-ink">
              반려견 이름 <span className="font-normal text-ink-light">(선택)</span>
            </label>
            <input
              value={f.dogName}
              onChange={(e) => set("dogName", e.target.value)}
              placeholder="예: 망고"
              className={inputCls()}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setStep(1)}
              className="w-28 border border-border py-3 text-sm text-ink-light"
            >
              이전
            </button>
            <button
              onClick={() => {
                if (!validate()) return;
                try {
                  // 가입 즉시 로그인 상태 부여
                  localStorage.setItem("dpAuth", f.userId.trim());
                  if (f.dogName.trim()) localStorage.setItem("dogName", f.dogName.trim());
                  // 프로파일을 계정(userId)·휴대폰과 함께 서버에 저장 —
                  // 브라우저가 바뀌어도 히스토리가 초기화되지 않는 근거 데이터
                  const quiz = JSON.parse(localStorage.getItem("dpQuiz") || "{}");
                  fetch("/api/lead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      ...quiz,
                      step: undefined,
                      event: "signup",
                      userId: f.userId.trim(),
                      ownerName: f.ownerName.trim(),
                      phone: f.phone.trim(),
                      name: f.dogName.trim() || quiz.name,
                      marketingOptIn: agreed.includes("marketing"),
                    }),
                  }).catch(() => {});
                } catch {}
                setDone(true);
              }}
              className="flex-1 bg-ink py-3.5 font-semibold text-cream"
            >
              가입하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
