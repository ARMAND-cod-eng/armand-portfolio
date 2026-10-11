import type { ReactNode } from "react";
import type { ConfusionChart } from "@/data/types";
import { cn } from "@/lib/cn";
import { ChartFrame } from "./chart-frame";

const format = (n: number) => n.toLocaleString("en-US");

/**
 * 2×2 confusion matrix. One hue, shaded by count on a log scale (the classes
 * differ by three orders of magnitude); text flips to stay legible on dark fills.
 */
export function ConfusionMatrix({ chart }: { chart: ConfusionChart }) {
  const { tn, fp, fn, tp } = chart.cells;
  const [negative, positive] = chart.labels;
  const max = Math.log10(Math.max(tn, fp, fn, tp));
  const strength = (n: number) => Math.log10(Math.max(n, 1)) / max;

  const cells = [
    { name: "True negatives", value: tn, actual: negative, predicted: negative },
    { name: "False positives", value: fp, actual: negative, predicted: positive },
    { name: "False negatives", value: fn, actual: positive, predicted: negative },
    { name: "True positives", value: tp, actual: positive, predicted: positive },
  ];

  return (
    <ChartFrame
      title={chart.title}
      subtitle={chart.subtitle}
      table={{
        columns: ["Actual \\ Predicted", negative, positive],
        rows: [
          [negative, format(tn), format(fp)],
          [positive, format(fn), format(tp)],
        ],
      }}
    >
      <div className="grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] gap-[2px] text-center">
        <span />
        <span className="pb-1 text-[11px] text-faint">Predicted {negative.toLowerCase()}</span>
        <span className="pb-1 text-[11px] text-faint">Predicted {positive.toLowerCase()}</span>
        {cells.map((cell, index) => {
          const s = strength(cell.value);
          return (
            <Row key={cell.name} index={index} actual={cell.actual}>
              <span
                className="relative flex min-h-20 flex-col items-center justify-center rounded-[4px] px-2 py-3"
                title={`${cell.name}: ${format(cell.value)}`}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-[4px] bg-chart-accent"
                  style={{ opacity: 0.12 + 0.88 * s }}
                />
                <span
                  className={cn(
                    "relative font-mono text-lg font-medium tabular-nums",
                    s > 0.7 ? "text-canvas" : "text-ink",
                  )}
                >
                  {format(cell.value)}
                </span>
                <span className={cn("relative text-[11px]", s > 0.7 ? "text-canvas" : "text-muted")}>
                  {cell.name}
                </span>
              </span>
            </Row>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-faint">Shade shows the count on a log scale.</p>
    </ChartFrame>
  );
}

/** Inserts the row header before the first cell of each matrix row. */
function Row({ index, actual, children }: { index: number; actual: string; children: ReactNode }) {
  if (index % 2 === 0) {
    return (
      <>
        <span className="flex items-center pr-2 text-left text-[11px] leading-tight text-faint">
          Actual
          <br />
          {actual.toLowerCase()}
        </span>
        {children}
      </>
    );
  }
  return <>{children}</>;
}
