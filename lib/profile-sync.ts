// 프로파일 동기화 — "회원 히스토리는 어떤 경우에도 초기화되지 않는다"의 단일 구현.
//
// 저장(쓰기): 진단 완성(STEP F)·회원가입·결제 시 /api/lead 로 서버(Supabase+시트)에 적재.
// 복원(읽기): 로컬(dpQuiz)이 비어 있는데 로그인 상태(dpAuth)면 서버에서 최신 프로파일을
//            내려받아 로컬을 재구성한다. 새 기기·브라우저 변경·저장소 삭제를 모두 커버.
const QUIZ_KEY = "dpQuiz";

export function getMemberId(): string | null {
  try {
    return localStorage.getItem("dpAuth");
  } catch {
    return null;
  }
}

export interface SyncedProfile {
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
  step?: string;
}

/** 로컬이 비어 있을 때 서버에 저장된 계정 프로파일을 복원한다. 성공 시 로컬에도 기록. */
export async function restoreProfileFromServer(): Promise<SyncedProfile | null> {
  const user = getMemberId();
  if (!user) return null;
  try {
    const res = await fetch(`/api/profile/restore?user=${encodeURIComponent(user)}`);
    if (!res.ok) return null;
    const j = await res.json();
    if (!j?.ok || !j.profile?.name) return null;
    const profile: SyncedProfile = { ...j.profile, step: "F" };
    try {
      localStorage.setItem(QUIZ_KEY, JSON.stringify(profile));
      localStorage.setItem("dogName", profile.name);
    } catch {}
    return profile;
  } catch {
    return null;
  }
}
