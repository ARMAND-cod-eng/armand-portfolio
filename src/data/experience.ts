import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    role: "AI Engineer & Founder",
    organization: "IntelliCast AI",
    context: "Independent product · Remote",
    period: "Aug 2025 – Present",
    summary:
      "Designing, building and operating a personalized agentic news product end to end.",
    bullets: [
      "Built the agent cycle: story clustering with pgvector, cross-outlet claim verification and goal-based ranking.",
      "Streaming script → fact-check → voice pipeline with Llama 3.3 70B and Cartesia, in English and French.",
      "Own the FastAPI backend, React frontend, Postgres data model, and AWS deployment with Docker, Terraform and CI.",
    ],
    tags: ["LLM orchestration", "Retrieval", "Voice", "Evaluation", "AWS"],
  },
  {
    role: "AI Training Specialist",
    organization: "Outlier",
    context: "Contract · Remote",
    period: "May 2024 – Jan 2026",
    summary: "Contributed to LLM post-training and evaluation workflows.",
    bullets: [
      "Ranked model responses for RLHF preference data and wrote supervised fine-tuning examples.",
      "Evaluated instruction following, reasoning and coding correctness against detailed rubrics.",
      "Wrote adversarial prompts and tested for hallucinations and jailbreaks.",
    ],
    tags: ["RLHF", "SFT", "LLM evaluation", "Red-teaming"],
  },
  {
    role: "Data Analyst Intern",
    organization: "The African Think Tank",
    context: "Dallas, TX",
    period: "Aug 2024 – Jan 2025",
    summary: "Turned program and survey data into decisions for leadership.",
    bullets: [
      "Analyzed survey and program data with Python and SQL.",
      "Built Tableau dashboards and decision-support reports.",
      "Served as program manager for the organization's Kids Cultural Camp.",
    ],
    tags: ["Python", "SQL", "Tableau", "Reporting"],
  },
];
