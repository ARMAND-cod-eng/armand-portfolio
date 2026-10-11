import { RotateCcw } from "lucide-react";
import type { Architecture } from "@/data/types";
import { cn } from "@/lib/cn";

/**
 * Data-driven architecture diagram: stages flow top to bottom along a rail,
 * parallel components sit side by side, and an optional feedback loop is
 * called out where it starts.
 */
export function PipelineDiagram({ architecture }: { architecture: Architecture }) {
  const { stages, loop, caption } = architecture;
  return (
    <figure className="rounded-3xl border border-line bg-surface/60 p-5 shadow-raised sm:p-7">
      <ol className="relative">
        {stages.map((stage, index) => {
          const isLast = index === stages.length - 1;
          const loopsBack = loop?.from === index;
          const receivesLoop = loop?.to === index;
          return (
            <li key={stage.label} className={cn("relative pl-9 sm:pl-12", !isLast && "pb-7")}>
              {!isLast && (
                <span
                  aria-hidden
                  className="absolute top-6 bottom-0 left-[11px] w-px bg-linear-to-b from-accent/50 to-line-strong sm:left-[15px]"
                />
              )}
              <span
                aria-hidden
                className={cn(
                  "absolute top-0.5 left-0 flex size-6 items-center justify-center rounded-full border font-mono text-[10px] sm:size-8 sm:text-[11px]",
                  stage.planned
                    ? "border-dashed border-line-hover bg-fill text-faint"
                    : receivesLoop
                      ? "border-violet/70 bg-violet/10 text-violet"
                      : "border-accent/50 bg-accent/10 text-accent",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="flex items-center gap-2 pt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-2 sm:pt-1.5">
                <span className="sr-only">Stage {index + 1}:</span>
                {stage.label}
                {stage.planned && (
                  <span className="rounded-full border border-warn/40 px-2 py-px text-[10px] tracking-[0.12em] text-warn normal-case">
                    Not built yet
                  </span>
                )}
              </p>

              <ul
                className={cn(
                  "mt-3 grid gap-2",
                  stage.nodes.length > 1 && "sm:grid-cols-2",
                  stage.nodes.length > 4 && "lg:grid-cols-3",
                )}
              >
                {stage.nodes.map((node) => (
                  <li
                    key={node.title}
                    className={cn(
                      "rounded-xl border px-3.5 py-3",
                      stage.planned ? "border-dashed border-line-hover bg-transparent" : "border-line-strong bg-canvas/70",
                    )}
                  >
                    <p className="text-sm font-medium text-ink">{node.title}</p>
                    {node.detail && (
                      <p className="mt-1 text-[13px] leading-snug text-muted">{node.detail}</p>
                    )}
                  </li>
                ))}
              </ul>

              {loopsBack && loop && (
                <p className="mt-3 flex items-start gap-2.5 rounded-xl border border-dashed border-violet/50 bg-violet/[0.06] px-3.5 py-3 text-[13px] leading-snug text-ink-2">
                  <RotateCcw className="mt-0.5 size-3.5 shrink-0 text-violet" aria-hidden />
                  <span>
                    <span className="font-medium text-violet">
                      Loops back to stage {String(loop.to + 1).padStart(2, "0")} (
                      {stages[loop.to]?.label}).
                    </span>{" "}
                    {loop.label}
                  </span>
                </p>
              )}
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-6 border-t border-line pt-4 text-[13px] leading-relaxed text-faint">
        {caption}
      </figcaption>
    </figure>
  );
}
