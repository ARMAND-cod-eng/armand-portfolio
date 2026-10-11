"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle({ className, withLabel = false }: { className?: string; withLabel?: boolean }) {
  // The server renders the dark default; React swaps in the real value right after hydration.
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark");
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full text-muted transition-colors hover:bg-fill-2 hover:text-ink",
        withLabel ? "h-12 border border-line-strong px-5 text-sm font-medium text-ink" : "size-9",
        className,
      )}
    >
      {theme === "dark" ? <Sun className="size-[17px]" aria-hidden /> : <Moon className="size-[17px]" aria-hidden />}
      {withLabel && <span>{theme === "dark" ? "Light theme" : "Dark theme"}</span>}
    </button>
  );
}
