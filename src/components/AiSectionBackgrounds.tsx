"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";

type SectionBackgroundProps = {
  sectionRef: RefObject<HTMLElement>;
  scrollYProgress: MotionValue<number>;
};

type PointNode = {
  x: string;
  y: string;
  size: number;
  color: string;
  delay?: number;
};

type StreamBand = {
  top: string;
  rotate: number;
  color: string;
  duration: number;
  delay?: number;
  packetDelay?: number;
};

type Particle = {
  left: string;
  top: string;
  size: number;
  color: string;
  duration: number;
  delay?: number;
};

const backgroundShell = "absolute inset-0 z-0 overflow-hidden pointer-events-none";
const sectionFades = (
  <>
    <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#070b12] to-transparent" />
    <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#05070b] to-transparent" />
  </>
);

const neuralNodes: PointNode[] = [
  { x: "12%", y: "24%", size: 10, color: "rgba(96, 165, 250, 0.85)", delay: 0.1 },
  { x: "26%", y: "16%", size: 8, color: "rgba(59, 130, 246, 0.8)", delay: 0.3 },
  { x: "38%", y: "31%", size: 11, color: "rgba(34, 211, 238, 0.82)", delay: 0.6 },
  { x: "52%", y: "18%", size: 9, color: "rgba(167, 139, 250, 0.75)", delay: 0.4 },
  { x: "67%", y: "32%", size: 12, color: "rgba(192, 132, 252, 0.8)", delay: 0.8 },
  { x: "82%", y: "21%", size: 9, color: "rgba(56, 189, 248, 0.78)", delay: 1 },
  { x: "18%", y: "58%", size: 12, color: "rgba(45, 212, 191, 0.82)", delay: 0.5 },
  { x: "33%", y: "72%", size: 9, color: "rgba(96, 165, 250, 0.82)", delay: 0.9 },
  { x: "50%", y: "56%", size: 13, color: "rgba(129, 140, 248, 0.82)", delay: 0.2 },
  { x: "64%", y: "70%", size: 9, color: "rgba(34, 197, 94, 0.72)", delay: 0.7 },
  { x: "79%", y: "60%", size: 11, color: "rgba(125, 211, 252, 0.75)", delay: 1.2 },
  { x: "90%", y: "76%", size: 8, color: "rgba(244, 114, 182, 0.7)", delay: 0.9 },
];

const neuralLinks = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [0, 6],
  [6, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [2, 8],
  [4, 8],
  [5, 10],
  [1, 6],
  [3, 8],
  [6, 8],
  [8, 10],
] as const;

const streamBands: StreamBand[] = [
  { top: "18%", rotate: -8, color: "rgba(34, 211, 238, 0.2)", duration: 18, delay: 0.2, packetDelay: 0.1 },
  { top: "34%", rotate: 5, color: "rgba(96, 165, 250, 0.18)", duration: 16, delay: 1.1, packetDelay: 0.7 },
  { top: "58%", rotate: -4, color: "rgba(167, 139, 250, 0.2)", duration: 20, delay: 0.6, packetDelay: 1.3 },
  { top: "76%", rotate: 8, color: "rgba(45, 212, 191, 0.16)", duration: 17, delay: 1.6, packetDelay: 1.8 },
];

const projectParticles: Particle[] = [
  { left: "7%", top: "18%", size: 8, color: "rgba(56, 189, 248, 0.8)", duration: 11, delay: 0.4 },
  { left: "14%", top: "62%", size: 5, color: "rgba(125, 211, 252, 0.65)", duration: 14, delay: 1.4 },
  { left: "21%", top: "38%", size: 6, color: "rgba(99, 102, 241, 0.78)", duration: 13, delay: 0.9 },
  { left: "29%", top: "72%", size: 10, color: "rgba(168, 85, 247, 0.75)", duration: 12, delay: 1.8 },
  { left: "36%", top: "20%", size: 7, color: "rgba(34, 211, 238, 0.82)", duration: 10, delay: 0.3 },
  { left: "42%", top: "50%", size: 9, color: "rgba(59, 130, 246, 0.76)", duration: 15, delay: 2.2 },
  { left: "49%", top: "28%", size: 5, color: "rgba(45, 212, 191, 0.7)", duration: 14, delay: 1.2 },
  { left: "54%", top: "80%", size: 7, color: "rgba(192, 132, 252, 0.74)", duration: 16, delay: 0.8 },
  { left: "61%", top: "40%", size: 11, color: "rgba(96, 165, 250, 0.72)", duration: 12, delay: 0.1 },
  { left: "69%", top: "64%", size: 8, color: "rgba(34, 211, 238, 0.72)", duration: 13, delay: 1.7 },
  { left: "76%", top: "24%", size: 6, color: "rgba(14, 165, 233, 0.8)", duration: 11, delay: 1 },
  { left: "83%", top: "52%", size: 10, color: "rgba(147, 51, 234, 0.68)", duration: 17, delay: 2.1 },
  { left: "92%", top: "34%", size: 6, color: "rgba(103, 232, 249, 0.7)", duration: 10, delay: 0.5 },
];

