import { ArrowRight, FlaskConical, Rocket, ShieldCheck, Waypoints, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";

interface Strength {
  Icon: LucideIcon;
  title: string;
  body: string;
  evidence: { label: string; href: string };
}

/** Four claims a hiring manager can verify in one click each. */
const strengths: Strength[] = [
  {
    Icon: Rocket,
    title: "Ships real AI products",
    body: "IntelliCast is live in early access — an agent cycle, cross-outlet claim checks and voice, deployed on AWS with CI.",
    evidence: { label: "See IntelliCast", href: "/projects/intellicast-ai" },
  },
  {
    Icon: Waypoints,
    title: "Builds agentic systems, not demos",
    body: "Atlas runs parallel LangGraph researchers, a critic grounded in retrieved sources and an enforced token budget — with measured latency.",
    evidence: { label: "See Atlas", href: "/projects/atlas" },
  },
  {
    Icon: ShieldCheck,
    title: "Knows how LLMs are evaluated",
    body: "Nearly two years of LLM post-training work: RLHF preference ranking, fine-tuning examples, and red-teaming for hallucinations and jailbreaks.",
    evidence: { label: "See experience", href: "/#experience" },
  },
  {
    Icon: FlaskConical,
    title: "Rigorous with data",
    body: "Caught a leakage bug behind a perfect score, reports effect sizes next to p-values, and labels modeled numbers as modeled.",
    evidence: { label: "See the churn study", href: "/projects/ecommerce-churn-clv" },
  },
];

export function Strengths() {
  return (
    <section aria-labelledby="strengths-title" className="pt-16 sm:pt-20">
      <Container>
        <h2 id="strengths-title" className="reveal font-mono text-xs uppercase tracking-[0.18em] text-faint">
          What I bring to a team
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map(({ Icon, title, body, evidence }) => (
            <li
              key={title}
              className="reveal group relative flex flex-col rounded-2xl border border-line bg-surface/70 p-5 shadow-raised transition-colors hover:border-line-strong"
            >
              <span className="flex size-9 items-center justify-center rounded-xl border border-line-strong bg-canvas text-accent">
                <Icon className="size-[18px]" aria-hidden />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-ink">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{body}</p>
              <Link
                href={evidence.href}
                className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-accent-soft outline-none after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-accent"
              >
                {evidence.label}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
