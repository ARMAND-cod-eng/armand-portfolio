import type { ReactNode } from "react";
import type { VisualKey } from "@/data/types";
import { cn } from "@/lib/cn";

/**
 * Original schematic illustrations. They depict each system's shape, not its
 * interface — they are labeled “Schematic” and never stand in for screenshots.
 * Colors come from theme tokens (fill-viz-*, stroke-viz-*), so they follow
 * light and dark mode.
 */

const LABELS: Record<VisualKey, string> = {
  intellicast:
    "Schematic: news sources converge into story clusters, claims are checked across outlets, and a two-host audio briefing is produced.",
  atlas:
    "Schematic: a planner fans out to parallel researchers, a synthesizer combines them, and a critic sends one faulted branch back for a targeted retry.",
  fraud:
    "Schematic: transactions become engineered features; an autoencoder and an Isolation Forest add anomaly scores; XGBoost outputs a fraud probability against a threshold.",
  recsys:
    "Schematic: a sparse user-by-item matrix with one target user, feeding a ranked top-10 list where one recommendation is a hit.",
  churn:
    "Schematic: RFM customer segments beside a timeline split into training and test periods.",
};

export function ProjectVisual({
  visual,
  className,
  showBadge = true,
}: {
  visual: VisualKey;
  className?: string;
  showBadge?: boolean;
}) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl border border-line bg-visual", className)}
    >
      <div aria-hidden className="absolute inset-0 bg-grid-fine mask-fade-edges opacity-80" />
      <div
        aria-hidden
        className="absolute -top-1/3 left-1/2 h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow-cyan),transparent)]"
      />
      <svg
        viewBox="0 0 480 296"
        role="img"
        aria-label={LABELS[visual]}
        className="relative block h-auto w-full font-mono"
      >
        <Defs id={visual} />
        {VISUALS[visual]}
      </svg>
      {showBadge && (
        <span className="absolute right-2.5 bottom-2.5 rounded-full border border-line bg-canvas/80 px-1.5 py-px font-mono text-[9px] uppercase tracking-[0.12em] text-faint sm:right-3 sm:bottom-3 sm:px-2 sm:py-0.5 sm:text-[10px] sm:tracking-[0.14em]">
          Schematic
        </span>
      )}
    </div>
  );
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-flow`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopOpacity="0.15" className="[stop-color:var(--color-viz-cyan)]" />
        <stop offset="1" stopOpacity="0.7" className="[stop-color:var(--color-viz-cyan)]" />
      </linearGradient>
      <linearGradient id={`${id}-flow-v`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopOpacity="0.55" className="[stop-color:var(--color-viz-cyan)]" />
        <stop offset="1" stopOpacity="0.55" className="[stop-color:var(--color-viz-violet)]" />
      </linearGradient>
      <marker
        id={`${id}-arrow`}
        viewBox="0 0 8 8"
        refX="6"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M0 0.5 7 4 0 7.5z" className="fill-viz-violet" />
      </marker>
    </defs>
  );
}

function Label({
  x,
  y,
  children,
  anchor = "start",
  className = "fill-viz-text",
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  className?: string;
}) {
  return (
    <text x={x} y={y} fontSize="9" letterSpacing="1.4" textAnchor={anchor} className={className}>
      {children}
    </text>
  );
}

function Node({
  x,
  y,
  w,
  h,
  label,
  stroke = "stroke-viz-stroke",
  dashed,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  stroke?: string;
  dashed?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="7"
        className={cn("fill-viz-node", stroke)}
        strokeDasharray={dashed ? "3 3" : undefined}
      />
      {label && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 3.5}
          fontSize="10"
          textAnchor="middle"
          className="fill-viz-ink"
        >
          {label}
        </text>
      )}
    </g>
  );
}

function Check({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x} ${y} l2.5 2.5 l4.5 -5`}
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-ok"
    />
  );
}

/* ------------------------------------------------------------------ */

