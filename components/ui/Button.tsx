"use client";

import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  variant?: Variant;
  fullWidth?: boolean;
  isLoading?: boolean;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-tight transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stamp disabled:opacity-60 disabled:cursor-not-allowed px-7 py-4 text-base";

const variants: Record<Variant, string> = {
  primary:
    "bg-stamp text-cream shadow-kraft-sm hover:-translate-y-0.5 hover:bg-stamp-hover",
  secondary:
    "bg-kraft-light text-ink border-2 border-borderk hover:-translate-y-0.5",
  ghost: "bg-transparent text-ink underline underline-offset-4 hover:text-stamp",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    fullWidth,
    withArrow,
    className = "",
    children,
  } = props;

  const cls = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`;
  const content = (
    <>
      {children}
      {withArrow && <span aria-hidden>→</span>}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} onClick={props.onClick} className={cls}>
        {content}
      </Link>
    );
  }

  const { isLoading, ...rest } = props as ButtonAsButton;
  return (
    <button className={cls} disabled={isLoading} {...rest}>
      {isLoading ? "잠시만요…" : content}
    </button>
  );
}
