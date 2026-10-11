"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  as?: "article" | "div" | "li";
  "aria-labelledby"?: string;
}

/**
 * A surface whose border glows where the pointer is. Pure CSS variables —
 * no re-renders on pointer move. Touch input is ignored.
 */
export function SpotlightCard({
  children,
  className,
  as = "div",
  "aria-labelledby": labelledBy,
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement | null>(null);

  function handleMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    node.style.setProperty("--spot-opacity", "1");
  }

  function handleLeave() {
    ref.current?.style.setProperty("--spot-opacity", "0");
  }

  const Component = as;
  return (
    <Component
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      aria-labelledby={labelledBy}
      className={cn("spotlight", className)}
    >
      {children}
    </Component>
  );
}