function IntelliCastVisual() {
  const sources = [0, 1, 2, 3, 4, 5].map((i) => 44 + i * 34);
  const clusters = [78, 137, 196];
  const links: [number, number][] = [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 2],
    [5, 2],
    [3, 2],
  ];
  const waveA = [8, 14, 22, 12, 26, 18, 10, 20, 28, 14, 9, 16];
  const waveB = [12, 20, 10, 24, 16, 8, 18, 26, 12, 20, 14, 8];
  return (
    <g>
      <Label x={24} y={28}>SOURCES</Label>
      <Label x={168} y={28}>STORIES</Label>
      <Label x={262} y={28}>CLAIMS</Label>
      <Label x={388} y={28}>BRIEFING</Label>

      {links.map(([s, c]) => {
        const y1 = (sources[s] ?? 0) + 8;
        const y2 = clusters[c] ?? 0;
        return (
          <path
            key={`${s}-${c}`}
            d={`M82 ${y1} C 126 ${y1}, 128 ${y2}, 168 ${y2}`}
            fill="none"
            stroke="url(#intellicast-flow)"
            strokeWidth="1"
          />
        );
      })}

      {sources.map((y, i) => (
        <g key={y}>
          <rect x={24} y={y} width={58} height={16} rx={5} className="fill-viz-node stroke-viz-stroke" />
          <rect x={31} y={y + 6} width={i % 2 ? 26 : 20} height={4} rx={2} opacity={0.5} className="fill-viz-text" />
          <rect x={i % 2 ? 61 : 55} y={y + 6} width={14} height={4} rx={2} opacity={0.25} className="fill-viz-text" />
        </g>
      ))}

      {clusters.map((cy, i) => (
        <g key={cy}>
          <circle
            cx={192}
            cy={cy}
            r={24}
            strokeOpacity={i === 1 ? 0.7 : 1}
            className={cn("fill-viz-node", i === 1 ? "stroke-viz-cyan" : "stroke-viz-stroke")}
          />
          <circle cx={184} cy={cy - 6} r={2.6} opacity={0.9} className="fill-viz-cyan" />
          <circle cx={198} cy={cy - 8} r={2.6} opacity={0.6} className="fill-viz-cyan" />
          <circle cx={190} cy={cy + 5} r={2.6} opacity={0.75} className="fill-viz-cyan" />
          <circle cx={202} cy={cy + 6} r={2.6} opacity={i === 2 ? 0 : 0.7} className="fill-viz-violet" />
          <path d={`M216 ${cy} H262`} className="stroke-viz-stroke" />
        </g>
      ))}

      <ClaimRow y={66} kind="confirmed" />
      <ClaimRow y={125} kind="single" />
      <ClaimRow y={184} kind="disputed" />

      {[78, 137, 196].map((y) => (
        <g key={y}>
          <path d={`M362 ${y} C 376 ${y}, 374 116, 386 116`} fill="none" stroke="url(#intellicast-flow-v)" strokeWidth="1" />
          <path d={`M362 ${y} C 376 ${y}, 374 172, 386 172`} fill="none" stroke="url(#intellicast-flow-v)" strokeWidth="1" opacity={0.6} />
        </g>
      ))}

      {waveA.map((h, i) => (
        <rect key={`a${i}`} x={390 + i * 6} y={116 - h / 2} width={3} height={h} rx={1.5} opacity={0.85} className="fill-viz-cyan" />
      ))}
      {waveB.map((h, i) => (
        <rect key={`b${i}`} x={390 + i * 6} y={172 - h / 2} width={3} height={h} rx={1.5} opacity={0.85} className="fill-viz-violet" />
      ))}
      <Label x={390} y={95}>HOST A</Label>
      <Label x={390} y={151}>HOST B</Label>
      <Label x={390} y={214}>EN · FR</Label>
    </g>
  );
}

function ClaimRow({ y, kind }: { y: number; kind: "confirmed" | "single" | "disputed" }) {
  // Full class names so Tailwind can see them at build time.
  const tone =
    kind === "confirmed"
      ? "fill-ok stroke-ok"
      : kind === "single"
        ? "fill-warn stroke-warn"
        : "fill-viz-violet stroke-viz-violet";
  return (
    <g>
      <rect x={262} y={y} width={100} height={24} rx={6} className="fill-viz-node stroke-viz-stroke" />
      <circle cx={276} cy={y + 12} r={7} fillOpacity={0.14} strokeOpacity={0.8} className={tone} />
      {kind === "confirmed" && <Check x={272.5} y={y + 12} />}
      {kind === "single" && (
        <text x={276} y={y + 15.5} fontSize="9.5" textAnchor="middle" className="fill-warn">
          1
        </text>
      )}
      {kind === "disputed" && (
        <path
          d={`M272 ${y + 10} h8 M272 ${y + 14} h8 M278 ${y + 7} l-4 10`}
          strokeWidth={1.3}
          strokeLinecap="round"
          className="stroke-viz-violet"
        />
      )}
      <rect x={290} y={y + 7} width={52} height={4} rx={2} opacity={0.5} className="fill-viz-text" />
      <rect x={290} y={y + 14} width={34} height={4} rx={2} opacity={0.25} className="fill-viz-text" />
    </g>
  );
}

