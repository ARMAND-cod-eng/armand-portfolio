import Link from "next/link";
import { Container } from "@/components/ui/container";
import { GitHubIcon, KaggleIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { LogoMark } from "./logo-mark";

const socials = [
  { label: "GitHub", href: profile.links.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedInIcon },
  { label: "Kaggle", href: profile.links.kaggle, Icon: KaggleIcon },
];

export function SiteFooter() {
  return (
    <footer id="site-footer" className="border-t border-line">
      <Container className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg">
            <LogoMark className="size-7" id="footer-logo" />
            <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {profile.role} in {profile.location}. Building AI systems with evaluation,
            reliability and deployment in mind.
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <nav aria-label="Footer">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Site</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="text-muted transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Elsewhere</p>
            <ul className="mt-3 space-y-2 text-sm">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
                  >
                    <Icon size={14} />
                    {label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-muted transition-colors hover:text-ink"
                >
                  {profile.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line py-6 text-xs text-faint sm:flex-row sm:justify-between">
        <p>Built with Next.js, TypeScript and Tailwind CSS. No trackers.</p>
        <p className="font-mono">{profile.workAuthorization}</p>
      </Container>
    </footer>
  );
}
