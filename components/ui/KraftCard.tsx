import { ReactNode } from "react";

interface KraftCardProps {
  children: ReactNode;
  className?: string;
}

export default function KraftCard({ children, className = "" }: KraftCardProps) {
  return (
    <div
      className={`texture-kraft rounded-lg border-2 border-borderk bg-kraft-light p-7 shadow-kraft ${className}`}
    >
      {children}
    </div>
  );
}