/* ------------------------------------------------------------------ */

function AtlasVisual() {
  const researchers = [52, 102, 152, 202];
  const progress = [44, 30, 56, 38];
  return (
    <g>
      <Label x={24} y={28}>PLAN</Label>
      <Label x={150} y={28}>RESEARCH × N</Label>
      <Label x={278} y={28}>SYNTHESIZE</Label>
      <Label x={392} y={28}>CRITIC</Label>

      {researchers.map((y) => (
        <g key={y}>
          <path d={`M102 136 C 128 136, 124 ${y + 14}, 150 ${y + 14}`} fill="none" stroke="url(#atlas-flow)" strokeWidth="1" />
          <path d={`M246 ${y + 14} C 264 ${y + 14}, 260 136, 278 136`} fill="none" stroke="url(#atlas-flow)" strokeWidth="1" />
        </g>
      ))}

      <Node x={24} y={120} w={78} h={32} label="planner" />

      {researchers.map((y, i) => {
        const faulted = i === 1;
        return (
          <g key={y}>
            <rect
              x={150}
              y={y}
              width={96}
              height={28}
              rx={7}
              strokeDasharray={faulted ? "3 3" : undefined}
              className={cn("fill-viz-node", faulted ? "stroke-viz-violet" : "stroke-viz-stroke")}
            />
            <text x={160} y={y + 17.5} fontSize="9.5" className={faulted ? "fill-viz-violet" : "fill-viz-text"}>
              r{i + 1}
            </text>
            <rect x={178} y={y + 12} width={56} height={4} rx={2} className="fill-viz-faint" />
            <rect
              x={178}
              y={y + 12}
              width={progress[i]}
              height={4}
              rx={2}
              opacity={0.75}
              className={faulted ? "fill-viz-violet" : "fill-viz-cyan"}
            />
          </g>
        );
      })}

      <Node x={278} y={120} w={86} h={32} label="synthesizer" />
      <path d="M364 136 H392" className="stroke-viz-stroke" />
      <Node x={392} y={120} w={64} h={32} label="critic" stroke="stroke-viz-cyan" />

      <path
        d="M424 120 C 424 58, 300 52, 250 108"
        fill="none"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        markerEnd="url(#atlas-arrow)"
        className="stroke-viz-violet"
      />
      <Label x={330} y={68} className="fill-viz-violet">TARGETED RETRY</Label>

      <path d="M424 152 V180" className="stroke-viz-stroke" />
      <circle cx={424} cy={190} r={10} fillOpacity={0.12} strokeOpacity={0.7} className="fill-ok stroke-ok" />
      <Check x={419.5} y={190} />
      <Label x={424} y={218} anchor="middle">CITED</Label>
      <Label x={24} y={244}>≤ 2 ROUNDS · TOKEN BUDGET ENFORCED</Label>
    </g>
  );
}

/* ------------------------------------------------------------------ */

