/**
 * Content model for the portfolio. Everything a visitor reads comes from
 * typed data in `src/data`, so copy, metrics and links can be updated
 * without touching components.
 *
 * Accuracy rule: every metric here must trace back to a public repository,
 * notebook or documented measurement. Leave a field out rather than guess.
 */

export type FilterKey = "agentic" | "retrieval" | "ml" | "data-science";

export type StatusKind = "live" | "building" | "complete";

export interface ProjectStatus {
  kind: StatusKind;
  /** Short visitor-facing label, e.g. "Live · Early access". */
  label: string;
}

export type LinkKind = "github" | "live" | "kaggle";

export interface ExternalLink {
  kind: LinkKind;
  label: string;
  href: string;
}

export interface Metric {
  value: string;
  label: string;
  /** Context that keeps the number honest (dataset, setup, caveat). */
  note?: string;
}

export interface PipelineNode {
  title: string;
  detail?: string;
}

export interface PipelineStage {
  label: string;
  nodes: PipelineNode[];
  /** Marks work that is designed but not built yet. */
  planned?: boolean;
}

export interface PipelineLoop {
  /** Index of the stage that sends work back. */
  from: number;
  /** Index of the stage that receives it. */
  to: number;
  label: string;
}

export interface Architecture {
  caption: string;
  stages: PipelineStage[];
  loop?: PipelineLoop;
}

export interface Titled {
  title: string;
  body: string;
  /** Optional link to the work itself (e.g. a notebook folder). */
  href?: string;
}

export interface ResultsTable {
  caption: string;
  columns: string[];
  rows: string[][];
  /** Row index to emphasize (e.g. the best system). */
  highlightRow?: number;
}

export interface Availability {
  live: string[];
  rollingOut: string[];
  next: string[];
}

/* ------------------------------------------------------------------ */
/*  Charts — native, theme-aware, built from verified numbers.         */
/* ------------------------------------------------------------------ */

export interface BarDatum {
  label: string;
  value: number;
  /** Formatted value shown at the bar tip, e.g. "23.3 s". */
  display: string;
  /** Highlighted entity; the rest render in the de-emphasis gray. */
  emphasis?: boolean;
  note?: string;
}

export interface BarsChart {
  kind: "bars";
  title: string;
  subtitle?: string;
  data: BarDatum[];
  /** Domain maximum; defaults to the largest value. Bars always start at 0. */
  max?: number;
  reference?: { value: number; label: string };
}

export interface PairedChart {
  kind: "paired";
  title: string;
  subtitle?: string;
  series: [string, string];
  groups: { label: string; values: [number, number]; display: [string, string]; max: number }[];
}

export interface ShareChart {
  kind: "share";
  title: string;
  subtitle?: string;
  segments: [string, string];
  rows: { label: string; values: [number, number] }[];
}

export interface ConfusionChart {
  kind: "confusion";
  title: string;
  subtitle?: string;
  /** Rows are actual classes, columns predicted. */
  labels: [string, string];
  cells: { tn: number; fp: number; fn: number; tp: number };
}

export type ChartSpec = BarsChart | PairedChart | ShareChart | ConfusionChart;

export interface ChartGroup {
  id: string;
  title: string;
  description?: string;
  /** Where the numbers come from. */
  source: string;
  charts: ChartSpec[];
}

export interface Figure {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  /** Link to the original file in the public repository. */
  sourceUrl: string;
}

/* ------------------------------------------------------------------ */

export interface CaseStudy {
  overview: string;
  motivation: string;
  role: string[];
  /** Optional status note shown near the top (what is and isn't built). */
  statusNote?: string;
  availability?: Availability;
  architecture?: Architecture;
  implementation: Titled[];
  /** Heading for the implementation section (defaults to "Technical implementation"). */
  implementationTitle?: string;
  decisions?: Titled[];
  evaluation?: {
    intro: string;
    metrics: Metric[];
    table?: ResultsTable;
    notes: string[];
  };
  lessons?: Titled[];
}

export type VisualKey = "intellicast" | "atlas" | "fraud" | "recsys" | "churn";

export type ProjectTier = "featured" | "more";

export interface Project {
  slug: string;
  tier: ProjectTier;
  title: string;
  subtitle?: string;
  category: string;
  filters: FilterKey[];
  status: ProjectStatus;
  /** One-sentence value proposition (also the list description for "more" projects). */
  tagline: string;
  problem: string;
  approach: string;
  highlights: string[];
  stack: string[];
  /** Short tag list for compact rows; defaults to the first stack items. */
  tags?: string[];
  /** Verified results only; shown on cards and as "Key results" (max three). */
  metrics: Metric[];
  links: ExternalLink[];
  /** Shown when there is intentionally no public code link. */
  linkNote?: string;
  visual?: VisualKey;
  seoDescription: string;
  charts?: ChartGroup[];
  figures?: Figure[];
  caseStudy: CaseStudy;
}


export interface ExperienceItem {
  role: string;
  organization: string;
  context: string;
  period: string;
  summary: string;
  bullets: string[];
  tags: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  skills: string[];
}