function useSectionPointer(sectionRef: RefObject<HTMLElement>) {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    if (reducedMotion) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }

    const node = sectionRef.current;
    if (!node) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const nextX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const nextY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      pointerX.set(Math.max(-1, Math.min(1, nextX)));
      pointerY.set(Math.max(-1, Math.min(1, nextY)));
    };

    const handlePointerLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    node.addEventListener("pointermove", handlePointerMove, { passive: true });
    node.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [pointerX, pointerY, reducedMotion, sectionRef]);

  return {
    reducedMotion,
    x: useSpring(pointerX, { stiffness: 70, damping: 22, mass: 0.4 }),
    y: useSpring(pointerY, { stiffness: 70, damping: 22, mass: 0.4 }),
  };
}

function AmbientNoise() {
  return (
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")',
      }}
    />
  );
}

export function AboutAiBackground({ sectionRef, scrollYProgress }: SectionBackgroundProps) {
  const { x, y, reducedMotion } = useSectionPointer(sectionRef);
  const sectionY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const glowX = useTransform(x, [-1, 1], [-34, 34]);
  const glowY = useTransform(y, [-1, 1], [-24, 24]);
  const networkX = useTransform(x, [-1, 1], [-14, 14]);
  const networkY = useTransform(y, [-1, 1], [-10, 10]);

  return (
    <motion.div className={backgroundShell} style={{ y: sectionY }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,23,42,0.95),_rgba(4,8,18,0.98)_55%,_#02050b_100%)]" />

      <motion.div className="absolute inset-0" style={{ x: glowX, y: glowY }}>
        <div className="absolute -top-24 left-[6%] h-[24rem] w-[24rem] rounded-full bg-cyan-400/10 blur-[110px]" />
        <div className="absolute top-[18%] right-[12%] h-[28rem] w-[28rem] rounded-full bg-blue-500/12 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[28%] h-[20rem] w-[20rem] rounded-full bg-violet-500/10 blur-[120px]" />
      </motion.div>

      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-60"
        style={{ x: networkX, y: networkY }}
      >
        {neuralLinks.map(([from, to], index) => (
          <motion.line
            key={`${from}-${to}`}
            x1={neuralNodes[from].x}
            y1={neuralNodes[from].y}
            x2={neuralNodes[to].x}
            y2={neuralNodes[to].y}
            stroke="rgba(125,211,252,0.22)"
            strokeWidth="0.18"
            strokeLinecap="round"
            animate={
              reducedMotion
                ? undefined
                : {
                    opacity: [0.18, 0.42, 0.18],
                    strokeWidth: [0.12, 0.26, 0.12],
                  }
            }
            transition={{
              duration: 6 + (index % 4),
              delay: index * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>

      {neuralNodes.map((node, index) => (
        <motion.div
          key={`${node.x}-${node.y}`}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: node.x,
            top: node.y,
            width: node.size,
            height: node.size,
            background: node.color,
            boxShadow: `0 0 20px ${node.color}`,
            x: networkX,
            y: networkY,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  scale: [1, 1.55, 1],
                  opacity: [0.65, 1, 0.72],
                }
          }
          transition={{
            duration: 4.8 + (index % 3),
            delay: node.delay ?? index * 0.08,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="absolute inset-[-10px] rounded-full border border-cyan-300/25"
            animate={reducedMotion ? undefined : { scale: [0.85, 1.8], opacity: [0.5, 0] }}
            transition={{
              duration: 3.6 + (index % 2),
              delay: (node.delay ?? 0) + 0.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(125,211,252,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.14) 1px, transparent 1px)", backgroundSize: "82px 82px" }} />
      <AmbientNoise />
      {sectionFades}
    </motion.div>
  );
}

export function SkillsAiBackground({ sectionRef, scrollYProgress }: SectionBackgroundProps) {
  const { x, y, reducedMotion } = useSectionPointer(sectionRef);
  const sectionY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const streamOffsetX = useTransform(x, [-1, 1], [-24, 24]);
  const streamOffsetY = useTransform(y, [-1, 1], [-18, 18]);
  const matrixRotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <motion.div className={backgroundShell} style={{ y: sectionY }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(17,24,39,0.95),_rgba(5,10,22,0.98)_58%,_#02050c_100%)]" />

      <motion.div
        className="absolute inset-[8%] rounded-[3rem] opacity-35"
        style={{
          rotate: matrixRotate,
          x: streamOffsetX,
          y: streamOffsetY,
          backgroundImage:
            "radial-gradient(circle at center, rgba(125,211,252,0.24) 0 1px, transparent 1.4px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at center, black 45%, transparent 88%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 45%, transparent 88%)",
        }}
      />

      {streamBands.map((band, index) => (
        <motion.div
          key={`${band.top}-${band.rotate}`}
          className="absolute left-[-18%] h-28 w-[136%] rounded-full"
          style={{
            top: band.top,
            rotate: band.rotate,
            x: streamOffsetX,
            y: streamOffsetY,
            background: `linear-gradient(90deg, transparent 0%, ${band.color} 18%, rgba(255,255,255,0.08) 48%, ${band.color} 72%, transparent 100%)`,
            filter: "blur(22px)",
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  x: [-60, 40, -30],
                  opacity: [0.34, 0.55, 0.34],
                }
          }
          transition={{
            duration: band.duration,
            delay: band.delay ?? 0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {[0, 1, 2].map((packet) => (
            <motion.div
              key={packet}
              className="absolute top-1/2 h-2.5 w-24 -translate-y-1/2 rounded-full"
              style={{
                left: `${12 + packet * 26}%`,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.7), rgba(255,255,255,0))",
                boxShadow: "0 0 22px rgba(125,211,252,0.18)",
              }}
              animate={reducedMotion ? undefined : { x: [-80, 180], opacity: [0, 0.9, 0] }}
              transition={{
                duration: 5.5 + packet,
                delay: (band.packetDelay ?? 0) + packet * 0.8,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>
      ))}

      <motion.div
        className="absolute -bottom-12 left-[10%] h-[18rem] w-[80%] rounded-[50%]"
        style={{
          x: streamOffsetX,
          background:
            "radial-gradient(circle at center, rgba(34,211,238,0.16) 0%, rgba(99,102,241,0.14) 38%, transparent 72%)",
          filter: "blur(50px)",
        }}
        animate={reducedMotion ? undefined : { scale: [0.95, 1.08, 0.95] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(120deg, rgba(125,211,252,0.14) 0, transparent 40%), linear-gradient(300deg, rgba(167,139,250,0.1) 0, transparent 34%)" }} />
      <AmbientNoise />
      {sectionFades}
    </motion.div>
  );
}

export function ProjectsAiBackground({ sectionRef, scrollYProgress }: SectionBackgroundProps) {
  const { x, y, reducedMotion } = useSectionPointer(sectionRef);
  const sectionY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const fieldX = useTransform(x, [-1, 1], [-22, 22]);
  const fieldY = useTransform(y, [-1, 1], [-20, 20]);
  const waveRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const reverseWaveRotate = useTransform(waveRotate, (value) => value * -1);

  return (
    <motion.div className={backgroundShell} style={{ y: sectionY }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(8,15,32,0.9),_rgba(2,6,18,0.98)_60%,_#01040b_100%)]" />

      <motion.div className="absolute inset-0" style={{ x: fieldX, y: fieldY }}>
        <motion.div
          className="absolute left-[6%] top-[12%] h-[22rem] w-[42rem] rounded-[999px]"
          style={{
            rotate: waveRotate,
            background:
              "linear-gradient(90deg, rgba(34,211,238,0) 0%, rgba(34,211,238,0.12) 32%, rgba(99,102,241,0.16) 56%, rgba(192,132,252,0.08) 80%, rgba(34,211,238,0) 100%)",
            filter: "blur(54px)",
          }}
          animate={reducedMotion ? undefined : { scaleX: [0.9, 1.05, 0.92], x: [0, 18, -10] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-8%] bottom-[2%] h-[20rem] w-[36rem] rounded-[999px]"
          style={{
            rotate: reverseWaveRotate,
            background:
              "linear-gradient(90deg, rgba(96,165,250,0) 0%, rgba(96,165,250,0.12) 28%, rgba(167,139,250,0.12) 60%, rgba(34,211,238,0.08) 84%, rgba(96,165,250,0) 100%)",
            filter: "blur(58px)",
          }}
          animate={reducedMotion ? undefined : { scaleX: [1, 0.92, 1.04], x: [0, -18, 10] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
      </motion.div>

      {projectParticles.map((particle, index) => (
        <motion.div
          key={`${particle.left}-${particle.top}`}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
            x: fieldX,
            y: fieldY,
          }}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [-18, 18, -10],
                  x: index % 2 === 0 ? [-8, 10, -6] : [10, -12, 8],
                  opacity: [0.35, 0.92, 0.45],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay ?? 0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(96,165,250,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.1) 1px, transparent 1px)", backgroundSize: "96px 96px" }} />
      <AmbientNoise />
      {sectionFades}
    </motion.div>
  );
}

export function ContactAiBackground({ sectionRef, scrollYProgress }: SectionBackgroundProps) {
  const { x, y, reducedMotion } = useSectionPointer(sectionRef);
  const sectionY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const beaconX = useTransform(x, [-1, 1], [-36, 36]);
  const beaconY = useTransform(y, [-1, 1], [-24, 24]);
  const textHaloX = useTransform(x, [-1, 1], [-18, 18]);

  return (
    <motion.div className={backgroundShell} style={{ y: sectionY }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(16,21,37,0.88),_rgba(4,7,16,0.98)_55%,_#020309_100%)]" />

      <motion.div
        className="absolute left-[-10%] top-[12%] h-[18rem] w-[18rem] rounded-full bg-cyan-400/10 blur-[110px]"
        style={{ x: textHaloX }}
        animate={reducedMotion ? undefined : { scale: [0.92, 1.08, 0.96] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-1/2 top-[54%] h-0 w-0"
        style={{ x: beaconX, y: beaconY }}
      >
        <div className="absolute -left-[9rem] -top-[9rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,_rgba(96,165,250,0.2)_0%,_rgba(167,139,250,0.12)_34%,_transparent_72%)] blur-[40px]" />

        {[0, 1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute left-1/2 top-1/2 rounded-full border border-cyan-300/18"
            style={{
              width: 180 + ring * 82,
              height: 180 + ring * 82,
              marginLeft: -(90 + ring * 41),
              marginTop: -(90 + ring * 41),
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    scale: [0.96, 1.04, 0.98],
                    opacity: [0.16, 0.42, 0.16],
                  }
            }
            transition={{
              duration: 7 + ring * 1.4,
              delay: ring * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.9)]"
          animate={reducedMotion ? undefined : { scale: [1, 1.24, 1], opacity: [0.8, 1, 0.85] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {[0, 1, 2].map((orbit) => (
          <motion.div
            key={orbit}
            className="absolute left-1/2 top-1/2"
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{
              duration: 14 + orbit * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span
              className="absolute rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.45)]"
              style={{
                width: 6 + orbit,
                height: 6 + orbit,
                left: 74 + orbit * 34,
                top: orbit * 10 - 3,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <svg className="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M0 82 C14 70, 26 64, 42 60 S70 54, 100 20"
          fill="none"
          stroke="rgba(125,211,252,0.16)"
          strokeWidth="0.24"
          strokeLinecap="round"
          animate={reducedMotion ? undefined : { pathLength: [0.65, 1, 0.82], opacity: [0.18, 0.35, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M8 0 C24 18, 44 34, 60 48 S84 72, 100 88"
          fill="none"
          stroke="rgba(196,181,253,0.14)"
          strokeWidth="0.18"
          strokeLinecap="round"
          animate={reducedMotion ? undefined : { pathLength: [0.42, 0.95, 0.6], opacity: [0.12, 0.28, 0.16] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
      </svg>

      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(135deg, rgba(125,211,252,0.12) 0%, transparent 28%, transparent 72%, rgba(192,132,252,0.1) 100%)" }} />
      <AmbientNoise />
      {sectionFades}
    </motion.div>
  );
}
