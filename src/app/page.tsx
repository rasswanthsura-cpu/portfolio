import ScrollyCanvas from "@/components/ScrollyCanvas";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-black overflow-x-clip selection:bg-blue-500/30">
      <CustomCursor />
      <Navbar />
      
      {/* Scroll-Linked Animation Hero Section */}
      <div id="home">
        <ScrollyCanvas />
      </div>

      {/* Elite Sections */}
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}
