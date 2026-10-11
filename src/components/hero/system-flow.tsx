"use client";

import {
  ArrowRight,
  Braces,
  Inbox,
  Pause,
  Play,
  Rocket,
  RotateCcw,
  ScanSearch,
  ShieldCheck,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { m } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

interface Stage {
  id: string;
  label: string;
  Icon: LucideIcon;
  summary: string;
  detail: string;
  examples: { label: string; href: string }[];
}

const STAGES: Stage[] = [
  {
    id: "input",
    label: "Input",
    Icon: Inbox,
    summary: "Messy, real-world data",
    detail:
      "News feeds, documents, transactions and reviews — cleaned, deduplicated and structured before a model sees them.",
    examples: [
      { label: "IntelliCast · 14 news outlets", href: "/projects/intellicast-ai" },
      { label: "Fraud · 284K transactions", href: "/projects/fraud-detection" },
    ],
  },
  {
    id: "retrieval",
    label: "Retrieval",
    Icon: ScanSearch,
    summary: "Evidence before generation",
    detail:
      "Embeddings, vector search and grounding so models answer from sources rather than from memory.",
    examples: [{ label: "IntelliCast · pgvector story clustering", href: "/projects/intellicast-ai" }],
  },
  {
    id: "agents",
    label: "Agents",
    Icon: Waypoints,
    summary: "Orchestration with explicit state",
    detail:
      "Planners, parallel workers and tools wired as a graph with typed state, token budgets and bounded loops.",
    examples: [{ label: "Atlas · LangGraph fan-out", href: "/projects/atlas" }],
  },
  {
    id: "evaluation",
    label: "Evaluation",
    Icon: ShieldCheck,
    summary: "Quality gates that can say no",
    detail:
      "Critics, fact-checks and test suites that reject work and send it back — measured, not assumed.",
    examples: [
      { label: "Atlas · grounded critic", href: "/projects/atlas" },
      { label: "IntelliCast · fact-check before voice", href: "/projects/intellicast-ai" },
    ],
  },
  {
    id: "api",
    label: "API",
    Icon: Braces,
    summary: "Typed, streaming services",
    detail:
      "FastAPI services, background workers and SSE streams that survive a dropped connection.",
    examples: [{ label: "Atlas · arq worker + resumable SSE", href: "/projects/atlas" }],
  },
  {
    id: "production",
    label: "Production",
    Icon: Rocket,
    summary: "Shipped, tested, observable",
    detail:
      "Docker images, CI on every change, cloud deploys — and honest labels for what is live and what is not.",
    examples: [{ label: "IntelliCast · Docker on AWS EC2", href: "/projects/intellicast-ai" }],
  },
];

/* Snake layout from `sm` up: row one runs left → right, row two runs right → left. */
const PLACEMENT = [
  "sm:col-start-1 sm:row-start-1",
  "sm:col-start-2 sm:row-start-1",
  "sm:col-start-3 sm:row-start-1",
  "sm:col-start-3 sm:row-start-2",
  "sm:col-start-2 sm:row-start-2",
  "sm:col-start-1 sm:row-start-2",
];

type Direction = "right" | "left" | "down" | null;
const DESKTOP_FLOW: Direction[] = ["right", "right", "down", "left", "left", null];

const AUTO_ADVANCE_MS = 3600;

export function SystemFlow() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [interacted, setInteracted] = useState(false);
  // The server-rendered detail stays visible without JavaScript; it only
  // fades once the active stage actually changes.
  const [changed, setChanged] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const touring = autoPlay && !reduceMotion && !hovering && !interacted;

  useEffect(() => {
    if (!touring) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setChanged(true);
      setActiveIndex((index) => (index + 1) % STAGES.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [touring]);

  function show(index: number) {
    setChanged(true);
    setActiveIndex(index);
  }

  function select(index: number) {
    setInteracted(true);
    show(index);
  }

  const active = STAGES[activeIndex] ?? STAGES[0];

  return (
    <figure
      className="relative rounded-3xl border border-line bg-surface/70 p-4 shadow-raised backdrop-blur-sm sm:p-6"
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <div aria-hidden className="absolute inset-0 rounded-3xl bg-grid-fine mask-fade-edges" />

      <div className="relative flex items-center justify-between gap-3">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint sm:text-[11px] sm:tracking-[0.18em]">
          <span className="text-accent">●</span>&nbsp; How I build AI systems
        </p>
        {!reduceMotion && !interacted && (
          <button
            type="button"
            onClick={() => setAutoPlay((value) => !value)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] whitespace-nowrap uppercase tracking-[0.12em] text-faint transition-colors hover:border-line-strong hover:text-ink-2"
          >
            {autoPlay ? <Pause className="size-3" aria-hidden /> : <Play className="size-3" aria-hidden />}
            {autoPlay ? "Pause tour" : "Play tour"}
          </button>
        )}
      </div>

      <ol
        aria-label="System stages"
        className="relative mt-5 grid grid-cols-1 gap-(--gap) pr-9 [--gap:0.9rem] sm:grid-cols-3 sm:grid-rows-2 sm:[--gap:1.6rem]"
      >
        {STAGES.map((stage, index) => {
          const isActive = index === activeIndex;
          const desktop = DESKTOP_FLOW[index];
          const isLast = index === STAGES.length - 1;
          return (
            <li key={stage.id} className={cn("relative", PLACEMENT[index])}>
              <button
                type="button"
                aria-pressed={isActive}
                aria-controls="system-flow-detail"
                onClick={() => select(index)}
                onFocus={() => select(index)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") show(index);
                }}
                className={cn(
                  "relative flex h-12 w-full items-center gap-3 rounded-xl border px-3 text-left transition-[border-color,background-color,box-shadow] duration-300 sm:h-[4.5rem] sm:flex-col sm:items-start sm:justify-center sm:gap-1.5",
                  isActive
                    ? "border-accent/60 bg-accent/[0.08] shadow-[0_0_0_4px_rgb(34_211_238/0.08),0_8px_30px_-12px_rgb(34_211_238/0.6)]"
                    : "border-line-strong bg-surface-2/90 hover:border-line-hover",
                )}
              >
                <span className="flex items-center gap-2">
                  <stage.Icon
                    className={cn(
                      "size-4 transition-colors",
                      isActive ? "text-accent" : "text-muted",
                    )}
                    aria-hidden
                  />
                  <span className="font-mono text-[10px] text-faint sm:hidden">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>
                <span className="flex items-baseline gap-2">
                  <span className="hidden font-mono text-[10px] text-faint sm:inline">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-medium tracking-tight",
                      isActive ? "text-ink" : "text-ink-2",
                    )}
                  >
                    {stage.label}
                  </span>
                </span>
              </button>

              {/* Connectors: vertical on mobile, snake from sm up. */}
              {!isLast && <Connector direction="down" active={isActive} className="sm:hidden" />}
              {desktop && (
                <Connector direction={desktop} active={isActive} className="hidden sm:block" />
              )}

              {/* Feedback loop: Evaluation can send work back to Agents (directly above it). */}
              {stage.id === "evaluation" && <FeedbackLoop active={activeIndex === 3 || activeIndex === 2} />}
            </li>
          );
        })}
      </ol>

      <div
        id="system-flow-detail"
        aria-live={interacted ? "polite" : "off"}
        className="relative mt-5 min-h-[10.5rem] rounded-2xl border border-line bg-canvas/60 p-4 sm:min-h-[9.25rem] sm:p-5"
      >
        <m.div
            key={active.id}
            initial={changed ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <p className="flex items-center gap-2 text-sm font-medium text-ink">
              <active.Icon className="size-4 text-accent" aria-hidden />
              {active.label}
              <span className="text-faint">—</span>
              <span className="text-ink-2">{active.summary}</span>
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{active.detail}</p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {active.examples.map((example) => (
                <li key={example.label}>
                  <Link
                    href={example.href}
                    className="group inline-flex items-center gap-1 font-mono text-[11.5px] text-accent-soft transition-colors hover:text-ink"
                  >
                    {example.label}
                    <ArrowRight
                      className="size-3 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </m.div>
      </div>

      <figcaption className="relative mt-3 text-[11.5px] leading-relaxed text-faint">
        A general shape for production AI systems, not the architecture of a single project.
        Select a stage to see where it shows up in my work.
      </figcaption>
    </figure>
  );
}

function Connector({
  direction,
  active,
  className,
}: {
  direction: Exclude<Direction, null>;
  active: boolean;
  className?: string;
}) {
  const horizontal = direction !== "down";
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute",
        direction === "right" && "top-1/2 left-full h-px w-(--gap) -translate-y-1/2",
        direction === "left" && "top-1/2 right-full h-px w-(--gap) -translate-y-1/2",
        direction === "down" && "top-full left-1/2 h-(--gap) w-px -translate-x-1/2",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-0 is-active opacity-50 transition-opacity duration-300",
          horizontal ? "flow-x" : "flow-y",
          direction === "left" && "is-reverse",
          active && "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute size-0 border-transparent",
          direction === "right" && "top-1/2 -right-px -translate-y-1/2 border-y-[3.5px] border-l-[5px] border-l-accent/80",
          direction === "left" && "top-1/2 -left-px -translate-y-1/2 border-y-[3.5px] border-r-[5px] border-r-accent/80",
          direction === "down" && "-bottom-px left-1/2 -translate-x-1/2 border-x-[3.5px] border-t-[5px] border-t-accent/80",
        )}
      />
    </span>
  );
}

function FeedbackLoop({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-1/2 left-full ml-1.5 h-[calc(100%+var(--gap))] w-5"
    >
      <span
        className={cn(
          "absolute inset-0 rounded-r-lg border-y border-r border-dashed transition-colors duration-300",
          active ? "border-violet" : "border-violet/45",
        )}
      />
      <span className="absolute -top-[3.5px] -left-px size-0 border-y-[3.5px] border-r-[5px] border-y-transparent border-r-violet" />
      <span
        className={cn(
          "absolute top-1/2 -right-2.5 flex size-5 -translate-y-1/2 items-center justify-center rounded-full border bg-surface transition-colors duration-300",
          active ? "border-violet text-violet" : "border-violet/45 text-violet/70",
        )}
      >
        <RotateCcw className="size-2.5" />
      </span>
    </span>
  );
}
