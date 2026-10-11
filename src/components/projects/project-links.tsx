import { ArrowUpRight, Globe } from "lucide-react";
import { GitHubIcon, KaggleIcon } from "@/components/ui/brand-icons";
import type { ExternalLink, LinkKind } from "@/data/types";
import { cn } from "@/lib/cn";

function LinkIcon({ kind }: { kind: LinkKind }) {
  if (kind === "github") return <GitHubIcon size={14} />;
  if (kind === "kaggle") return <KaggleIcon size={14} />;
  return <Globe className="size-3.5" aria-hidden />;
}

/** External project links. Raised above stretched card links via `relative z-10`. */
export function ProjectLinks({
  links,
  className,
  size = "sm",
}: {
  links: ExternalLink[];
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <ul className={cn("relative z-10 flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group/link inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-fill font-medium text-ink-2 transition-colors hover:border-line-hover hover:bg-fill-2 hover:text-ink",
              size === "sm" ? "h-8 px-3 text-xs" : "h-10 px-4 text-sm",
            )}
          >
            <LinkIcon kind={link.kind} />
            {link.label}
            <ArrowUpRight
              className="size-3 text-faint transition-transform group-hover/link:-translate-y-px group-hover/link:translate-x-px"
              aria-hidden
            />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
