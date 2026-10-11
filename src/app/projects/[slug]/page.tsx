import { ArrowLeft, ArrowRight, ArrowUpRight, CircleCheck, CircleDashed, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ChartGroup } from "@/components/charts/chart-group";
import { CaseStudyToc, type TocItem } from "@/components/projects/case-study-toc";
import { FigureGallery } from "@/components/projects/figure-gallery";
import { MetricGrid, MetricList } from "@/components/projects/metric-list";
import { PipelineDiagram } from "@/components/projects/pipeline-diagram";
import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectVisual } from "@/components/projects/project-visual";
import { StatusBadge } from "@/components/projects/status-badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { TagList } from "@/components/ui/tag";
import { profile } from "@/data/profile";
import { allProjects, getAdjacentProjects, getProject } from "@/data/projects";
import type { Availability, Figure, Project, ResultsTable, Titled } from "@/data/types";
import { projectJsonLd, serializeJsonLd } from "@/lib/json-ld";

export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = project.subtitle ? `${project.title} — ${project.subtitle}` : project.title;
  return {
    title,
    description: project.seoDescription,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.seoDescription,
      url: `/projects/${project.slug}`,
    },
    twitter: { card: "summary_large_image", title, description: project.seoDescription },
  };
}

function hasResults(project: Project) {
  return Boolean(project.caseStudy.evaluation || project.charts?.length);
}

