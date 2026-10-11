import type { ShareChart } from "@/data/types";
import { ChartFrame, LegendItem, MarkTooltip } from "./chart-frame";

/** Smallest segment (in %) that gets an inline label; smaller ones rely on the tooltip and table. */
const INLINE_LABEL_MIN = 14;

/** 100% bars with a 2px surface gap between segments. */
export function ShareBars({ chart }: { chart: ShareChart }) {
  return (
    <ChartFrame
      title={chart.title}
      subtitle={chart.subtitle}
      legend={
        <span className="flex flex-wrap gap-3">
          <LegendItem label={chart.segments[0]} className="bg-chart-accent" />
          <LegendItem label={chart.segments[1]} className="bg-chart-neutral" />
        </span>
      }
      table={{
        columns: ["", ...chart.segments],
        rows: chart.rows.map((row) => [row.label, `${row.values[0]}%`, `${row.values[1]}%`]),
      }}
    >
      <ul className="space-y-4">
        {chart.rows.map((row) => (
          <li key={row.label}>
            <p className="text-[13px] text-ink-2">{row.label}</p>
            <div className="mt-2 flex h-6 gap-[2px]">
              {row.values.map((value, i) => (
                <span
                  key={chart.segments[i]}
                  className={`group/mark relative flex items-center ${i === 0 ? "rounded-l-[4px] bg-chart-accent" : "rounded-r-[4px] bg-chart-neutral"}`}
                  style={{ width: `${value}%` }}
                >
                  {value >= INLINE_LABEL_MIN && (
                    <span
                      className={`px-2 font-mono text-xs font-medium tabular-nums ${i === 0 ? "text-canvas" : "text-ink"}`}
                    >
                      {value}%
                    </span>
                  )}
                  <MarkTooltip value={`${value}%`} label={`${chart.segments[i]} · ${row.label}`} />
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </ChartFrame>
  );
}
