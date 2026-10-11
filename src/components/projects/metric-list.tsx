import type { Metric } from "@/data/types";
import { cn } from "@/lib/cn";

/** Compact metric row used on project cards. */
export function MetricList({ metrics, className }: { metrics: Metric[]; className?: string }) {
  if (metrics.length === 0) return null;
  return (
    <dl
      className={cn(
        "grid grid-cols-3 divide-x divide-line overflow-hidden rounded-xl border border-line bg-canvas/40",
        className,
      )}
    >
      {metrics.slice(0, 3).map((metric) => (
        <div key={metric.label} className="flex flex-col-reverse justify-end gap-1 px-3 py-3 sm:px-4">
          <dt className="text-[11.5px] leading-snug text-muted">
            {metric.label}
            {metric.note && <span className="text-faint"> · {metric.note}</span>}
          </dt>
          <dd className="font-mono text-base font-medium tracking-tight text-ink sm:text-lg">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Larger metric grid used in case studies. */
export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col-reverse justify-end gap-1.5 bg-surface p-5">
          <dt className="text-sm text-muted">
            {metric.label}
            {metric.note && <span className="mt-1 block text-xs text-faint">{metric.note}</span>}
          </dt>
          <dd className="font-mono text-2xl font-medium tracking-tight text-ink">{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}
