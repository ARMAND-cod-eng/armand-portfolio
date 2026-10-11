import { profile } from "@/data/profile";

/**
 * The canonical site URL. Set NEXT_PUBLIC_SITE_URL once the domain is chosen;
 * on Vercel the production deployment URL is used as a fallback.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/**
 * Only the production deployment should be indexed. Vercel preview
 * deployments (and anything else with VERCEL_ENV set) stay out of search.
 */
export const isIndexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : true;

export const siteConfig = {
  title: `${profile.name} — ${profile.role}`,
  shortTitle: profile.shortName,
  description:
    "GenAI / ML engineer in Dallas–Fort Worth building LLM applications, multi-agent systems, retrieval and machine learning — with a focus on evaluation, reliability and deployment.",
  keywords: [
    "GenAI engineer",
    "ML engineer",
    "LLM engineer",
    "AI engineer",
    "agentic AI",
    "LangGraph",
    "RAG",
    "machine learning",
    "Dallas–Fort Worth",
  ],
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteUrl}/`).toString();
}
