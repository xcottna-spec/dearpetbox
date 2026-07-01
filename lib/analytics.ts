// GA4 안전 래퍼 — gtag 미설정/SSR 환경에서도 안전
type GtagParams = Record<string, unknown>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  } else if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[GA4]", name, params);
  }
}

export const TRACK = {
  heroCtaClick: () => trackEvent("hero_cta_click"),
  sectionView: (sectionId: string) =>
    trackEvent("section_view", { section_id: sectionId }),
  pricingView: () => trackEvent("pricing_view"),
  faqExpand: (q: string) => trackEvent("faq_expand", { question: q }),
  finalCtaClick: () => trackEvent("final_cta_click"),
  quizStart: () => trackEvent("quiz_start"),
  planSelect: (plan: string) => trackEvent("plan_select", { plan }),
};
