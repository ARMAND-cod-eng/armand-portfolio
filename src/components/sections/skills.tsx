import {
  BrainCircuit,
  ChartLine,
  Database,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Emphasis, SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/data/skills";

const ICONS: Record<string, LucideIcon> = {
  llm: Sparkles,
  ml: BrainCircuit,
  backend: Database,
  infra: Server,
  analytics: ChartLine,
};

const principles = [
  "Evaluate before scaling",
  "Measure, then claim",
  "Degrade visibly, never silently",
  "Verify against live systems",
];

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-line py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="skills-title"
          index="03"
          eyebrow="Skills"
          title={
            <>
              A toolkit organized by <Emphasis>what it&apos;s for.</Emphasis>
            </>
          }
          description="The tools I reach for across the lifecycle of an AI system — grouped by purpose, not ranked by percentage."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = ICONS[group.id] ?? Sparkles;
            return (
              <li
                key={group.id}
                className="reveal flex flex-col rounded-2xl border border-line bg-surface/70 p-6 shadow-raised"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl border border-line-strong bg-canvas text-accent">
                    <Icon className="size-[18px]" aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight text-ink">{group.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted">{group.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-x-1.5 gap-y-2" aria-label={`${group.title} skills`}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-lg border border-line bg-fill px-2.5 py-1 text-[13px] text-ink-2"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}

          <li className="reveal flex flex-col justify-between rounded-2xl border border-dashed border-line-strong p-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                How I work
              </p>
              <ul className="mt-4 space-y-3">
                {principles.map((principle, index) => (
                  <li key={principle} className="flex items-baseline gap-3 text-[15px] text-ink-2">
                    <span className="font-mono text-xs text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-faint">
              Every case study documents what was measured, what broke, and what is still in
              progress.
            </p>
          </li>
        </ul>
      </Container>
    </section>
  );
}
