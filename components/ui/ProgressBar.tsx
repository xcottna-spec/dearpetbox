"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalStep: number;
  minutesLeft?: number;
}

export default function ProgressBar({
  currentStep,
  totalStep,
  minutesLeft,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((currentStep / totalStep) * 100));
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-ink-light">
        <span>
          {currentStep}/{totalStep} 단계
        </span>
        {minutesLeft !== undefined && <span>약 {minutesLeft}분 남았어요</span>}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-kraft-light">
        <motion.div
          className="h-full rounded-full bg-stamp"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
