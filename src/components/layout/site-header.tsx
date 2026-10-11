"use client";

import { ArrowUpRight, FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { LogoMark } from "./logo-mark";
import { ThemeToggle } from "./theme-toggle";

const SECTION_IDS = navItems.map((item) => item.id);

/** Tracks which home-page section crosses a thin band near the top third of the viewport. */
function useActiveSection(enabled: boolean): string {
  const [active, setActive] = useState("top");

  useEffect(() => {
    if (!enabled) return;
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const sectionActive = useActiveSection(isHome);
  const active = isHome ? sectionActive : pathname.startsWith("/projects") ? "projects" : "";
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || menuOpen
            ? "border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="-ml-1 flex items-center gap-2.5 rounded-lg p-1"
            aria-label={`${profile.shortName} — home`}
            onClick={closeMenu}
          >
            <LogoMark />
            <span className="text-[15px] font-semibold tracking-tight text-ink">
              {profile.shortName}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5 rounded-full border border-line bg-fill p-1 shadow-raised">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? (isHome ? "location" : "page") : undefined}
                      className={cn(
                        "block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                        isActive
                          ? "bg-fill-2 text-ink"
                          : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-fill-2 hover:text-ink sm:inline-flex"
            >
              <GitHubIcon size={17} />
              <span className="sr-only">GitHub profile (opens in a new tab)</span>
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-9 items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-[13px] font-medium text-ink-2 transition-colors hover:border-line-hover hover:text-ink sm:inline-flex"
              >
                <FileText className="size-3.5" aria-hidden />
                Résumé
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            )}
            <Link
              href="/#contact"
              className="hidden h-9 items-center gap-1 rounded-full bg-ink px-4 text-[13px] font-medium text-canvas transition-colors hover:bg-ink-2 sm:inline-flex"
            >
              Get in touch
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
            <MobileMenuButton open={menuOpen} onToggle={() => setMenuOpen((open) => !open)} />
          </div>
        </Container>
      </div>

      <MobileMenu open={menuOpen} active={active} onClose={closeMenu} />
    </header>
  );
}

function MobileMenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      id="mobile-menu-button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-fill-2 lg:hidden"
    >
      {open ? <X className="size-[18px]" aria-hidden /> : <Menu className="size-[18px]" aria-hidden />}
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
    </button>
  );
}

function MobileMenu({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape closes, focus moves into the menu and back to the trigger, the page behind
  // is locked and made inert, and growing past the breakpoint closes it.
  useEffect(() => {
    if (!open) return;
    const trigger = document.getElementById("mobile-menu-button");
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const background = ["main", "site-footer"]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    root.style.overflow = "hidden";
    background.forEach((element) => (element.inert = true));
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      root.style.overflow = previousOverflow;
      background.forEach((element) => (element.inert = false));
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onBreakpoint);
      trigger?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
        <div
          ref={panelRef}
          id="mobile-menu"
          className="menu-enter fixed inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-line bg-canvas lg:hidden"
        >
          <Container className="flex min-h-full flex-col py-6">
            <nav aria-label="Mobile">
              <ul className="divide-y divide-line border-y border-line">
                {navItems.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active === item.id ? "location" : undefined}
                      className={cn(
                        "flex items-baseline gap-4 py-4 text-2xl font-medium tracking-tight transition-colors",
                        active === item.id ? "text-ink" : "text-ink-2 hover:text-ink",
                      )}
                    >
                      <span className="font-mono text-xs text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                href="/#contact"
                onClick={onClose}
                className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-ink text-sm font-medium text-canvas"
              >
                Get in touch
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong text-sm font-medium text-ink"
              >
                <GitHubIcon size={16} />
                GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong text-sm font-medium text-ink sm:col-span-2"
                >
                  <FileText className="size-4" aria-hidden />
                  View résumé
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              )}
            </div>
            <p className="mt-auto pt-10 font-mono text-xs text-faint">
              {profile.location} · {profile.workAuthorization}
            </p>
          </Container>
        </div>
  );
}
