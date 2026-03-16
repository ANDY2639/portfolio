import { About } from "../components/sections/About";
import { Contact } from "../components/sections/Contact";
import { Hero } from "../components/sections/Hero";
import { Projects } from "../components/sections/Projects";
import { Skills } from "../components/sections/Skills";
import { Stats } from "../components/sections/Stats";

export function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
