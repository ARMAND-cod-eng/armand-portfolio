import type { SkillGroup } from "./types";

/**
 * Grouped by what the skills are used for. Only tools used in real
 * projects or work belong here — no proficiency bars.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "llm",
    title: "LLM & Agentic AI",
    blurb: "Orchestration, retrieval and evaluation for language-model systems.",
    skills: [
      "LangGraph",
      "LangChain",
      "RAG",
      "RAGAS",
      "LLM Evaluation",
      "Prompt Engineering",
      "MCP",
      "Hugging Face",
    ],
  },
  {
    id: "ml",
    title: "Machine Learning",
    blurb: "Classical and deep learning, with models I can explain.",
    skills: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "XGBoost",
      "CatBoost",
      "SHAP",
      "Statistical Modeling",
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    blurb: "Typed services and the data layer underneath them.",
    skills: [
      "Python",
      "SQL",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "ChromaDB",
      "Redis",
      "arq task queues",
    ],
  },
  {
    id: "infra",
    title: "Infrastructure & MLOps",
    blurb: "Shipping, testing and watching what runs.",
    skills: [
      "Docker",
      "AWS EC2",
      "GitHub Actions",
      "CI/CD",
      "Langfuse",
      "Monitoring",
      "Evaluation Pipelines",
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    blurb: "Questions answered with data, and communicated clearly.",
    skills: ["pandas", "NumPy", "Tableau", "Experimentation", "Data Visualization"],
  },
];
