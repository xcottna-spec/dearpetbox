import { FAQS } from "@/data/faq";

// 구조화 데이터 (Organization + FAQPage). 서버 컴포넌트에서 <script> 로 주입.
export default function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Dear Pet Box",
      url: "https://dearpetbox.co.kr",
      description:
        "반려견 알레르기와 취향을 분석해 매달 딱 맞는 맞춤 간식 10종을 보내드리는 구독 서비스.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
