'use client';

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  href?: string;
  icon?: React.ReactNode;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, href, icon, ...props }, ref) => {
  const content = (
    <>
      <span className="inline-block translate-x-1 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 whitespace-nowrap">
        {text}
      </span>
      <div className="absolute inset-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 whitespace-nowrap px-4">
        <span>{text}</span>
        {icon || <ArrowRight className="h-4 w-4 flex-shrink-0" />}
      </div>
      <div className="absolute left-[12%] top-[40%] h-2.5 w-2.5 scale-[1] rounded-full bg-[var(--accent-coral-action)] transition-all duration-300 ease-out group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-[var(--accent-coral-action)]" />
    </>
  );

  const buttonClasses = cn(
    "group relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-full border border-[var(--border-line)] bg-white text-[var(--text-main)] px-6 py-3 h-[52px] sm:h-[56px] text-center font-bold text-base shadow-sm transition-colors hover:border-[var(--accent-coral-action)] active:scale-[0.98]",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={buttonClasses}
      {...props}
    >
      {content}
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
