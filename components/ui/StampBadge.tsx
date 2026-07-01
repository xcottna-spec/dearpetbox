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
  const rot = rotate === "left" ? "-rotate-[8deg]" : "rotate-[8deg]";
  return (
    <span
      className={`font-brand inline-flex items-center justify-center rounded-full border-2 border-stamp px-4 py-2 text-sm font-bold uppercase tracking-wide text-stamp ${rot} ${className}`}
    >
      {children}
    </span>
  );
}
