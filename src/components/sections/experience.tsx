import { Container } from "@/components/ui/container";
import { Emphasis, SectionHeading } from "@/components/ui/section-heading";
import { TagList } from "@/components/ui/tag";
import { experience } from "@/data/experience";
import { cn } from "@/lib/cn";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-t border-line bg-linear-to-b from-surface/40 to-transparent py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve done <Emphasis>the work.</Emphasis>
            </>
          }
          description="About two years of hands-on work across LLM post-training and evaluation, independent AI product engineering, and data analysis."
        />

        <ol className="relative mt-16 space-y-12 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-linear-to-b before:from-accent/60 before:via-line-strong before:to-transparent md:before:left-[calc(13rem+5px)]">
          {experience.map((item, index) => (
            <li
              key={`${item.organization}-${item.role}`}
              className="reveal relative grid gap-3 pl-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-0 md:pl-0"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute top-1.5 left-0 size-[11px] rounded-full border-2 md:left-[13rem]",
                  index === 0
                    ? "border-accent bg-accent/30 shadow-[0_0_0_4px_rgb(34_211_238/0.12)]"
                    : "border-line-strong bg-canvas",
                )}
              />
              <div className="md:pr-10 md:text-right">
                <p className="font-mono text-xs text-ink-2">{item.period}</p>
                <p className="mt-1 text-xs text-faint">{item.context}</p>
              </div>
              <div className="md:pl-10">
                <h3 className="text-lg font-semibold tracking-tight text-ink">
                  {item.role}
                  <span className="font-normal text-muted"> · {item.organization}</span>
                </h3>
                <p className="mt-2 text-[15px] text-ink-2">{item.summary}</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6rem] h-px w-3 shrink-0 bg-accent/60" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <TagList items={item.tags} className="mt-5" label="Focus areas" />
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
