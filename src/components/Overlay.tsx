"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Section 1: 0% to 30% scroll
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);

  // Section 2: 20% to 50% scroll
  const y2 = useTransform(scrollYProgress, [0.2, 0.4, 0.5], [100, 0, -100]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);

  // Section 3: 50% to 80% scroll
  const y3 = useTransform(scrollYProgress, [0.5, 0.7, 0.8], [100, 0, -100]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pointer-events-none text-white p-8">
      {/* Section 1 */}
      <motion.div 
        style={{ y: y1, opacity: opacity1 }}
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mix-blend-difference drop-shadow-xl text-white">
          Rasswanth S<br/>
          <span className="text-neutral-300 font-normal text-3xl md:text-4xl translate-y-4 block">Building intelligent AI-powered <br/> experiences.</span>
        </h1>
      </motion.div>

      {/* Section 2 */}
      <motion.div 
        style={{ y: y2, opacity: opacity2 }}
        className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2 max-w-lg"
      >
        <h2 className="text-3xl md:text-5xl font-semibold mix-blend-difference drop-shadow-lg text-white leading-tight">
          Modern Web.<br/>Intelligent AI.
        </h2>
        <p className="mt-4 text-xl text-neutral-200 mix-blend-difference drop-shadow-md">
          I create visually stunning, high-performance web applications combined with intelligent AI systems.
        </p>
      </motion.div>

      {/* Section 3 */}
      <motion.div 
        style={{ y: y3, opacity: opacity3 }}
        className="absolute right-8 md:right-24 top-[40%] text-right max-w-md"
      >
        <h2 className="text-3xl md:text-5xl font-semibold mix-blend-difference drop-shadow-md pb-4 text-white">
          Powered by RAG
        </h2>
        <p className="text-xl text-neutral-200 mix-blend-difference drop-shadow-md">
          Leveraging modern technologies like Next.js and Retrieval-Augmented Generation to solve real problems.
        </p>
      </motion.div>
    </div>
  );
}
