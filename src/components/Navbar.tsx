"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll position for bg opacity & active section
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    // Scroll-spy: find which section is currently in view
    const offsets = NAV_ITEMS.map(({ href }) => {
      const el = document.querySelector(href);
      if (!el) return { id: href.slice(1), top: Infinity };
      const rect = el.getBoundingClientRect();
      return { id: href.slice(1), top: rect.top };
    });

    // Pick the section whose top is closest to (but above) the middle of the viewport
    const threshold = window.innerHeight * 0.35;
    let current = offsets[0].id;
    for (const s of offsets) {
      if (s.top <= threshold) current = s.id;
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ---------- Desktop / Fixed Navbar ---------- */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          scrolled
            ? "bg-black/60 backdrop-blur-xl shadow-[0_2px_40px_rgba(0,0,0,.45)] border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="group flex items-center gap-2 select-none"
          >
            <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Rasswanth
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                .
              </span>
            </span>
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/10 border border-white/[0.08]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* CTA Button (Desktop) */}
          <a
            href="mailto:rasswanth.sura@gmail.com"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.04] active:scale-[0.98] transition-all duration-300"
          >
            Let's Talk
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
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
          </a>

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <span
                className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-300 origin-center ${
                  mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-300 ${
                  mobileOpen ? "opacity-0 scale-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-[2px] w-5 rounded-full bg-white transition-all duration-300 origin-center ${
                  mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* ---------- Mobile Full-Screen Overlay ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-2 w-full px-8">
              {NAV_ITEMS.map(({ label, href }, i) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <motion.button
                    key={href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    onClick={() => scrollTo(href)}
                    className={`w-full max-w-xs text-center py-4 text-2xl font-semibold rounded-2xl transition-colors duration-300 ${
                      isActive
                        ? "text-white bg-white/10 border border-white/10"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {label}
                  </motion.button>
                );
              })}

              {/* CTA in mobile menu */}
              <motion.a
                href="mailto:rasswanth.sura@gmail.com"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{
                  delay: NAV_ITEMS.length * 0.06,
                  duration: 0.35,
                }}
                className="mt-6 w-full max-w-xs text-center py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
              >
                Let's Talk →
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
