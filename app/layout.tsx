import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://dearpetbox.co.kr"),
  title: "디어펫 박스 | 우리 아이 맞춤 간식 구독",
  description:
    "반려견 알레르기와 취향을 분석해 매달 딱 맞는 맞춤 간식 10종을 보내드립니다. 안 맞은 간식은 무료 교체, 다음 박스는 더 정확하게.",
  keywords: ["강아지 맞춤 간식", "반려견 구독", "알레르기 간식", "맞춤 간식", "디어펫"],
  openGraph: {
    title: "디어펫 박스 | 우리 아이 맞춤 간식 구독",
    description:
      "알레르기 성분은 빼고, 좋아하는 맛은 넣어서 — 매달 딱 맞는 맞춤 간식 10종.",
    url: "https://dearpetbox.co.kr",
    siteName: "Dear Pet Box",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
