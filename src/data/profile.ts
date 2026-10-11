/**
 * Personal details. Update here and every section, the metadata and the
 * structured data pick it up.
 */
export const profile = {
  name: "Armand Junior Dongmo Notue",
  shortName: "Armand Notue",
  initials: "AN",
  role: "GenAI / ML Engineer",
  alsoKnownFor: [
    "LLM Engineer",
    "Agentic AI Developer",
    "Machine Learning Engineer",
    "Data Scientist",
  ],
  headline: {
    lead: "I build AI systems that go",
    emphasis: "beyond prototypes.",
  },
  summary:
    "I engineer LLM applications, autonomous agents, retrieval systems, and machine learning solutions — with a focus on evaluation, reliability, and real-world deployment.",
  targetRoles: ["GenAI Engineer", "LLM Engineer", "ML Engineer", "AI Engineer", "Data Scientist"],
  photo: {
    portrait: { src: "/images/armand-portrait.webp", width: 1200, height: 1500 },
    headshot: { src: "/images/armand-headshot.webp", width: 512, height: 512 },
    alt: "Armand Junior Dongmo Notue in graduation cap and gown, holding his Grand Canyon University diploma",
    caption: "M.S. Data Science, Grand Canyon University — 2025",
  },
  location: "Dallas–Fort Worth, TX",
  locality: "Dallas–Fort Worth",
  region: "TX",
  country: "US",
  workStatus: "U.S. Permanent Resident",
  workAuthorization: "U.S. Permanent Resident — no visa sponsorship required",
  availability: "Open to remote and Dallas–Fort Worth opportunities",
  email: "notuearmand250@gmail.com",
  links: {
    github: "https://github.com/ARMAND-cod-eng",
    linkedin: "https://www.linkedin.com/in/notue250/",
    kaggle: "https://www.kaggle.com/armandjunior",
    intellicast: "https://intellicast.news",
  },
  handles: {
    github: "ARMAND-cod-eng",
    linkedin: "in/notue250",
    kaggle: "armandjunior",
    intellicast: "intellicast.news",
  },
  education: {
    degree: "M.S. Data Science",
    school: "Grand Canyon University",
    completed: "October 2025",
    coursework: [
      "Machine Learning",
      "Deep Learning",
      "Statistical Methods",
      "NLP",
      "Big Data Analytics",
      "Data Engineering",
    ],
  },
  /**
   * Résumé PDF in `public/`. Set to undefined to hide every résumé button.
   * The web copy omits the phone number and matches the verified project facts.
   */
  resumeUrl: "/armand-notue-resume.pdf" as string | undefined,
} as const;

export type Profile = typeof profile;
