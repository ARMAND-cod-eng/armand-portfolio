import type { BarsChart } from "@/data/types";
import { cn } from "@/lib/cn";
import { ChartFrame, MarkTooltip } from "./chart-frame";

/** Space reserved at the end of each track for the value label. */
const LABEL_ROOM = "4.5rem";

/**
 * Horizontal bars from a zero baseline: ≤16px thick, 4px rounded data end,
 * value at the tip. One series → one color, unless an entity is emphasized,
 * in which case the rest recede to the neutral gray.
 */
export function BarChart({ chart }: { chart: BarsChart }) {
  const max = chart.max ?? Math.max(...chart.data.map((d) => d.value), chart.reference?.value ?? 0);
  const hasEmphasis = chart.data.some((d) => d.emphasis);
  const ratio = (value: number) => Math.max(0, Math.min(1, value / max));

  return (
    <ChartFrame
      title={chart.title}
      subtitle={chart.subtitle}
      table={{
        columns: ["Item", "Value"],
        rows: chart.data.map((d) => [d.label, d.note ? `${d.display} (${d.note})` : d.display]),
      }}
    >
      <ul className="space-y-3.5">
        {chart.data.map((d, index) => {
          const accent = !hasEmphasis || d.emphasis;
          return (
            <li key={d.label} className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)]">
              <span className="leading-tight">
                <span className={cn("block text-[13px]", d.emphasis ? "font-medium text-ink" : "text-ink-2")}>
                  {d.label}
                </span>
                {d.note && <span className="mt-0.5 block text-[11px] text-faint">{d.note}</span>}
              </span>
              <span className="group/mark relative flex h-7 items-center">
                {/* Zero baseline */}
                <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-line-strong" />
                <span
                  aria-hidden
                  className={cn(
                    "chart-bar h-3.5 rounded-r-[4px] group-hover/mark:brightness-110",
                    accent ? "bg-chart-accent" : "bg-chart-neutral",
                  )}
                  style={{ width: `calc((100% - ${LABEL_ROOM}) * ${ratio(d.value)})` }}
                />
                <span className="ml-2 font-mono text-xs tabular-nums text-ink">{d.display}</span>
                {chart.reference && (
                  <span
                    aria-hidden
                    className="absolute inset-y-0 border-l border-dashed border-faint"
                    style={{ left: `calc((100% - ${LABEL_ROOM}) * ${ratio(chart.reference.value)})` }}
                  >
                    {index === 0 && (
                      <span className="absolute -top-4 left-1 font-mono text-[10px] whitespace-nowrap text-faint">
                        {chart.reference.label}
                      </span>
                    )}
                  </span>
                )}
                <MarkTooltip value={d.display} label={d.label} note={d.note} />
              </span>
            </li>
          );
        })}
      </ul>
      {chart.reference && (
        <p className="sr-only">
          Reference line: {chart.reference.label} at {chart.reference.value}.
        </p>
      )}
    </ChartFrame>
  );
}
