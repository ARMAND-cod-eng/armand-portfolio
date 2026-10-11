import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-fill px-2 py-0.5 font-mono text-[11.5px] leading-5 text-ink-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TagList({
  items,
  className,
  label,
}: {
  items: string[];
  className?: string;
  label?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label={label}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
