"use client";

import { useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { AboutAiBackground } from "@/components/AiSectionBackgrounds";

function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouse = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    setRotateX((y - 0.5) * -14);
    setRotateY((x - 0.5) * 14);
    setGlareX(x * 100);
    setGlareY(y * 100);
  };

  const handleLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlareX(50);
    setGlareY(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const stats = [
    { value: "3+", label: "AI Projects" },
    { value: "RAG", label: "Specialty" },
    { value: "2025", label: "Graduating" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden px-6 py-32 md:px-16 md:py-44 lg:px-24"
    >
      {/* About section background integration point */}
      <AboutAiBackground sectionRef={sectionRef} scrollYProgress={scrollYProgress} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400"
          >
            Who I Am
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-5xl font-bold leading-[0.95] tracking-tighter text-white md:text-7xl lg:text-8xl"
          >
            About
            <span className="ml-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mt-6 h-px w-24 bg-gradient-to-r from-blue-500 to-transparent"
          />
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6 lg:col-span-5"
            style={{ y: parallaxY }}
          >
            <motion.p
              variants={fadeRight}
              className="text-xl font-light leading-relaxed text-neutral-300 md:text-2xl"
            >
              I&apos;m a Computer Science student at{" "}
              <span className="font-medium text-white">
                Sathyabama Institute of Science and Technology
              </span>{" "}
              with a strong focus on building modern, high-quality digital experiences.
            </motion.p>
            <motion.p variants={fadeRight} className="text-lg leading-relaxed text-neutral-400">
              I specialize in combining aesthetic frontend design with intelligent AI systems,
              creating projects that are both visually engaging and technically powerful.
            </motion.p>
            <motion.p variants={fadeRight} className="text-lg leading-relaxed text-neutral-400">
              Currently, I&apos;m exploring Generative AI, especially RAG-based systems, and
              building real-world applications like AI assistants and smart automation tools.
            </motion.p>

            <motion.div variants={fadeUp} className="flex gap-8 border-t border-white/10 pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="group">
                  <p className="text-3xl font-bold text-white transition-colors duration-500 group-hover:text-blue-400 md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-neutral-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="lg:col-span-7"
          >
            <TiltCard className="group rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-[1px]">
              <div className="relative overflow-hidden rounded-3xl bg-[#111118]/90 p-10 backdrop-blur-xl md:p-12">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl transition-all duration-700 group-hover:bg-blue-500/20" />
                <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl transition-all duration-700 group-hover:bg-purple-500/15" />

                <div className="relative z-10">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-2xl shadow-lg shadow-blue-500/20">
                      {"\uD83D\uDCA1"}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white md:text-3xl">Why Me</h3>
                      <p className="text-sm text-neutral-500">What sets me apart</p>
                    </div>
                  </div>

                  <p className="mb-4 text-lg leading-relaxed text-neutral-300">
                    I focus on building projects that combine{" "}
                    <strong className="text-white">design, intelligence, and performance</strong>.
                  </p>
                  <p className="mb-8 text-lg leading-relaxed text-neutral-400">
                    Instead of creating basic applications, I aim to develop premium, real-world
                    solutions that stand out both visually and technically. I don&apos;t just
                    write code; I craft experiences.
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      "Premium UI/UX Design",
                      "AI-Powered Systems",
                      "Performance Optimized",
                      "Production Ready",
                    ].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                        className="group/item flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 transition-transform duration-300 group-hover/item:scale-150" />
                        <span className="text-sm text-neutral-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.7 }}
              className="mt-8 border-l-2 border-blue-500/40 pl-6"
            >
              <p className="text-base italic text-neutral-500">
                &quot;I believe great products are not just functional - they should feel premium,
                intuitive, and impactful.&quot;
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
