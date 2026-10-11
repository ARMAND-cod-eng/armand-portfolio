import { profile } from "@/data/profile";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = `${profile.name} — ${profile.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: `${profile.role} · ${profile.location}`,
    title: `${profile.headline.lead} ${profile.headline.emphasis}`,
    subtitle:
      "LLM applications, multi-agent systems, retrieval and machine learning — built with evaluation, reliability and deployment in mind.",
  });
}