function FraudVisual() {
  const ticks = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const opacities = [0.9, 0.35, 0.6, 0.2, 0.75, 0.45, 0.3, 0.85, 0.5, 0.25, 0.65];
  const forest: [number, number][] = [
    [232, 128],
    [214, 144],
    [250, 144],
    [205, 160],
    [223, 160],
    [241, 160],
    [259, 160],
  ];
  return (
    <g>
      <Label x={24} y={28}>TXNS</Label>
      <Label x={96} y={28}>44 FEATURES</Label>
      <Label x={196} y={28}>DETECTORS</Label>
      <Label x={318} y={28}>XGBOOST</Label>
      <Label x={400} y={28}>P(FRAUD)</Label>

      {ticks.map((i) => (
        <g key={i}>
          <path
            d={`M60 ${52 + i * 20} C 84 ${52 + i * 20}, 82 136, 104 136`}
            fill="none"
            stroke="url(#fraud-flow)"
            strokeWidth="0.9"
          />
          <rect
            x={24}
            y={48 + i * 20}
            width={36}
            height={8}
            rx={2.5}
            opacity={i === 5 ? 0.85 : 0.3}
            className={i === 5 ? "fill-warn" : "fill-viz-text"}
          />
        </g>
      ))}

      {Array.from({ length: 44 }, (_, i) => (
        <rect
          key={i}
          x={104 + (i % 4) * 7}
          y={98 + Math.floor(i / 4) * 7}
          width={5}
          height={5}
          rx={1}
          opacity={opacities[i % opacities.length]}
          className="fill-viz-cyan"
        />
      ))}

      <path d="M132 136 C 160 136, 168 78, 196 78" fill="none" stroke="url(#fraud-flow)" />
      <path d="M132 136 C 160 136, 172 146, 204 146" fill="none" stroke="url(#fraud-flow)" />
      <path d="M132 136 C 160 136, 168 214, 196 214 H300" fill="none" strokeDasharray="3 4" className="stroke-viz-stroke" />

      <path d="M196 58 L228 70 V86 L196 98 Z" strokeOpacity={0.6} className="fill-viz-node stroke-viz-cyan" />
      <rect x={229} y={73} width={6} height={10} rx={1.5} opacity={0.8} className="fill-viz-cyan" />
      <path d="M236 70 L268 58 V98 L236 86 Z" strokeOpacity={0.6} className="fill-viz-node stroke-viz-cyan" />
      <Label x={232} y={113} anchor="middle">AUTOENCODER</Label>

      <path
        d="M232 128 L214 144 M232 128 L250 144 M214 144 L205 160 M214 144 L223 160 M250 144 L241 160 M250 144 L259 160"
        fill="none"
        strokeOpacity={0.75}
        className="stroke-viz-violet"
      />
      {forest.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={2.6} className={x === 259 ? "fill-warn" : "fill-viz-violet"} />
      ))}
      <Label x={232} y={178} anchor="middle">ISOLATION FOREST</Label>
      <Label x={248} y={206} anchor="middle">SCALED FEATURES</Label>

      <path d="M268 78 C 296 78, 294 136, 318 136" fill="none" stroke="url(#fraud-flow)" />
      <path d="M262 146 C 290 146, 294 136, 318 136" fill="none" stroke="url(#fraud-flow)" />
      <path d="M300 214 C 312 214, 306 136, 318 136" fill="none" strokeDasharray="3 4" className="stroke-viz-stroke" />

      <Node x={318} y={112} w={64} h={48} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${332 + i * 18} ${124} l-7 18 h14 z`}
          fillOpacity={0.1 + i * 0.12}
          strokeOpacity={0.7}
          className="fill-viz-cyan stroke-viz-cyan"
        />
      ))}
      <path d="M382 136 H398" className="stroke-viz-stroke" />

      <path d="M402 168 A 32 32 0 0 1 466 168" fill="none" strokeWidth={6} strokeLinecap="round" className="stroke-viz-faint" />
      <path d="M402 168 A 32 32 0 0 1 455 145" fill="none" strokeWidth={6} strokeLinecap="round" opacity={0.85} className="stroke-viz-cyan" />
      <path d="M434 168 L456 150" strokeWidth={1.6} strokeLinecap="round" className="stroke-viz-ink" />
      <circle cx={434} cy={168} r={3} className="fill-viz-ink" />
      <path d="M461 140 l6 -5" strokeWidth={1.6} strokeLinecap="round" className="stroke-warn" />
      <Label x={434} y={190} anchor="middle">THRESHOLD</Label>
    </g>
  );
}

/* ------------------------------------------------------------------ */

const FILLED = new Set([
  "0-2", "0-9", "1-4", "1-12", "2-7", "3-1", "3-14", "4-3", "4-10", "5-6",
  "6-0", "6-12", "7-4", "7-9", "8-2", "8-15", "9-7", "9-11", "1-9", "7-12",
]);

function RecsysVisual() {
  const cols = 16;
  const rows = 10;
  const target = 4;
  const neighbors = [1, 7];
  const bars = [128, 112, 98, 86, 74, 62];
  return (
    <g>
      <Label x={24} y={28}>USER × ITEM</Label>
      <Label x={300} y={28}>RANKED TOP-10</Label>

      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const filled = FILLED.has(`${r}-${c}`);
          const highlighted = r === target || neighbors.includes(r);
          return (
            <rect
              key={`${r}-${c}`}
              x={30 + c * 13}
              y={50 + r * 13}
              width={9}
              height={9}
              rx={2}
              fillOpacity={filled ? (highlighted ? 0.9 : 0.45) : 0}
              className={
                filled
                  ? neighbors.includes(r)
                    ? "fill-viz-violet"
                    : "fill-viz-cyan"
                  : "fill-transparent stroke-viz-faint"
              }
            />
          );
        }),
      )}
      <rect
        x={26}
        y={50 + target * 13 - 3}
        width={cols * 13 + 2}
        height={15}
        rx={4}
        fill="none"
        strokeOpacity={0.8}
        className="stroke-viz-cyan"
      />
      {neighbors.map((r) => (
        <circle key={r} cx={20} cy={54.5 + r * 13} r={2.4} className="fill-viz-violet" />
      ))}
      <circle cx={20} cy={54.5 + target * 13} r={2.4} className="fill-viz-cyan" />
      <Label x={30} y={200}>0.195% DENSE · K-CORE FILTERED</Label>

      <path d="M244 109 H286" stroke="url(#recsys-flow)" strokeWidth="1.2" />
      <path d="M282 105 l5 4 -5 4" fill="none" strokeOpacity={0.8} className="stroke-viz-cyan" />

      {bars.map((w, i) => {
        const y = 48 + i * 22;
        const hit = i === 2;
        return (
          <g key={y}>
            <text x={300} y={y + 11} fontSize="9.5" className="fill-viz-text">
              {i + 1}
            </text>
            <rect
              x={316}
              y={y + 2}
              width={w}
              height={12}
              rx={3}
              fillOpacity={hit ? 0.3 : 0.12}
              strokeOpacity={hit ? 0.8 : 1}
              className={hit ? "fill-ok stroke-ok" : "fill-viz-cyan stroke-viz-stroke"}
            />
            {hit && <Check x={316 + w + 8} y={y + 8} />}
          </g>
        );
      })}
      <Label x={300} y={200}>HR@10 · NDCG · MRR</Label>
    </g>
  );
}

/* ------------------------------------------------------------------ */

function ChurnVisual() {
  const segments = [
    { x: 24, y: 44, w: 110, h: 76, tone: "fill-viz-cyan", o: 0.2, label: "555" },
    { x: 138, y: 44, w: 86, h: 50, tone: "fill-viz-violet", o: 0.2, label: "155" },
    { x: 138, y: 98, w: 86, h: 22, tone: "fill-viz-text", o: 0.12, label: "343" },
    { x: 24, y: 124, w: 70, h: 66, tone: "fill-viz-text", o: 0.12, label: "211" },
    { x: 98, y: 124, w: 60, h: 66, tone: "fill-warn", o: 0.14, label: "151" },
    { x: 162, y: 124, w: 62, h: 30, tone: "fill-viz-cyan", o: 0.1, label: "432" },
    { x: 162, y: 158, w: 62, h: 32, tone: "fill-viz-text", o: 0.08, label: "111" },
  ];
  const points = [
    [262, 150], [278, 138], [294, 142], [310, 120], [326, 128], [342, 104], [358, 112], [374, 96], [390, 104],
  ];
  const projected = [[390, 104], [406, 98], [422, 108], [438, 100], [454, 110]];
  return (
    <g>
      <Label x={24} y={28}>RFM SEGMENTS</Label>
      <Label x={262} y={28}>TEMPORAL SPLIT</Label>

      {segments.map((s) => (
        <g key={s.label}>
          <rect
            x={s.x}
            y={s.y}
            width={s.w}
            height={s.h}
            rx={6}
            fillOpacity={s.o}
            className={cn(s.tone, "stroke-viz-stroke")}
          />
          <text x={s.x + 8} y={s.y + 15} fontSize="9.5" opacity={0.85} className="fill-viz-ink">
            {s.label}
          </text>
        </g>
      ))}
      <Label x={24} y={210}>R · F · M SCORES</Label>

      <rect x={262} y={44} width={128} height={146} fillOpacity={0.05} className="fill-viz-cyan" />
      <rect x={390} y={44} width={66} height={146} fillOpacity={0.07} className="fill-viz-violet" />
      <path d="M262 190 H456" className="stroke-viz-stroke" />
      {[262, 294, 326, 358, 390, 422, 454].map((x) => (
        <path key={x} d={`M${x} 190 v4`} className="stroke-viz-stroke" />
      ))}
      <polyline
        points={points.map((p) => p.join(",")).join(" ")}
        fill="none"
        strokeWidth={1.5}
        strokeLinejoin="round"
        className="stroke-viz-cyan"
      />
      <polyline
        points={projected.map((p) => p.join(",")).join(" ")}
        fill="none"
        strokeWidth={1.5}
        strokeDasharray="3 3"
        className="stroke-viz-violet"
      />
      {points.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={2.2} className="fill-viz-cyan" />
      ))}
      <path d="M390 40 V194" strokeOpacity={0.6} strokeDasharray="2 3" className="stroke-viz-ink" />
      <Label x={326} y={210} anchor="middle">TRAIN</Label>
      <Label x={423} y={210} anchor="middle">TEST</Label>
    </g>
  );
}

const VISUALS: Record<VisualKey, ReactNode> = {
  intellicast: <IntelliCastVisual />,
  atlas: <AtlasVisual />,
  fraud: <FraudVisual />,
  recsys: <RecsysVisual />,
  churn: <ChurnVisual />,
};
