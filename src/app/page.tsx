import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Strengths } from "@/components/sections/strengths";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Strengths />
      <FeaturedProjects />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
