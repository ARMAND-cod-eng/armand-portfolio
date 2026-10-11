import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectLinks } from "@/components/projects/project-links";
import { StatusBadge } from "@/components/projects/status-badge";
import { TagList } from "@/components/ui/tag";
import { moreProjects } from "@/data/projects";
import type { Project } from "@/data/types";

export function MoreWork({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const itemHeading = headingLevel === "h2" ? "h3" : "h4";
  return (
    <section className="mt-24" aria-labelledby="more-work-title">
      <div className="reveal flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <Heading
          id="more-work-title"
          className="text-xl font-semibold tracking-tight text-ink sm:text-2xl"
        >
          More engineering &amp; data science work
        </Heading>
        <p className="text-sm text-muted">Each one has its own write-up — select a project to read it.</p>
      </div>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {moreProjects.map((project) => (
          <li key={project.slug} className="reveal">
            <SideProjectRow project={project} headingLevel={itemHeading} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Compact project row; the whole row opens the project page, external links stay separate. */
export function SideProjectRow({
  project,
  headingLevel: Heading = "h4",
}: {
  project: Project;
  headingLevel?: "h3" | "h4";
}) {
  const tags = project.tags ?? project.stack.slice(0, 4);
  return (
    <article className="group relative grid gap-4 rounded-xl py-6 transition-colors md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] md:gap-8 md:px-3 md:hover:bg-fill has-[.row-link:focus-visible]:outline-2 has-[.row-link:focus-visible]:outline-accent">
      <div>
        <Heading className="text-[15px] font-medium tracking-tight text-ink">
          <Link
            href={`/projects/${project.slug}`}
            className="row-link outline-none after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </Heading>
        <StatusBadge status={project.status} className="mt-2" />
      </div>
      <div>
        <p className="text-sm leading-relaxed text-pretty text-muted">{project.tagline}</p>
        <TagList items={tags} className="mt-3" label="Technologies" />
        <p className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-accent-soft">
          Read the write-up
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </p>
      </div>
      <ProjectLinks links={project.links} className="md:justify-end md:self-start" />
    </article>
  );
}
