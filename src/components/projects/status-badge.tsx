import type { ProjectStatus } from "@/data/types";
import { cn } from "@/lib/cn";

const styles: Record<ProjectStatus["kind"], { dot: string; ring: string }> = {
  live: { dot: "bg-ok pulse-dot", ring: "border-ok/30 text-ok" },
  building: { dot: "bg-warn", ring: "border-warn/30 text-warn" },
  complete: { dot: "bg-muted", ring: "border-line-strong text-ink-2" },
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const style = styles[status.kind];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-canvas/60 px-2.5 py-0.5 text-[11.5px] font-medium",
        style.ring,
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", style.dot)} />
      {status.label}
    </span>
  );
}
