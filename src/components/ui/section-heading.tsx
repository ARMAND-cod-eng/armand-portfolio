import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  id,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "reveal max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-accent",
          align === "center" && "justify-center",
        )}
      >
        <span className="text-faint">{index}</span>
        <span aria-hidden className="h-px w-6 bg-line-strong" />
        <span>{eyebrow}</span>
      </p>
      <h2
        id={id}
        className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-balance text-ink sm:text-4xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

/** Italic serif accent for one phrase inside a heading. */
export function Emphasis({ children }: { children: ReactNode }) {
  return (
    <em className="pr-[0.04em] font-serif font-normal italic tracking-normal text-accent-soft">
      {children}
    </em>
  );
}
