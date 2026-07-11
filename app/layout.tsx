import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { BRAND } from "@/data/brand";

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: BRAND.title,
  description: BRAND.description,
  keywords: ["강아지 맞춤 간식", "반려견 구독", "알레르기 간식", "맞춤 간식", "디어펫"],
  openGraph: {
    title: BRAND.title,
    description: BRAND.ogDescription,
    url: BRAND.url,
    siteName: BRAND.name,
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
