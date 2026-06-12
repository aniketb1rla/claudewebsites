"use client";

import { motion } from "framer-motion";
import { scaleReveal } from "@/lib/animations";

interface SectionImageProps {
  src: string | null;
  alt: string;
  className?: string;
}

/**
 * Image surface with a graceful fallback: when generation fails or the
 * key is absent, a quiet slate gradient stands in so layouts stay intact.
 */
export default function SectionImage({ src, alt, className = "" }: SectionImageProps) {
  return (
    <motion.div
      variants={scaleReveal}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div
          aria-label={alt}
          role="img"
          className="h-full w-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400"
        />
      )}
    </motion.div>
  );
}
