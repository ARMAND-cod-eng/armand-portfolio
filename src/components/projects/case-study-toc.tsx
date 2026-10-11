"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface TocItem {
  id: string;
  label: string;
}

/** Sticky "On this page" navigation that follows the section in view. */
export function CaseStudyToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">On this page</p>
      <ul className="mt-4 space-y-0.5 border-l border-line">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-1.5 pl-4 text-[13px] transition-colors",
                  isActive
                    ? "border-accent text-ink"
                    : "border-transparent text-muted hover:border-line-strong hover:text-ink-2",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
