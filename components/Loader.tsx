"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface LoaderProps {
  /** Real load progress, 0–1, driven by the asset service. */
  progress: number;
  /** Generated glass-texture background — fades in once it resolves. */
  backgroundSrc: string | null;
  /** When true the loader fades out (curtain takes over beneath it). */
  lifted: boolean;
}

/**
 * Global pre-loader: an oversized Fraunces counter and a gold hairline bar
 * that glide toward the real image-generation progress, over a near-black
 * void with the generated glass texture ghosted behind.
 */
export default function Loader({ progress, backgroundSrc, lifted }: LoaderProps) {
  const value = useMotionValue(0);
  const display = useTransform(value, (v) => `${Math.round(v)}`);
  const barWidth = useTransform(value, (v) => `${v}%`);

  useEffect(() => {
    const controls = animate(value, progress * 100, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [progress, value]);

  return (
    <div
      className={`loader ${lifted ? "lift" : ""}`}
      role="status"
      aria-label="Loading"
    >
      {backgroundSrc && (
        <motion.img
          src={backgroundSrc}
          alt=""
          className="lbg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.16 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
      )}
      <div className="lwrap">
        <div className="lk">Landing Page Showcase</div>
        <div className="lnum">
          <motion.span>{display}</motion.span>
        </div>
        <div className="lbar">
          <motion.i style={{ width: barWidth }} />
        </div>
        <div className="lcap">Three brands · Three industries</div>
      </div>
    </div>
  );
}
