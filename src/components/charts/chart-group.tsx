import type { ChartGroup as ChartGroupData, ChartSpec } from "@/data/types";
import { cn } from "@/lib/cn";
import { BarChart } from "./bar-chart";
import { ConfusionMatrix } from "./confusion-matrix";
import { PairedBars } from "./paired-bars";
import { ShareBars } from "./share-bars";

function Chart({ chart }: { chart: ChartSpec }) {
  switch (chart.kind) {
    case "bars":
      return <BarChart chart={chart} />;
    case "paired":
      return <PairedBars chart={chart} />;
    case "share":
      return <ShareBars chart={chart} />;
    case "confusion":
      return <ConfusionMatrix chart={chart} />;
  }
}

/** A titled set of small multiples sharing one story and one source. */
export function ChartGroup({ group, headingLevel: Heading = "h3" }: { group: ChartGroupData; headingLevel?: "h2" | "h3" }) {
  return (
    <section aria-labelledby={`${group.id}-title`}>
      <Heading id={`${group.id}-title`} className="text-base font-semibold tracking-tight text-ink sm:text-[17px]">
        {group.title}
      </Heading>
      {group.description && (
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{group.description}</p>
      )}
      <div className={cn("mt-5 grid gap-4", group.charts.length > 1 && "md:grid-cols-2")}>
        {group.charts.map((chart) => (
          <Chart key={chart.title} chart={chart} />
        ))}
      </div>
      <p className="mt-3 text-xs text-faint">Source: {group.source}</p>
    </section>
  );
}
