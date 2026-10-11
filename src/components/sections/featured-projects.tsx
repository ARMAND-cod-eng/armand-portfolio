import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Emphasis, SectionHeading } from "@/components/ui/section-heading";
import { featuredProjects } from "@/data/projects";
import { MoreWork } from "./more-work";

export function FeaturedProjects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="projects-title"
            index="01"
            eyebrow="Featured projects"
            title={
              <>
                Systems I&apos;ve designed, built and <Emphasis>measured.</Emphasis>
              </>
            }
            description="Independent projects with public code or a live product. Results are reported as measured, with the caveats that keep them honest."
          />
          <ButtonLink href="/projects" size="sm" className="reveal self-start md:self-auto">
            All projects
            <ArrowRight className="size-3.5" aria-hidden />
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <li key={project.slug} className={index === 0 ? "reveal lg:col-span-2" : "reveal"}>
              <ProjectCard project={project} index={index} variant={index === 0 ? "feature" : "standard"} />
            </li>
          ))}
        </ul>

        <MoreWork />
      </Container>
    </section>
  );
}
