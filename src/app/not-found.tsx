import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">
        This page isn&apos;t part of the system.
      </h1>
      <p className="mt-4 max-w-lg text-muted">
        The link may be out of date. The projects and case studies are a click away.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="primary">
          <ArrowLeft className="size-4" aria-hidden />
          Back home
        </ButtonLink>
        <ButtonLink href="/projects">View projects</ButtonLink>
      </div>
    </Container>
  );
}
