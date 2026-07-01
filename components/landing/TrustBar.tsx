const ITEMS = [
  { icon: "🐾", text: "알레르기 성분 100% 제외 보장" },
  { icon: "✦", text: "국내 소규모 공방 수제 제작" },
  { icon: "↩", text: "첫 달 100% 만족 보장" },
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
