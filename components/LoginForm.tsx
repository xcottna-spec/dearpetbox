"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// 임시 로그인 게이트 — 회원 시스템(카페24 연동/Supabase) 전까지
// 입력값 검증 후 브라우저에 로그인 상태(dpAuth)를 기록한다.
export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const submit = () => {
    if (id.trim().length < 4) {
      setErr("아이디를 4자 이상 입력해 주세요.");
      return;
    }
    if (pw.length < 8) {
      setErr("비밀번호는 8자 이상이에요.");
      return;
    }
    try {
      localStorage.setItem("dpAuth", id.trim());
    } catch {}
    router.push(next);
  };

  return (
    <div className="space-y-3 text-left">
      <input
        value={id}
        onChange={(e) => {
          setId(e.target.value);
          setErr("");
        }}
        placeholder="아이디"
        className="w-full border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
      />
      <input
        type="password"
        value={pw}
        onChange={(e) => {
          setPw(e.target.value);
          setErr("");
        }}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="비밀번호"
        className="w-full border border-border bg-cream px-4 py-3 outline-none focus:border-gold"
      />
      {err && <p className="text-xs text-red-700">{err}</p>}
      <button
        onClick={submit}
        className="w-full bg-ink py-3.5 font-semibold text-cream transition-transform hover:-translate-y-0.5"
      >
        로그인
      </button>

      <div className="pt-3 text-center text-sm text-ink-light">
        <Link href={`/signup`} className="font-semibold text-gold hover:underline">
          회원가입 · 첫 박스 할인
        </Link>
        <span className="mx-3 text-border">|</span>
        <a
          href="https://dearpetbox.co.kr/member/login.html"
          className="hover:text-ink"
        >
          공식몰 회원 로그인
        </a>
      </div>
    </div>
  );
}
