"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

export interface PanelMeta {
  key: string;
  name: string;
  tone: "dark" | "light";
}

interface ChromeProps {
  panels: PanelMeta[];
  index: number;
  /** Dwell progress of the active panel, 0–1, driven by the autoplay loop. */
  fillProgress: MotionValue<number>;
  playing: boolean;
  hintHidden: boolean;
  onTogglePlay: () => void;
  onSelect: (n: number) => void;
}

/**
 * Fixed overlay UI: top progress segments (accented per brand), right rail
 * dots with labels, autoplay play/pause, page counter, and the scroll hint.
 * Tone (light/dark) follows the active panel via the body class.
 */
export default function Chrome({
  panels,
  index,
  fillProgress,
  playing,
  hintHidden,
  onTogglePlay,
  onSelect,
}: ChromeProps) {
  const activeWidth = useTransform(fillProgress, (v) => `${v * 100}%`);

  return (
    <>
      {/* Side navigation rail buttons removed */}

      <div className={`hint tone ${hintHidden ? "hide" : ""}`}>
        <span className="key">↑</span>
        <span className="key">↓</span> or scroll to move between pages
      </div>
    </>
  );
}
