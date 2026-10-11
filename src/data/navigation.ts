export interface NavItem {
  id: string;
  label: string;
  href: string;
}

/** Section anchors on the home page; hrefs work from any route. */
export const navItems: NavItem[] = [
  { id: "top", label: "Home", href: "/" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export const filterLabels = {
  agentic: "Agentic & LLM",
  retrieval: "Retrieval & RAG",
  ml: "Machine Learning",
  "data-science": "Data Science",
} as const;
