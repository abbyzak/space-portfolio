import { Hero } from "@/components/main/hero";
import { About } from "@/components/main/about";
import { Services } from "@/components/main/services";
import { Skills } from "@/components/main/skills";
import { Projects } from "@/components/main/projects";
import { Team } from "@/components/main/team";
import { Contact } from "@/components/main/contact";
import { BookCall } from "@/components/main/book-call";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Team />
        <BookCall />
        <Contact />
      </div>
    </main>
  );
}