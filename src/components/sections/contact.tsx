import { ArrowUpRight, FileText, Globe, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { GitHubIcon, KaggleIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { Emphasis } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";

const channels: { label: string; handle: string; href: string; icon: ReactNode }[] = [
  {
    label: "LinkedIn",
    handle: profile.handles.linkedin,
    href: profile.links.linkedin,
    icon: <LinkedInIcon size={18} />,
  },
  {
    label: "GitHub",
    handle: profile.handles.github,
    href: profile.links.github,
    icon: <GitHubIcon size={18} />,
  },
  {
    label: "IntelliCast",
    handle: profile.handles.intellicast,
    href: profile.links.intellicast,
    icon: <Globe className="size-[18px]" aria-hidden />,
  },
  {
    label: "Kaggle",
    handle: profile.handles.kaggle,
    href: profile.links.kaggle,
    icon: <KaggleIcon size={18} />,
  },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-24 sm:py-32">
      <Container>
        <div className="reveal relative overflow-hidden rounded-[2rem] border border-line bg-surface/80 px-6 py-14 shadow-raised sm:px-12 sm:py-20">
          <div aria-hidden className="absolute inset-0 bg-grid mask-fade-top opacity-70" />
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow-cyan),transparent)]"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              <span className="text-faint">05</span>&nbsp;&nbsp;—&nbsp;&nbsp;Contact
            </p>
            <h2
              id="contact-title"
              className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-balance text-ink sm:text-6xl"
            >
              Let&apos;s build something <Emphasis>intelligent.</Emphasis>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
              I&apos;m open to opportunities where I can contribute to LLM applications, agentic
              AI, machine learning systems, and applied AI engineering.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={`mailto:${profile.email}`} variant="primary">
                <Mail className="size-4" aria-hidden />
                {profile.email}
              </ButtonLink>
              <CopyEmailButton email={profile.email} />
              {profile.resumeUrl && (
                <ButtonLink href={profile.resumeUrl} variant="secondary" external>
                  <FileText className="size-4" aria-hidden />
                  View résumé
                </ButtonLink>
              )}
            </div>

            <p className="mt-7 text-sm text-ink-2">
              <span className="text-faint">Roles I&apos;m targeting: </span>
              {profile.targetRoles.join(" · ")}
            </p>
            <p className="mt-2 font-mono text-xs text-faint">
              {profile.location} · Remote-friendly · {profile.workAuthorization}
            </p>
          </div>

          <ul className="relative mx-auto mt-14 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-center gap-3 rounded-2xl border border-line bg-canvas/60 p-4 transition-colors hover:border-line-strong hover:bg-canvas"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line-strong text-ink-2 transition-colors group-hover:text-accent">
                    {channel.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-ink">{channel.label}</span>
                    <span className="block truncate font-mono text-xs text-muted">{channel.handle}</span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-faint transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    aria-hidden
                  />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
