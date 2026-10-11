import type { PairedChart } from "@/data/types";
import { cn } from "@/lib/cn";
import { ChartFrame, LegendItem, MarkTooltip } from "./chart-frame";

const LABEL_ROOM = "4.5rem";
const SERIES_CLASS = ["bg-chart-neutral", "bg-chart-accent"] as const;

/**
 * Two series compared across metrics with different units — each metric gets
 * its own scale (small multiples), never a shared or dual axis.
 */
export function PairedBars({ chart }: { chart: PairedChart }) {
  return (
    <ChartFrame
      title={chart.title}
      subtitle={chart.subtitle}
      legend={
        <span className="flex gap-3">
          <LegendItem label={chart.series[0]} className={SERIES_CLASS[0]} />
          <LegendItem label={chart.series[1]} className={SERIES_CLASS[1]} />
        </span>
      }
      table={{
        columns: ["Metric", ...chart.series],
        rows: chart.groups.map((g) => [g.label, g.display[0], g.display[1]]),
      }}
    >
      <div className="space-y-5">
        {chart.groups.map((group) => (
          <div key={group.label}>
            <p className="text-[13px] text-ink-2">{group.label}</p>
            <ul className="mt-2 space-y-1.5">
              {group.values.map((value, i) => (
                <li key={chart.series[i]} className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3">
                  <span className="text-[11px] text-faint">{chart.series[i]}</span>
                  <span className="group/mark relative flex h-5 items-center">
                    <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-line-strong" />
                    <span
                      aria-hidden
                      className={cn("chart-bar h-3 rounded-r-[4px] group-hover/mark:brightness-110", SERIES_CLASS[i])}
                      style={{ width: `calc((100% - ${LABEL_ROOM}) * ${Math.min(1, value / group.max)})` }}
                    />
                    <span className="ml-2 font-mono text-xs tabular-nums text-ink">{group.display[i]}</span>
                    <MarkTooltip value={group.display[i] ?? ""} label={`${chart.series[i]} · ${group.label}`} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}
