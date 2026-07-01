import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kraft: {
          DEFAULT: "var(--color-kraft)",
          light: "var(--color-kraft-light)",
          dark: "var(--color-kraft-dark)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          light: "var(--color-ink-light)",
        },
        stamp: {
          DEFAULT: "var(--color-stamp)",
          hover: "var(--color-stamp-hover)",
        },
        leaf: "var(--color-leaf)",
        parchment: "var(--color-parchment)",
        cream: "var(--color-white)",
        borderk: "var(--color-border)",
        gold: {
          DEFAULT: "var(--color-gold)",
          light: "var(--color-gold-l)",
        },
      },
      fontFamily: {
        brand: ["var(--font-playfair)", "Playfair Display", "serif"],
        serifkr: ["var(--font-noto-serif-kr)", "Noto Serif KR", "serif"],
        sans: ["var(--font-pretendard)", "Pretendard", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2rem, 5vw, 3.5rem)", { lineHeight: "1.2" }],
        section: ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.3" }],
      },
      boxShadow: {
        kraft: "4px 4px 0px var(--color-kraft-dark)",
        "kraft-sm": "3px 3px 0px var(--color-kraft-dark)",
      },
      borderRadius: {
        // 전역적으로 모서리를 날카롭게(에디토리얼) — pill(full)만 유지
        sm: "2px",
        DEFAULT: "2px",
        md: "3px",
        lg: "3px",
        xl: "4px",
        "2xl": "4px",
        "3xl": "6px",
      },
    },
  },
  plugins: [],
};
export default config;
