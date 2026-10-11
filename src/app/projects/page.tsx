import type { Metadata } from "next";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { SideProjectRow } from "@/components/sections/more-work";
import { Container } from "@/components/ui/container";
import { Emphasis } from "@/components/ui/section-heading";
import { featuredProjects, moreProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Agentic AI, retrieval, machine learning and data science projects by Armand Junior Dongmo Notue — with case studies, verified results and links to code.",
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects" },
};

export default function ProjectsPage() {
  return (
    <Container className="pt-14 pb-24 sm:pt-20 sm:pb-32">
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Projects</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-balance text-ink sm:text-5xl">
          Everything I&apos;ve built, <Emphasis>in one place.</Emphasis>
        </h1>
        <p className="mt-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
          Featured case studies first, then smaller projects and work in progress. Filter by the
          kind of system you care about.
        </p>
      </header>

      <div className="mt-12">
        <ProjectExplorer
          featured={featuredProjects.map((project, index) => ({
            id: project.slug,
            filters: project.filters,
            node: <ProjectCard project={project} index={index} headingLevel="h2" />,
          }))}
          more={moreProjects.map((project) => ({
            id: project.slug,
            filters: project.filters,
            node: <SideProjectRow project={project} headingLevel="h3" />,
          }))}
          moreHeading={
            <h2 id="more-work-title" className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              More engineering &amp; data science work
            </h2>
          }
        />
      </div>
    </Container>
  );
}
