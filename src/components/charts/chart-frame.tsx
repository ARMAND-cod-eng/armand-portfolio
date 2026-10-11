import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ChartFrameProps {
  title: string;
  subtitle?: string;
  legend?: ReactNode;
  table: { columns: string[]; rows: string[][] };
  children: ReactNode;
  className?: string;
}

/**
 * Shared chart chrome: title, optional legend, the plot, and a table view.
 * The table is the accessible twin of every chart — tooltips never gate a value.
 */
export function ChartFrame({ title, subtitle, legend, table, children, className }: ChartFrameProps) {
  return (
    <figure className={cn("flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-raised", className)}>
      <figcaption className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <span>
          <span className="block text-sm font-medium text-ink">{title}</span>
          {subtitle && <span className="mt-0.5 block text-xs text-muted">{subtitle}</span>}
        </span>
        {legend}
      </figcaption>
      <div className="mt-5 flex-1">{children}</div>
      <details className="group/table mt-4 border-t border-line pt-3">
        <summary className="cursor-pointer list-none text-xs text-faint transition-colors hover:text-ink-2 [&::-webkit-details-marker]:hidden">
          <span className="group-open/table:hidden">Show data table</span>
          <span className="hidden group-open/table:inline">Hide data table</span>
        </summary>
        <table className="mt-3 w-full text-left text-xs">
          <thead>
            <tr className="border-b border-line">
              {table.columns.map((column) => (
                <th key={column} scope="col" className="py-1.5 pr-3 font-medium text-muted">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.join("|")} className="border-b border-line last:border-0">
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={index} scope="row" className="py-1.5 pr-3 font-normal text-ink-2">
                      {cell}
                    </th>
                  ) : (
                    <td key={index} className="py-1.5 pr-3 font-mono tabular-nums text-ink-2">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}

/** Legend entry: a swatch shaped like the mark (a bar), with text in text tokens. */
export function LegendItem({ label, className }: { label: string; className: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span aria-hidden className={cn("h-2.5 w-3.5 rounded-[3px]", className)} />
      {label}
    </span>
  );
}

/** Hover tooltip for a mark; values lead, labels follow. Purely visual — the table carries the data. */
export function MarkTooltip({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-full left-0 z-20 mb-1.5 hidden w-max max-w-[16rem] rounded-lg border border-line-strong bg-surface-3 px-2.5 py-1.5 shadow-raised group-hover/mark:block"
    >
      <span className="block font-mono text-[13px] font-medium text-ink">{value}</span>
      <span className="block text-[11px] text-muted">
        {label}
        {note ? ` · ${note}` : ""}
      </span>
    </span>
  );
}
