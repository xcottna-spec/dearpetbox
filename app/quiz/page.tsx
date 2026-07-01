import type { Metadata } from "next";
import QuizFlow from "@/components/quiz/QuizFlow";

export const metadata: Metadata = {
  title: "맞춤 진단 | 디어펫 박스",
  description: "3분이면 완성되는 우리 아이 맞춤 간식 진단.",
};

export default function QuizPage() {
  return <QuizFlow />;
}
