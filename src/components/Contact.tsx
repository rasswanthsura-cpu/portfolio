"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ContactAiBackground } from "@/components/AiSectionBackgrounds";

function ContactLink({
  href,
  icon,
  label,
  sublabel,
  index,
  external = false,
}: {
  href: string;
  icon: string;
  label: string;
  sublabel: string;
  index: number;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.3 + index * 0.12,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ x: 8 }}
      className="group -mx-6 flex items-center gap-5 rounded-2xl px-6 py-5 transition-colors duration-300 hover:bg-white/[0.03]"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.06] to-white/[0.02] text-2xl shadow-lg shadow-black/20 transition-all duration-300 group-hover:scale-105 group-hover:border-white/[0.12]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-medium text-white transition-colors duration-300 group-hover:text-blue-300 md:text-xl">
          {label}
        </p>
        <p className="text-sm text-neutral-500 transition-colors duration-300 group-hover:text-neutral-400">
          {sublabel}
        </p>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="shrink-0 text-neutral-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </motion.a>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const links = [
    {
      href: "mailto:rasswanth.sura@gmail.com",
      icon: "\uD83D\uDCE7",
      label: "rasswanth.sura@gmail.com",
      sublabel: "Email me anytime",
    },
    {
      href: "https://github.com/rasswanthsura-cpu",
      icon: "\uD83D\uDCBB",
      label: "GitHub Profile",
      sublabel: "View my repositories",
      external: true,
    },
    {
      href: "https://www.linkedin.com/in/rasswanth-s-0b4754349",
      icon: "\uD83D\uDD17",
      label: "LinkedIn",
      sublabel: "Let's connect professionally",
      external: true,
    },
  ];

  return (
    <footer
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden px-6 py-32 md:px-16 md:py-44 lg:px-24"
    >
      {/* Contact section background integration point */}
      <ContactAiBackground sectionRef={sectionRef} scrollYProgress={scrollYProgress} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div style={{ y: textY }}>
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-pink-400"
              >
                Get In Touch
              </motion.p>

              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                }}
                className="mb-8 text-5xl font-bold leading-[0.95] tracking-tighter text-white md:text-7xl lg:text-8xl"
              >
                Let&apos;s build
                <br />
                something{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                  elite.
                </span>
              </motion.h2>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.2 },
                  },
                }}
                className="max-w-md text-lg leading-relaxed text-neutral-400 md:text-xl"
              >
                Ready to collaborate on next-generation AI and web applications? Drop me a
                message.
              </motion.p>

              <motion.a
                href="mailto:rasswanth.sura@gmail.com"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-purple-500/20 transition-shadow duration-500 hover:shadow-purple-500/40"
              >
                Start a Conversation
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-[1px]"
            >
              <div className="relative overflow-hidden rounded-3xl bg-[#0c0c14]/90 p-8 backdrop-blur-xl md:p-10">
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-500/[0.06] blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-blue-500/[0.06] blur-3xl" />

                <div className="relative z-10 space-y-1 divide-y divide-white/[0.04]">
                  {links.map((link, index) => (
                    <ContactLink
                      key={link.href}
                      {...link}
                      index={index}
                      external={link.external || false}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8 flex items-center justify-between text-xs text-neutral-600"
            >
              <p>&copy; {new Date().getFullYear()} Rasswanth S</p>
              <p className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for work
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
