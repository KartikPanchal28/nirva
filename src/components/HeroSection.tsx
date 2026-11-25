"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { BottleVisual } from "./BottleVisual";
import { LabelDesignConfig } from "./LabelCanvas";

interface HeroSectionProps {
  liveConfig: LabelDesignConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ liveConfig }) => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-18 flex items-stretch border-b border-obsidian/12 bg-alabaster paper-grain"
    >
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12">
        {/* Left Editorial Column */}
        <div className="lg:col-span-6 px-6 sm:px-10 lg:px-14 py-14 lg:py-20 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-obsidian/12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="my-auto"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-8 h-[1px] bg-gold" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-obsidian/70 font-medium">
                BESPOKE HYDRATION FOR DISTINCTIVE SPACES
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl xl:text-[4.6rem] font-normal leading-[1.02] tracking-[-0.01em] text-obsidian">
              Your Brand,{" "}
              <span className="italic font-light text-obsidian/85">
                Poured with Intention.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-sm sm:text-base leading-relaxed text-obsidian/72 font-light">
              Nirva pairs mineral purity with archival printmaking. We craft
              custom-labeled glass and studio vessels tailored for specialty
              cafes, boutique hotels, corporate offices, colleges, and curated
              events.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo("#label-studio")}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-obsidian text-alabaster text-[11px] uppercase tracking-[0.22em] border border-obsidian hover:bg-gold hover:text-obsidian hover:border-gold transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Open Label Studio
              </button>

              <button
                type="button"
                onClick={() => scrollTo("#collection")}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-obsidian text-[11px] uppercase tracking-[0.22em] border border-obsidian/25 hover:border-obsidian transition-all duration-300 cursor-pointer"
              >
                Explore Bottle Sizes
                <ArrowDownRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Bottom Architectural Metadata Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-12 pt-6 border-t border-obsidian/12 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-[0.2em] text-obsidian/60"
          >
            <div>
              <span className="block text-obsidian font-medium mb-0.5">
                04 FORMATS
              </span>
              250ML · 500ML · 750ML · 1L
            </div>
            <div>
              <span className="block text-obsidian font-medium mb-0.5">
                ARCHIVAL STOCKS
              </span>
              COTTON · LINEN · FOIL
            </div>
            <div>
              <span className="block text-obsidian font-medium mb-0.5">
                CO-BRANDED QR
              </span>
              THEME-MATCHED SEAL
            </div>
          </motion.div>
        </div>

        {/* Right Interactive Bottle Centerpiece */}
        <div className="lg:col-span-6 relative bg-[#ECE7DD]/70 flex flex-col items-center justify-center px-6 py-16 lg:py-12 overflow-hidden">
          {/* Subtle Architectural Backdrop Lines */}
          <div className="pointer-events-none absolute inset-8 border border-obsidian/10" />
          <div className="pointer-events-none absolute top-1/2 left-0 right-0 h-[1px] bg-obsidian/6" />
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-[1px] bg-obsidian/6" />

          {/* Ambient Radial Studio Glow */}
          <div
            className="pointer-events-none absolute w-[380px] h-[380px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(250,248,244,0.85) 0%, rgba(236,231,221,0) 72%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <BottleVisual
              config={liveConfig}
              sizeId={liveConfig.bottleSize}
              interactiveTilt={true}
              capFinish="champagne"
              scale={1.06}
            />

            <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-obsidian/60">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Hover vessel to inspect label finish &amp; sheen</span>
            </div>
          </motion.div>

          {/* Corner Specimen Tag */}
          <div className="absolute bottom-11 right-11 hidden sm:block text-right">
            <p className="text-[9px] uppercase tracking-[0.24em] text-obsidian/50">
              LIVE STUDIO SPECIMEN
            </p>
            <p className="font-serif italic text-sm text-obsidian/80">
              {liveConfig.brandName || "Maison Aurelia"} · {liveConfig.bottleSize}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