function tocFor(project: Project): TocItem[] {
  const study = project.caseStudy;
  const items: (TocItem | false | undefined)[] = [
    { id: "overview", label: "Overview" },
    study.availability && { id: "status", label: "What's live" },
    { id: "motivation", label: "Problem & motivation" },
    { id: "role", label: "My role" },
    study.architecture && { id: "architecture", label: "Architecture" },
    { id: "implementation", label: study.implementationTitle ?? "Implementation" },
    study.decisions?.length ? { id: "decisions", label: "Decisions & challenges" } : false,
    hasResults(project) && { id: "evaluation", label: "Evaluation & results" },
    project.figures?.length ? { id: "figures", label: "Notebook figures" } : false,
    study.lessons?.length ? { id: "lessons", label: "Lessons learned" } : false,
    { id: "stack", label: "Technologies" },
  ];
  return items.filter((item): item is TocItem => Boolean(item));
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const study = project.caseStudy;
  const toc = tocFor(project);
  const { previous, next } = getAdjacentProjects(project.slug);
  const indexOf = (id: string) => String(toc.findIndex((item) => item.id === id) + 1).padStart(2, "0");
  const leadFigure = project.figures?.[0];

  return (
    <article aria-labelledby="case-study-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectJsonLd(project)) }}
      />

      {/* Header */}
      <Container className="pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-mono text-xs text-faint">
            <li>
              <Link href="/projects" className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
                <ArrowLeft className="size-3.5" aria-hidden />
                Projects
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="truncate text-ink-2">
              {project.title}
            </li>
          </ol>
        </nav>

        <header className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="hero-enter">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{project.category}</p>
            <h1
              id="case-study-title"
              className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-balance text-ink sm:text-5xl"
            >
              {project.title}
              {project.subtitle && <span className="sr-only"> — </span>}
              {project.subtitle && (
                <span className="mt-2 block text-xl font-normal tracking-tight text-muted sm:text-2xl">
                  {project.subtitle}
                </span>
              )}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-pretty text-ink-2">{project.tagline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <ProjectLinks links={project.links} size="md" />
            </div>
            {project.linkNote && <p className="mt-3 text-sm text-faint">{project.linkNote}</p>}
          </div>
          <div className="hero-enter">
            {project.visual ? (
              <ProjectVisual visual={project.visual} />
            ) : leadFigure ? (
              <LeadFigure figure={leadFigure} />
            ) : (
              <FactsCard project={project} />
            )}
          </div>
        </header>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          <div className="bg-surface p-5 sm:p-6">
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Problem</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{project.problem}</dd>
          </div>
          <div className="bg-surface p-5 sm:p-6">
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">Approach</dt>
            <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">{project.approach}</dd>
          </div>
        </dl>

        {project.metrics.length > 0 && (
          <section aria-label="Key results" className="mt-4">
            <p className="sr-only">Key results</p>
            <MetricList metrics={project.metrics} />
          </section>
        )}
      </Container>

      {/* Body */}
      <Container className="grid gap-12 pt-16 pb-24 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16 lg:pt-20">
        <aside className="hidden lg:block">
          <CaseStudyToc items={toc} />
        </aside>

        <div className="min-w-0 max-w-3xl space-y-20">
          <CaseSection id="overview" index={indexOf("overview")} title="Overview">
            <Prose>{study.overview}</Prose>
            {study.statusNote && (
              <p className="mt-6 flex gap-3 rounded-2xl border border-warn/25 bg-warn/[0.05] p-4 text-sm leading-relaxed text-ink-2">
                <Clock className="mt-0.5 size-4 shrink-0 text-warn" aria-hidden />
                <span>{study.statusNote}</span>
              </p>
            )}
          </CaseSection>

          {study.availability && (
            <CaseSection id="status" index={indexOf("status")} title="What's live — and what isn't yet">
              <AvailabilityPanel availability={study.availability} />
            </CaseSection>
          )}

          <CaseSection id="motivation" index={indexOf("motivation")} title="Problem & motivation">
            <Prose>{study.motivation}</Prose>
          </CaseSection>

          <CaseSection id="role" index={indexOf("role")} title="My role">
            <BulletList items={study.role} />
          </CaseSection>

          {study.architecture && (
            <CaseSection id="architecture" index={indexOf("architecture")} title="System architecture">
              <PipelineDiagram architecture={study.architecture} />
            </CaseSection>
          )}

          <CaseSection
            id="implementation"
            index={indexOf("implementation")}
            title={study.implementationTitle ?? "Technical implementation"}
          >
            <TitledList items={study.implementation} />
          </CaseSection>

          {study.decisions && study.decisions.length > 0 && (
            <CaseSection id="decisions" index={indexOf("decisions")} title="Engineering decisions & challenges">
              <TitledList items={study.decisions} variant="cards" />
            </CaseSection>
          )}

          {hasResults(project) && (
            <CaseSection id="evaluation" index={indexOf("evaluation")} title="Evaluation & results">
              {study.evaluation && (
                <>
                  <Prose>{study.evaluation.intro}</Prose>
                  {study.evaluation.metrics.length > 0 && (
                    <div className="mt-6">
                      <MetricGrid metrics={study.evaluation.metrics} />
                    </div>
                  )}
                </>
              )}
              {project.charts?.map((group) => (
                <div key={group.id} className="mt-10">
                  <ChartGroup group={group} />
                </div>
              ))}
              {study.evaluation?.table && <ResultsTableView table={study.evaluation.table} />}
              {study.evaluation && study.evaluation.notes.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {study.evaluation.notes.map((note) => (
                    <li key={note} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-faint" />
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </CaseSection>
          )}

          {project.figures && project.figures.length > 0 && (
            <CaseSection id="figures" index={indexOf("figures")} title="From the notebook">
              <p className="mb-6 text-sm leading-relaxed text-muted">
                Real figures from the project&apos;s notebook, as published in the repository. Select one to enlarge
                it.
              </p>
              <FigureGallery figures={project.figures} />
            </CaseSection>
          )}

          {study.lessons && study.lessons.length > 0 && (
            <CaseSection id="lessons" index={indexOf("lessons")} title="Lessons learned">
              <TitledList items={study.lessons} />
            </CaseSection>
          )}

          <CaseSection id="stack" index={indexOf("stack")} title="Technologies used">
            <TagList items={project.stack} label={`${project.title} technologies`} />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ProjectLinks links={project.links} size="md" />
            </div>
          </CaseSection>
        </div>
      </Container>

      {/* Next / previous + contact */}
      <Container className="pb-24">
        <nav aria-label="More projects" className="grid gap-4 sm:grid-cols-2">
          <AdjacentLink project={previous} direction="previous" />
          <AdjacentLink project={next} direction="next" />
        </nav>
        <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-line bg-surface/70 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-lg font-semibold tracking-tight text-ink">Want the deeper walkthrough?</p>
            <p className="mt-1 text-sm text-muted">
              I&apos;m happy to go through the code, the trade-offs and what I&apos;d do next.
            </p>
          </div>
          <ButtonLink href={`mailto:${profile.email}?subject=${encodeURIComponent(project.title)}`} variant="primary">
            Get in touch
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </Container>
    </article>
  );
}

/* ------------------------------------------------------------------ */

function CaseSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="reveal">
      <p className="font-mono text-xs text-accent">{index}</p>
      <h2 id={`${id}-title`} className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-[1.75rem]">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <p className="text-base leading-relaxed text-pretty text-muted sm:text-[17px]">{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-relaxed text-muted">
          <span aria-hidden className="mt-[0.7rem] h-px w-4 shrink-0 bg-accent/70" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function TitledList({ items, variant = "list" }: { items: Titled[]; variant?: "list" | "cards" }) {
  if (variant === "cards") {
    return (
      <ul className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.title} className="rounded-2xl border border-line bg-surface/70 p-5 shadow-raised">
            <h3 className="text-[15px] font-semibold tracking-tight text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ol className="space-y-7">
      {items.map((item, index) => (
        <li key={item.title} className="grid gap-1 sm:grid-cols-[2.25rem_minmax(0,1fr)]">
          <span aria-hidden className="font-mono text-xs leading-7 text-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-ink sm:text-[17px]">
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                >
                  {item.title}
                  <ArrowUpRight className="size-3.5 text-faint group-hover:text-accent" aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                item.title
              )}
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function AvailabilityPanel({ availability }: { availability: Availability }) {
  const groups = [
    { title: "Live today", items: availability.live, Icon: CircleCheck, tone: "text-ok" },
    { title: "Rolling out", items: availability.rollingOut, Icon: CircleDashed, tone: "text-warn" },
    { title: "Next", items: availability.next, Icon: Clock, tone: "text-muted" },
  ];
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
      {groups.map(({ title, items, Icon, tone }) => (
        <div key={title} className="bg-surface p-5">
          <h3 className={`flex items-center gap-2 text-sm font-semibold ${tone}`}>
            <Icon className="size-4" aria-hidden />
            {title}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {items.map((item) => (
              <li key={item} className="text-[13.5px] leading-snug text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ResultsTableView({ table }: { table: ResultsTable }) {
  return (
    <div
      className="mt-6 overflow-x-auto rounded-2xl border border-line"
      role="region"
      aria-label={table.caption}
      tabIndex={0}
    >
      <table className="w-full text-left text-[13px] sm:text-sm">
        <caption className="border-b border-line px-4 py-3 text-left text-xs text-faint">{table.caption}</caption>
        <thead>
          <tr className="border-b border-line bg-surface">
            {table.columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-2.5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-faint sm:px-4"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => {
            const highlight = rowIndex === table.highlightRow;
            return (
              <tr key={row[0]} className={highlight ? "bg-accent/[0.06]" : "border-t border-line"}>
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th
                      key={cellIndex}
                      scope="row"
                      className={`px-2.5 py-3 font-medium sm:px-4 ${highlight ? "text-ink" : "text-ink-2"}`}
                    >
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={cellIndex}
                      className={`px-2.5 py-3 font-mono sm:px-4 ${highlight ? "text-accent-soft" : "text-muted"}`}
                    >
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function LeadFigure({ figure }: { figure: Figure }) {
  return (
    <a
      href="#figures"
      className="group block overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-raised"
    >
      <span className="block aspect-[16/11] overflow-hidden">
        <Image
          src={figure.src}
          width={figure.width}
          height={figure.height}
          alt={figure.alt}
          loading="eager"
          sizes="(min-width: 1024px) 560px, 92vw"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </span>
      <span className="flex items-center justify-between gap-3 border-t border-line bg-surface px-4 py-3 text-[13px] text-ink-2">
        <span className="truncate">From the notebook · {figure.caption.split(".")[0]}</span>
        <ArrowRight className="size-4 shrink-0 text-faint transition-transform group-hover:translate-x-0.5" aria-hidden />
      </span>
    </a>
  );
}

function FactsCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-raised">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">At a glance</p>
      <dl className="mt-5 space-y-4 text-sm">
        <div>
          <dt className="text-faint">Status</dt>
          <dd className="mt-1">
            <StatusBadge status={project.status} />
          </dd>
        </div>
        <div>
          <dt className="text-faint">Focus</dt>
          <dd className="mt-1 text-ink-2">{project.highlights.join(" · ")}</dd>
        </div>
        <div>
          <dt className="text-faint">Stack</dt>
          <dd className="mt-2">
            <TagList items={project.stack} />
          </dd>
        </div>
      </dl>
    </div>
  );
}

function AdjacentLink({ project, direction }: { project?: Project; direction: "previous" | "next" }) {
  if (!project) return null;
  const isNext = direction === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex flex-col gap-1 rounded-2xl border border-line p-5 transition-colors hover:border-line-strong hover:bg-fill ${isNext ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
        {!isNext && <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden />}
        {isNext ? "Next project" : "Previous project"}
        {isNext && <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />}
      </span>
      <span className="text-base font-medium text-ink">{project.title}</span>
      <span className="text-sm text-muted">{project.category}</span>
    </Link>
  );
}
