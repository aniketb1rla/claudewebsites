"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, fadeIn } from "@/lib/animations";

interface SectionProps {
  imageSrc: string | null;
}

/**
 * Page 2 — Apex Heritage Elevations. UK roofing specialists.
 * Full-bleed image with a dark glass overlay; copy sits on the imagery.
 */
const ApexHeritage = forwardRef<HTMLElement, SectionProps>(
  function ApexHeritage({ imageSrc }, ref) {
    return (
      <section
        ref={ref}
        className="relative flex h-screen w-full items-end overflow-hidden bg-slate-800"
      >
        {imageSrc ? (
          <motion.img
            src={imageSrc}
            alt="Slate roofline meeting brushed aluminium against an overcast sky"
            className="absolute inset-0 h-full w-full object-cover"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-900" />
        )}
        {/* Tonal scrim for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-slate-900/10" />

        <nav className="absolute left-1/2 top-8 z-10 flex w-[min(92%,64rem)] -translate-x-1/2 items-center justify-between rounded-full border border-white/15 bg-white/10 px-7 py-3.5 backdrop-blur-xl">
          <span className="text-sm font-semibold tracking-tight text-white">
            Apex Heritage Elevations
          </span>
          <div className="hidden items-center gap-8 text-xs font-medium text-slate-300 md:flex">
            <span>Heritage</span>
            <span>Commercial</span>
            <span>Surveys</span>
          </div>
          <button className="rounded-full bg-white px-5 py-2 text-xs font-medium text-slate-900 transition-colors hover:bg-slate-200">
            Request survey
          </button>
        </nav>

        <motion.div
          className="relative mx-auto w-[min(92%,72rem)] pb-20 md:pb-28"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-slate-300"
          >
            Master Roofing — 02
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="max-w-3xl text-5xl font-light leading-[1.02] tracking-tight text-white md:text-7xl"
          >
            Craft, <span className="font-medium">elevated.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-lg text-base leading-relaxed text-slate-300"
          >
            Four generations of slate work across the United Kingdom. We
            restore listed rooflines and engineer new ones — to the millimetre,
            for the next hundred years.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-12 gap-y-6 border-t border-white/15 pt-8"
          >
            {[
              ["120+", "Listed restorations"],
              ["1908", "Established"],
              ["50yr", "Workmanship guarantee"],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="text-2xl font-light tracking-tight text-white">
                  {stat}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

export default ApexHeritage;
