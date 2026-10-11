"use client";

import { m } from "motion/react";
import { useState, type ReactNode } from "react";
import { filterLabels } from "@/data/navigation";
import type { FilterKey } from "@/data/types";
import { cn } from "@/lib/cn";

export interface ExplorerItem {
  id: string;
  filters: FilterKey[];
  node: ReactNode;
}

type Filter = "all" | FilterKey;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  ...(Object.entries(filterLabels) as [FilterKey, string][]).map(([key, label]) => ({ key, label })),
];

/** Client-side category filter over server-rendered project cards and rows. */
export function ProjectExplorer({
  featured,
  more,
  moreHeading,
}: {
  featured: ExplorerItem[];
  more: ExplorerItem[];
  moreHeading: ReactNode;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  // Items rendered on the server stay visible without JavaScript; only items
  // that appear after a filter change animate in.
  const [filtered, setFiltered] = useState(false);
  const matches = (item: ExplorerItem) => filter === "all" || item.filters.includes(filter);
  const visibleFeatured = featured.filter(matches);
  const visibleMore = more.filter(matches);
  const total = visibleFeatured.length + visibleMore.length;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {FILTERS.map(({ key, label }) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFiltered(true);
                  setFilter(key);
                }}
                className={cn(
                  "h-9 rounded-full border px-4 text-[13px] font-medium transition-colors",
                  active
                    ? "border-accent/50 bg-accent/10 text-ink"
                    : "border-line-strong text-muted hover:border-line-hover hover:text-ink",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className="font-mono text-xs text-faint">
          {total} {total === 1 ? "project" : "projects"}
        </p>
      </div>

      {visibleFeatured.length > 0 && (
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {visibleFeatured.map((item) => (
            <m.li
              key={item.id}
              initial={filtered ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {item.node}
            </m.li>
          ))}
        </ul>
      )}

      {visibleMore.length > 0 && (
        <section aria-labelledby="more-work-title" className="mt-20">
          {moreHeading}
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {visibleMore.map((item) => (
              <m.li
                key={item.id}
                initial={filtered ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              >
                {item.node}
              </m.li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
