"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type CopyState = "idle" | "copied" | "failed";

export function CopyEmailButton({ email, className }: { email: string; className?: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2200);
  }

  const label = state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy email";

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-fill px-4 text-sm font-medium text-ink-2 transition-colors hover:border-line-hover hover:bg-fill-2 hover:text-ink",
        state === "copied" && "border-ok/40 text-ok hover:text-ok",
        className,
      )}
    >
      {state === "copied" ? (
        <Check className="size-4" aria-hidden />
      ) : (
        <Copy className="size-4" aria-hidden />
      )}
      <span>{label}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {state === "copied" ? "Email address copied to clipboard" : ""}
        {state === "failed" ? "Could not copy. Use the email link instead." : ""}
      </span>
    </button>
  );
}
