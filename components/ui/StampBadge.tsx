import { ReactNode } from "react";

interface StampBadgeProps {
  children: ReactNode;
  rotate?: "left" | "right";
  className?: string;
}

export default function StampBadge({
  children,
  rotate = "left",
  className = "",
}: StampBadgeProps) {
  void rotate;
  return (
    <span
      className={`font-brand inline-flex items-center justify-center border border-gold bg-cream px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-gold ${className}`}
    >
      {children}
    </span>
  );
}
