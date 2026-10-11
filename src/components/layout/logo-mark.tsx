import { cn } from "@/lib/cn";

/** Monogram: three connected nodes inside a soft square — a tiny system graph. */
export function LogoMark({ className, id = "logo" }: { className?: string; id?: string }) {
  const gradient = `${id}-stroke`;
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" className="[stop-color:var(--color-viz-cyan)]" />
          <stop offset="1" className="[stop-color:var(--color-viz-violet)]" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" className="fill-surface stroke-line-strong" />
      <path
        d="M10 21.5 16 10.5l6 11"
        fill="none"
        stroke={`url(#${gradient})`}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.6 17h6.8" stroke={`url(#${gradient})`} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16" cy="10.5" r="2.1" className="fill-viz-cyan" />
      <circle cx="10" cy="21.5" r="2.1" className="fill-ink" />
      <circle cx="22" cy="21.5" r="2.1" className="fill-viz-violet" />
    </svg>
  );
}
