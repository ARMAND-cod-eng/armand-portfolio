import { profile } from "@/data/profile";

/** The site's own domain — canonical links, the sitemap and social cards use it. */
export const PRODUCTION_URL = "https://www.armandnotue.com";

/**
 * The canonical site URL: NEXT_PUBLIC_SITE_URL if set, the custom domain on
 * any Vercel deployment, otherwise localhost for development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  if (process.env.VERCEL_ENV) return PRODUCTION_URL;

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
