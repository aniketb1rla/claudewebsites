"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { EASE_OUT_SOFT } from "@/lib/animations";

interface PreloaderProps {
  /** Real load progress, 0–1, driven by the asset service. */
  progress: number;
  /** Optional generated background — fades in as soon as it resolves. */
  backgroundSrc: string | null;
}

/**
 * Minimal global pre-loader: a 0–100 counter and a hairline progress bar
 * over a neutral void. The counter glides toward the real progress value
 * rather than jumping, so the load always reads as one continuous motion.
 */
export default function Preloader({ progress, backgroundSrc }: PreloaderProps) {
  const value = useMotionValue(0);
  const display = useTransform(value, (v) => `${Math.round(v)}`);
  const barScale = useTransform(value, (v) => v / 100);

  useEffect(() => {
    const controls = animate(value, progress * 100, {
      duration: 1.1,
      ease: EASE_OUT_SOFT,
    });
    return controls.stop;
  }, [progress, value]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f7f7f6]"
      exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
      aria-label="Loading"
      role="status"
    >
      {backgroundSrc && (
        <motion.img
          src={backgroundSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      )}

      {/* Liquid-glass veil keeps the counter legible over the imagery */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl" />

      <div className="relative flex flex-col items-center gap-10">
        <div className="flex items-baseline gap-1 tabular-nums text-neutral-900">
          <motion.span className="text-7xl font-light tracking-tight md:text-8xl">
            {display}
          </motion.span>
          <span className="text-xl font-light text-neutral-400">%</span>
        </div>

        <div className="h-px w-56 overflow-hidden bg-neutral-200 md:w-72">
          <motion.div
            className="h-full w-full origin-left bg-neutral-900"
            style={{ scaleX: barScale }}
          />
        </div>

        <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-neutral-400">
          Preparing assets
        </p>
      </div>
    </motion.div>
  );
}
