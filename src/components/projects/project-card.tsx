import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/data/types";
import { cn } from "@/lib/cn";
import { MetricList } from "./metric-list";
import { ProjectLinks } from "./project-links";
import { ProjectVisual } from "./project-visual";
import { StatusBadge } from "./status-badge";

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: "feature" | "standard";
  headingLevel?: "h3" | "h2";
}

const MAX_TAGS = 7;

export function ProjectCard({
  project,
  index,
  variant = "standard",
  headingLevel: Heading = "h3",
}: ProjectCardProps) {
  const headingId = `project-${project.slug}-title`;
  const isFeature = variant === "feature";
  const extraTags = project.stack.length - MAX_TAGS;

  return (
    <SpotlightCard
      as="article"
      aria-labelledby={headingId}
      className={cn(
        "group h-full rounded-3xl border border-line bg-surface/80 shadow-raised transition-[border-color] duration-300 hover:border-line-strong",
        "has-[.card-link:focus-visible]:outline-2 has-[.card-link:focus-visible]:outline-offset-4 has-[.card-link:focus-visible]:outline-accent",
      )}
    >
      <div
        className={cn(
          "flex h-full flex-col gap-7 p-5 sm:p-7",
          isFeature && "lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:p-9",
        )}
      >
        <div className={cn("order-2 flex flex-1 flex-col", isFeature && "lg:order-1")}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-xs text-faint">{String(index + 1).padStart(2, "0")}</span>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-accent/90">
            {project.category}
          </p>
          <Heading
            id={headingId}
            className={cn(
              "mt-2 font-semibold tracking-[-0.02em] text-ink",
              isFeature ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
            )}
          >
            {project.title}
            {project.subtitle && <span className="sr-only"> — </span>}
            {project.subtitle && (
              <span className="mt-1 block text-base font-normal tracking-tight text-muted sm:text-lg">
                {project.subtitle}
              </span>
            )}
          </Heading>
          <p className="mt-3 text-[15px] leading-relaxed text-pretty text-ink-2">{project.tagline}</p>

          <dl className="mt-5 grid gap-3 text-sm leading-relaxed sm:grid-cols-2 sm:gap-5">
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Problem</dt>
              <dd className="mt-1.5 text-muted">{project.problem}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Approach</dt>
              <dd className="mt-1.5 text-muted">{project.approach}</dd>
            </div>
          </dl>

          <MetricList metrics={project.metrics} className="mt-6" />

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Key technologies">
            {project.stack.slice(0, MAX_TAGS).map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
            {extraTags > 0 && (
              <li>
                <Tag className="text-faint">+{extraTags} more</Tag>
              </li>
            )}
          </ul>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
            <Link
              href={`/projects/${project.slug}`}
              className="card-link inline-flex items-center gap-1.5 text-sm font-medium text-ink outline-none after:absolute after:inset-0 after:rounded-3xl after:content-['']"
            >
              View case study
              <ArrowRight
                className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
            <div className="flex flex-col items-start gap-1.5 sm:items-end">
              <ProjectLinks links={project.links} />
              {project.linkNote && (
                <p className="relative z-10 text-[11.5px] text-faint">{project.linkNote}</p>
              )}
            </div>
          </div>
        </div>

        {project.visual && (
          <ProjectVisual
            visual={project.visual}
            className={cn(
              "order-1 transition-transform duration-500 ease-out group-hover:-translate-y-0.5",
              isFeature && "lg:order-2",
            )}
          />
        )}
      </div>
    </SpotlightCard>
  );
}
