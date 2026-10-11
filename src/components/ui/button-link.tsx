import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-canvas shadow-cta hover:bg-ink-2",
  secondary:
    "border border-line-strong bg-fill text-ink hover:border-line-hover hover:bg-fill-2",
  ghost: "text-ink-2 hover:bg-fill-2 hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
};

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Forces new-tab behavior; defaults to true for http(s) URLs. */
  external?: boolean;
  "aria-label"?: string;
  download?: boolean;
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  size = "md",
  className,
  external,
  download,
  ...rest
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const opensNewTab = external ?? isExternalHref(href);

  if (opensNewTab || href.startsWith("mailto:") || download) {
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
        {opensNewTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
