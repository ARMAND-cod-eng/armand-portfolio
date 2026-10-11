import { profile } from "@/data/profile";
import type { Project } from "@/data/types";
import { absoluteUrl, siteUrl } from "./site";

/** Serializes JSON-LD safely for an inline <script> tag. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    url: siteUrl,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    description: profile.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.locality,
      addressRegion: profile.region,
      addressCountry: profile.country,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.school,
    },
    knowsAbout: [
      "Large language models",
      "Agentic AI",
      "Retrieval-augmented generation",
      "LLM evaluation",
      "Machine learning",
      "Deep learning",
    ],
    sameAs: [profile.links.github, profile.links.linkedin, profile.links.kaggle],
  };
}

export function projectJsonLd(project: Project) {
  const repo = project.links.find((link) => link.kind === "github");
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.tagline,
    description: project.seoDescription,
    url: absoluteUrl(`/projects/${project.slug}`),
    author: { "@id": `${siteUrl}/#person` },
    keywords: project.stack.join(", "),
    ...(repo ? { sameAs: repo.href } : {}),
  };
}
