"use client";

import { useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { SkillsAiBackground } from "@/components/AiSectionBackgrounds";

function SkillOrb({
  label,
  delay = 0,
  color,
}: {
  label: string;
  delay?: number;
  color: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.12, y: -4 }}
      className="group inline-flex cursor-default items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-2 text-sm text-neutral-200 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]"
    >
      <span
        className="h-2 w-2 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-125"
        style={{ background: color }}
      />
      {label}
    </motion.span>
  );
}

function InteractiveCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setRotateX((y - 0.5) * -10);
    setRotateY((x - 0.5) * 10);
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
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 800,
      }}
      className={`group relative ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(255,255,255,0.08) 0%, transparent 55%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

const whatIDo = [
  { text: "Build AI-powered applications using RAG", icon: "\uD83E\uDDE0" },
  { text: "Design modern UI/UX experiences", icon: "\uD83C\uDFA8" },
  { text: "Develop full-stack web applications", icon: "\u26A1" },
  { text: "Experiment with next-gen AI tools & workflows", icon: "\uD83D\uDD2C" },
];

const techStack: Record<string, { skills: string[]; color: string }> = {
  Frontend: {
    skills: ["HTML", "CSS", "Tailwind", "JavaScript", "Next.js"],
    color: "#3b82f6",
  },
  "AI & Backend": {
    skills: ["Python", "RAG", "Generative AI"],
    color: "#a855f7",
  },
  Tools: {
    skills: ["Stitch", "Jupyter Notebook", "Antigravity", "GitHub", "VS Code"],
    color: "#10b981",
  },
};

const exploring = [
  "Advanced RAG architectures",
  "LLM-based applications",
  "Full-stack AI systems",
  "High-performance UI animations",
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden px-6 py-28 md:px-16 md:py-40 lg:px-24"
    >
      {/* Skills section background integration point */}
      <SkillsAiBackground sectionRef={sectionRef} scrollYProgress={scrollYProgress} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-purple-400"
          >
            Capabilities
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl font-bold leading-[0.95] tracking-tighter text-white md:text-7xl lg:text-8xl"
          >
            Skills &{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Tech
            </span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mt-6 h-px w-24 bg-gradient-to-r from-purple-500 to-transparent"
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <InteractiveCard>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-[1px]"
            >
              <div className="relative h-full overflow-hidden rounded-3xl bg-[#0f0f18]/90 p-8 backdrop-blur-xl md:p-10">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/[0.07] blur-3xl transition-all duration-700 group-hover:bg-blue-500/[0.14]" />

                <div className="relative z-10">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-lg">
                      {"\uD83E\uDDE0"}
                    </div>
                    <h3 className="text-xl font-bold text-white">What I Do</h3>
                  </div>

                  <ul className="space-y-4">
                    {whatIDo.map((item, index) => (
                      <motion.li
                        key={item.text}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.2 + index * 0.1,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group/item flex items-start gap-3 text-neutral-300 transition-colors duration-300 hover:text-white"
                      >
                        <span className="mt-0.5 text-base transition-transform duration-300 group-hover/item:scale-110">
                          {item.icon}
                        </span>
                        <span className="text-[15px] leading-relaxed">{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </InteractiveCard>

          <InteractiveCard>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="relative h-full rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-[1px]"
            >
              <div className="relative h-full overflow-hidden rounded-3xl bg-[#0f0f18]/90 p-8 backdrop-blur-xl md:p-10">
                <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-purple-500/[0.07] blur-3xl transition-all duration-700 group-hover:bg-purple-500/[0.14]" />

                <div className="relative z-10">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-500/20 to-purple-600/10 text-lg">
                      {"\uD83D\uDEE0\uFE0F"}
                    </div>
                    <h3 className="text-xl font-bold text-white">Tech Stack</h3>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(techStack).map(([category, { skills, color }]) => (
                      <div key={category}>
                        <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <SkillOrb
                              key={skill}
                              label={skill}
                              color={color}
                              delay={0.3 + index * 0.06}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </InteractiveCard>

          <InteractiveCard>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative h-full rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-[1px]"
            >
              <div className="relative h-full overflow-hidden rounded-3xl bg-[#0f0f18]/90 p-8 backdrop-blur-xl md:p-10">
                <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/[0.07] blur-3xl transition-all duration-700 group-hover:bg-emerald-500/[0.14]" />

                <div className="relative z-10">
                  <div className="mb-8 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 text-lg">
                      {"\uD83D\uDCC8"}
                    </div>
                    <h3 className="text-xl font-bold text-white">Exploring</h3>
                  </div>

                  <ul className="space-y-3">
                    {exploring.map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.3 + index * 0.1,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group/item flex cursor-default items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-emerald-500/20 hover:bg-white/[0.04]"
                      >
                        <motion.span
                          className="h-2 w-2 shrink-0 rounded-full bg-emerald-400"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="text-[15px] text-neutral-300 transition-colors duration-300 group-hover/item:text-white">
                          {item}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="ml-auto text-neutral-600 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:text-emerald-400"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
}
