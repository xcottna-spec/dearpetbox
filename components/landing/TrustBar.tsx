const ITEMS = [
  { icon: "🐾", text: "알레르기 성분 100% 제외" },
  { icon: "✦", text: "성분·원산지 전부 공개" },
  { icon: "↩", text: "안 맞으면 무료로 교체" },
];

export default function TrustBar() {
  return (
    <section className="bg-kraft-dark text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-5 py-5 text-sm sm:flex-row sm:gap-10 sm:text-base">
        {ITEMS.map((it) => (
          <div key={it.text} className="flex items-center gap-2">
            <span aria-hidden className="text-lg">
              {it.icon}
            </span>
            <span className="font-medium">{it.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
