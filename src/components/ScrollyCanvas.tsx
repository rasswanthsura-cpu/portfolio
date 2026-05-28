"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Overlay from "./Overlay";

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const numFrames = 75; // Pre-calculated size from ezgif-split

  // We map scroll progress (0...1) to our frame index range (0...74)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, numFrames - 1]);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  // Preload images into memory
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < numFrames; i++) {
      const img = new Image();
      // Format found locally is: frame_00_delay-0.066s.png
      const paddedIndex = i.toString().padStart(2, "0");
      img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === numFrames) {
          setImages(loadedImages);
        }
      };
      // fallback in case of load failure to keep array intact
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === numFrames) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Main rendering logic to make the images act like a canvas cover
  const renderFrame = (index: number) => {
    if (images.length === 0 || !canvasRef.current) return;
    
    // Safety clamp to ensure valid array indexing
    const safeIndex = Math.min(images.length - 1, Math.max(0, Math.round(index)));
    const img = images[safeIndex];

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx || !img.complete || img.naturalHeight === 0) return;

    // object-fit: cover implementation on Canvas
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Keep canvas sized precisely to the window size
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // High DPI displays handling could go here if needed, keeping 1:1 for now
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        // Re-render current frame on resize
        renderFrame(frameIndex.get());
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial trigger

    return () => window.removeEventListener("resize", handleResize);
  }, [images]); // Re-attach when images array is populated

  // Efficient framer-motion subscriber
  useMotionValueEvent(frameIndex, "change", (latest) => {
    renderFrame(latest);
  });

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-background w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Rendered frames */}
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Dark mask overlay optional: <div className="absolute inset-0 bg-black/40 z-[5]" /> */}
        
        {/* Parallax typography layers */}
        <div className="absolute inset-0 z-10">
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}
