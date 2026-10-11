import { BadgeCheck, GraduationCap, MapPin, Target } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Emphasis, SectionHeading } from "@/components/ui/section-heading";
import { profile } from "@/data/profile";

const focusAreas = [
  "LLM applications",
  "Multi-agent systems",
  "Retrieval & RAG",
  "LLM evaluation",
  "Applied ML",
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-line bg-linear-to-b from-surface/40 to-transparent py-24 sm:py-32"
    >
      <Container className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="about-title"
            index="04"
            eyebrow="About"
            title={
              <>
                The engineering that makes AI useful <Emphasis>beyond a demo.</Emphasis>
              </>
            }
          />
          <div className="reveal mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-pretty text-muted sm:text-[17px]">
            <p>
              I&apos;m an AI engineer based in Dallas–Fort Worth with an M.S. in Data Science.
              My work spans <span className="text-ink-2">agentic AI</span>,{" "}
              <span className="text-ink-2">retrieval systems</span>,{" "}
              <span className="text-ink-2">machine learning</span> and{" "}
              <span className="text-ink-2">LLM evaluation</span>.
            </p>
            <p>
              I&apos;ve contributed to LLM post-training — ranking responses for RLHF, writing
              fine-tuning examples, and red-teaming for hallucinations and jailbreaks — and I
              build independent AI products and technical systems end to end, from data
              pipelines to deployment.
            </p>
            <p>
              What I care about most is the unglamorous part: evaluation, data quality,
              reliability, deployment, latency and observable behavior. I write down what I
              measured, what broke and what I changed — and I label what isn&apos;t finished
              yet.
            </p>
          </div>
        </div>

        <div className="space-y-6 lg:mt-24">
        <figure className="reveal relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-line bg-surface shadow-raised lg:max-w-none">
          <Image
            src={profile.photo.portrait.src}
            width={profile.photo.portrait.width}
            height={profile.photo.portrait.height}
            alt={profile.photo.alt}
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 92vw"
            className="aspect-[4/5] h-auto w-full object-cover"
          />
          <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-black/55 px-4 py-3 text-[13px] text-white backdrop-blur-md">
            {profile.photo.caption}
          </figcaption>
        </figure>
        <aside
          aria-label="At a glance"
          className="reveal h-fit rounded-3xl border border-line bg-surface/80 p-6 shadow-raised sm:p-8"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">At a glance</p>
          <dl className="mt-6 space-y-6">
            <div className="flex gap-4">
              <dt className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-canvas text-accent">
                <GraduationCap className="size-[18px]" aria-hidden />
                <span className="sr-only">Education</span>
              </dt>
              <dd>
                <p className="font-medium text-ink">{profile.education.degree}</p>
                <p className="text-sm text-muted">
                  {profile.education.school} · {profile.education.completed}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Coursework">
                  {profile.education.coursework.map((course) => (
                    <li
                      key={course}
                      className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-ink-2"
                    >
                      {course}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-canvas text-accent">
                <MapPin className="size-[18px]" aria-hidden />
                <span className="sr-only">Location</span>
              </dt>
              <dd>
                <p className="font-medium text-ink">{profile.location}</p>
                <p className="text-sm text-muted">{profile.availability}</p>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-canvas text-accent">
                <BadgeCheck className="size-[18px]" aria-hidden />
                <span className="sr-only">Work authorization</span>
              </dt>
              <dd>
                <p className="font-medium text-ink">{profile.workStatus}</p>
                <p className="text-sm text-muted">No visa sponsorship required</p>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-canvas text-accent">
                <Target className="size-[18px]" aria-hidden />
                <span className="sr-only">Focus</span>
              </dt>
              <dd>
                <p className="font-medium text-ink">Focus</p>
                <p className="text-sm text-muted">{focusAreas.join(" · ")}</p>
              </dd>
            </div>
          </dl>
        </aside>
        </div>
      </Container>
    </section>
  );
}
