import { ArrowDown, ArrowRight, BadgeCheck, FileText, Globe, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SystemFlow } from "@/components/hero/system-flow";
import { ButtonLink } from "@/components/ui/button-link";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Container } from "@/components/ui/container";
import { Emphasis } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";

const selectedWork = [
  { label: "IntelliCast AI", note: "Live personal news agent", href: "/projects/intellicast-ai" },
  { label: "Atlas", note: "LangGraph multi-agent research", href: "/projects/atlas" },
  { label: "Fraud ensemble", note: "0.9834 ROC-AUC", href: "/projects/fraud-detection" },
];

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative">
      <Container className="grid items-center gap-12 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.08fr_1fr] lg:gap-14 lg:pt-20 lg:pb-20">
        <div className="hero-enter">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-fill py-1 pr-3 pl-2 text-xs text-ink-2">
            <span className="pulse-dot size-2 rounded-full bg-ok" aria-hidden />
            {profile.availability}
          </p>

          <p className="mt-7 font-mono text-xs uppercase tracking-[0.22em] text-accent">
            {profile.role}
          </p>

          <h1 id="hero-title" className="mt-4">
            <span className="flex items-center gap-3.5">
              <Image
                src={profile.photo.headshot.src}
                width={profile.photo.headshot.width}
                height={profile.photo.headshot.height}
                alt=""
                loading="eager"
                sizes="56px"
                className="size-14 shrink-0 rounded-full object-cover ring-2 ring-accent/50 ring-offset-2 ring-offset-canvas"
              />
              <span className="text-lg font-medium tracking-tight text-ink-2 sm:text-xl">{profile.name}</span>
            </span>
            <span className="sr-only">: </span>
            <span className="mt-4 block text-display font-semibold text-balance text-ink">
              {profile.headline.lead} <Emphasis>{profile.headline.emphasis}</Emphasis>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
            {profile.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-2">
            <li className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-faint" aria-hidden />
              Based in {profile.location}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Globe className="size-3.5 text-faint" aria-hidden />
              Open to remote opportunities
            </li>
            <li className="inline-flex items-center gap-1.5">
              <BadgeCheck className="size-3.5 text-faint" aria-hidden />
              {profile.workStatus}
            </li>
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span aria-hidden className="mr-1 text-xs text-faint">
              Open to
            </span>
            <ul className="flex flex-wrap gap-2" aria-label="Roles I'm open to">
              {profile.targetRoles.map((role) => (
                <li
                  key={role}
                  className="rounded-full border border-line bg-fill px-2.5 py-0.5 text-xs text-ink-2"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/#projects" variant="primary">
              Explore My Work
              <ArrowDown className="size-4 transition-transform group-hover/button:translate-y-0.5" aria-hidden />
            </ButtonLink>
            {profile.resumeUrl && (
              <ButtonLink href={profile.resumeUrl} variant="secondary" external>
                <FileText className="size-4" aria-hidden />
                Résumé
                <span className="sr-only"> (PDF)</span>
              </ButtonLink>
            )}
            <ButtonLink href="/#contact" variant="secondary">
              Get in Touch
            </ButtonLink>
            <ButtonLink href={profile.links.github} variant="ghost">
              <GitHubIcon size={16} />
              GitHub
            </ButtonLink>
          </div>
        </div>

        <div className="hero-enter">
          <SystemFlow />
        </div>
      </Container>

      <Container>
        <nav
          aria-label="Selected work"
          className="flex flex-col gap-3 border-t border-line py-6 sm:flex-row sm:items-center sm:gap-8"
        >
          <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Selected work
          </p>
          <ul className="grid flex-1 gap-2 sm:grid-cols-3 sm:gap-4">
            {selectedWork.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-2 transition-colors hover:border-line hover:bg-fill sm:-mx-3"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink">{item.label}</span>
                    <span className="block truncate text-xs text-muted">{item.note}</span>
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-faint transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
