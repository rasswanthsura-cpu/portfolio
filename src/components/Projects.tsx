"use client";

import { useRef, useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { ProjectsAiBackground } from "@/components/AiSectionBackgrounds";

function ProjectCard({
  project,
  index,
  isWide,
}: {
  project: {
    title: string;
    desc: string;
    tags: string[];
    image: string;
  };
  index: number;
  isWide: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);

  const springX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setRotateX((y - 0.5) * -8);
    setRotateY((x - 0.5) * 8);
    setSpotX(x * 100);
    setSpotY(y * 100);
  };

  const handleLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 900,
      }}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl ${
        isWide ? "h-[26rem] md:col-span-2 md:h-[28rem]" : "h-[28rem]"
      }`}
    >
      <div className="absolute inset-0 z-0 rounded-3xl bg-gradient-to-br from-white/[0.1] to-white/[0.02] p-[1px]">
        <div className="h-full w-full rounded-3xl bg-[#0c0c14]" />
      </div>

      <div className="absolute inset-[1px] z-[1] overflow-hidden rounded-3xl">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="scale-105 object-cover opacity-40 transition-all duration-[900ms] ease-out group-hover:scale-110 group-hover:opacity-60"
        />
      </div>

      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

      <div
        className="pointer-events-none absolute inset-0 z-[3] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at ${spotX}% ${spotY}%, rgba(59,130,246,0.12) 0%, transparent 60%)`,
        }}
      />

      <div className="absolute inset-0 z-[2] opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div
          className="absolute h-64 w-64 rounded-full blur-[100px]"
          style={{
            bottom: "-20%",
            left: "10%",
            background: "rgba(59,130,246,0.12)",
          }}
        />
        <div
          className="absolute h-48 w-48 rounded-full blur-[80px]"
          style={{
            top: "10%",
            right: "5%",
            background: "rgba(139,92,246,0.08)",
          }}
        />
      </div>

      <div className="absolute inset-0 z-[5] flex flex-col justify-end p-8 md:p-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.15 }}
          className="absolute right-8 top-6 text-[10px] font-mono uppercase tracking-widest text-neutral-600"
        >
          Project {String(index + 1).padStart(2, "0")}
        </motion.span>

        <div className="translate-y-3 transition-transform duration-500 ease-out group-hover:translate-y-0">
          <h3 className="mb-3 text-2xl font-bold text-white drop-shadow-lg md:text-3xl">
            {project.title}
          </h3>
          <p className="mb-6 max-w-xl text-sm leading-relaxed text-neutral-400 opacity-80 transition-opacity duration-500 group-hover:opacity-100 md:text-base">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.15 + tagIndex * 0.06 }}
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-neutral-300 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 right-8 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="-rotate-45 text-white"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const projects = [
    {
      title: "Ask My Document (RAG)",
      desc: "An AI-powered system that allows users to interact with documents in a conversational way. Implemented Retrieval-Augmented Generation for accurate responses. Enables real-time querying of uploaded files.",
      tags: ["Next.js", "Python", "RAG"],
      image: "/projects/ask_my_document.png",
    },
    {
      title: "Smart DB Assistant",
      desc: "A smart assistant that converts natural language into database queries. Translates user input into SQL queries, simplifying database interaction for non-technical users and reducing manual effort.",
      tags: ["Generative AI", "SQL", "Next.js"],
      image: "/projects/smart_db_assistant.png",
    },
    {
      title: "Knowledge Base Chatbot",
      desc: "A context-aware chatbot trained on custom knowledge sources utilizing RAG for accurate, context-driven answers. Designed for intelligent, scalable information retrieval in business or personal use cases.",
      tags: ["React", "LLM", "Python", "RAG"],
      image: "/projects/knowledge_base_chatbot.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden px-6 py-28 md:px-16 md:py-40 lg:px-24"
    >
      {/* Projects section background integration point */}
      <ProjectsAiBackground sectionRef={sectionRef} scrollYProgress={scrollYProgress} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400"
            >
              Featured Work
            </motion.p>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="text-5xl font-bold leading-[0.95] tracking-tighter text-white md:text-7xl lg:text-8xl"
            >
              My{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h2>
            <motion.div
              variants={{
                hidden: { opacity: 0, scaleX: 0 },
                visible: { opacity: 1, scaleX: 1, transition: { duration: 0.8 } },
              }}
              className="mt-6 h-px w-24 origin-left bg-gradient-to-r from-cyan-500 to-transparent"
            />
          </div>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
            }}
            className="max-w-sm text-base leading-relaxed text-neutral-500 md:text-right"
          >
            A curated selection of AI-powered applications &amp; intelligent systems I&apos;ve
            built.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isWide={index === 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
