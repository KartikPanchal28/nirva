"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LABEL_ANATOMY_HOTSPOTS } from "@/data/nirvaData";
import { LabelCanvas, LabelDesignConfig } from "./LabelCanvas";

interface AnatomySectionProps {
  liveConfig: LabelDesignConfig;
}

export const AnatomySection: React.FC<AnatomySectionProps> = ({
  liveConfig,
}) => {
  const [activeId, setActiveId] = useState<string>(
    LABEL_ANATOMY_HOTSPOTS[0].id
  );

  const activeHotspot =
    LABEL_ANATOMY_HOTSPOTS.find((h) => h.id === activeId) ??
    LABEL_ANATOMY_HOTSPOTS[0];

  const highlightZone = activeId as
    | "identity-canvas"
    | "story-column"
    | "nirva-qr";

  return (
    <section
      id="craftsmanship"
      className="border-b border-obsidian/12 bg-alabaster paper-grain py-20 lg:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-obsidian/12 items-end">
          <div className="lg:col-span-7">
            <span className="text-[10px] uppercase tracking-[0.28em] text-gold font-medium block mb-3">
              02 · THE SIGNATURE DETAILS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-obsidian leading-tight">
              Anatomy of a Nirva Label
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm text-obsidian/70 leading-relaxed">
              Every Nirva label balances uninterrupted brand sovereignty with
              storytelling craft—anchoring your identity while subtly linking
              curious guests back to the provenance of the pour.
            </p>
          </div>
        </div>

        {/* Interactive Close-Up Showcase */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Close-Up Label Canvas with 3 Hotspots */}
          <div className="lg:col-span-7">
            <div className="relative border border-obsidian/15 bg-[#EAE4D8] p-6 sm:p-12">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-obsidian/55 mb-5">
                <span>ARCHIVAL MACRO STUDY · 1:1.4 RATIO</span>
                <span>SELECT A HOTSPOT TO ISOLATE ZONE</span>
              </div>

              <div className="relative aspect-[16/9] w-full shadow-[0_24px_48px_rgba(14,14,14,0.16)] border border-obsidian/15">
                <LabelCanvas
                  config={{
                    ...liveConfig,
                    includeStory: true,
                  }}
                  mode="flat"
                  highlightZone={highlightZone}
                  className="w-full h-full"
                />

                {/* 3 Clickable Hotspots */}
                {LABEL_ANATOMY_HOTSPOTS.map((spot) => {
                  const isActive = spot.id === activeId;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setActiveId(spot.id)}
                      style={{ left: spot.position.x, top: spot.position.y }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer focus:outline-none"
                      aria-label={`Inspect ${spot.title}`}
                    >
                      <span
                        className={`relative flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                          isActive
                            ? "bg-obsidian text-alabaster border-gold scale-110 shadow-lg"
                            : "bg-alabaster/95 text-obsidian border-obsidian/40 hover:border-obsidian hover:scale-105"
                        }`}
                      >
                        <span className="text-[10px] font-medium tracking-wider">
                          {spot.number}
                        </span>
                        {isActive && (
                          <span className="absolute -inset-1.5 rounded-full border border-gold/60 animate-ping" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Zone Legend */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.2em] text-obsidian/60">
                <span>ACTIVE ZONE: {activeHotspot.title}</span>
                <span>2400 DPI ARCHIVAL OFFSET</span>
              </div>
            </div>
          </div>

          {/* Right: Clickable Architectural Spec Accordion / Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {LABEL_ANATOMY_HOTSPOTS.map((spot) => {
              const isActive = spot.id === activeId;
              return (
                <motion.button
                  key={spot.id}
                  type="button"
                  onClick={() => setActiveId(spot.id)}
                  layout
                  className={`text-left p-6 sm:p-7 border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-obsidian text-alabaster border-obsidian"
                      : "bg-ivory/70 text-obsidian border-obsidian/12 hover:border-obsidian/35"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span
                        className={`text-[10px] uppercase tracking-[0.26em] block mb-1.5 ${
                          isActive ? "text-gold" : "text-obsidian/50"
                        }`}
                      >
                        {spot.number} · {spot.subtitle}
                      </span>
                      <h3 className="font-serif text-2xl font-normal">
                        {spot.title}
                      </h3>
                    </div>

                    <span
                      className={`w-6 h-6 flex items-center justify-center border text-[10px] shrink-0 ${
                        isActive
                          ? "border-gold text-gold"
                          : "border-obsidian/20 text-obsidian/55"
                      }`}
                    >
                      {isActive ? "—" : "+"}
                    </span>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="mt-4 pt-4 border-t border-alabaster/14"
                    >
                      <p className="text-sm text-alabaster/78 leading-relaxed font-light">
                        {spot.description}
                      </p>
                      <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-gold/90">
                        {spot.specDetail}
                      </p>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
