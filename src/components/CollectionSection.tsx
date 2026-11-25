"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Ruler, Layers, Check } from "lucide-react";
import { BOTTLE_SPECS, BottleSizeId } from "@/data/nirvaData";
import { BottleVisual } from "./BottleVisual";
import { LabelDesignConfig } from "./LabelCanvas";

interface CollectionSectionProps {
  liveConfig: LabelDesignConfig;
  onSelectSizeForStudio: (sizeId: BottleSizeId) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  liveConfig,
  onSelectSizeForStudio,
}) => {
  const [selectedId, setSelectedId] = useState<BottleSizeId>("500ml");
  const activeSpec =
    BOTTLE_SPECS.find((b) => b.id === selectedId) ?? BOTTLE_SPECS[1];

  return (
    <section
      id="collection"
      className="border-b border-obsidian/12 bg-ivory py-20 lg:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-obsidian/12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.28em] text-gold font-medium block mb-3">
              01 · ARCHITECTURAL VESSELS
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-obsidian leading-tight">
              The Bottle Collection
            </h2>
          </div>
          <p className="max-w-md text-sm text-obsidian/68 leading-relaxed">
            Four calibrated proportions designed to anchor every hospitality
            and institutional table. Select a silhouette to inspect label
            geometry, cap finishes, and venue pairings.
          </p>
        </div>

        {/* Main Showcase Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left: Proportional Architectural Silhouette Lineup */}
          <div className="lg:col-span-7 border border-obsidian/12 bg-alabaster/70 p-6 sm:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-obsidian/55 mb-8">
              <span>PROPORTIONAL SCALE COMPARISON</span>
              <span>CLICK SILHOUETTE TO INSPECT</span>
            </div>

            {/* Bottle Alignment Baseline */}
            <div className="grid grid-cols-4 gap-2 sm:gap-5 items-end pt-8 pb-4 border-b border-obsidian/15 min-h-[340px] sm:min-h-[410px]">
              {BOTTLE_SPECS.map((bottle) => {
                const isActive = bottle.id === selectedId;
                return (
                  <button
                    key={bottle.id}
                    type="button"
                    onClick={() => setSelectedId(bottle.id)}
                    className={`group flex flex-col items-center justify-end text-center transition-all duration-500 cursor-pointer focus:outline-none ${
                      isActive
                        ? "opacity-100 scale-[1.04]"
                        : "opacity-55 hover:opacity-85"
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="relative flex justify-center w-full">
                      {isActive && (
                        <motion.div
                          layoutId="active-bottle-aura"
                          className="absolute -inset-x-2 -top-3 -bottom-2 border border-gold/55 bg-gold/5 pointer-events-none"
                          transition={{
                            type: "spring",
                            stiffness: 240,
                            damping: 26,
                          }}
                        />
                      )}
                      <BottleVisual
                        config={{ ...liveConfig, bottleSize: bottle.id }}
                        sizeId={bottle.id}
                        scale={0.76}
                        showShadow={false}
                        capFinish={isActive ? "champagne" : "obsidian"}
                      />
                    </div>

                    <div className="mt-5 pt-3 w-full">
                      <span
                        className={`block font-serif text-lg sm:text-xl transition-colors ${
                          isActive ? "text-obsidian" : "text-obsidian/65"
                        }`}
                      >
                        {bottle.id}
                      </span>
                      <span className="block text-[9px] uppercase tracking-[0.2em] text-obsidian/50 mt-0.5">
                        {bottle.heightMm}mm
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Size Quick-Switch Tabs */}
            <div className="mt-6 grid grid-cols-4 gap-2">
              {BOTTLE_SPECS.map((bottle) => {
                const isActive = bottle.id === selectedId;
                return (
                  <button
                    key={bottle.id}
                    type="button"
                    onClick={() => setSelectedId(bottle.id)}
                    className={`py-2.5 text-[10px] uppercase tracking-[0.2em] border transition-all cursor-pointer ${
                      isActive
                        ? "bg-obsidian text-alabaster border-obsidian"
                        : "bg-transparent text-obsidian/70 border-obsidian/15 hover:border-obsidian/45"
                    }`}
                  >
                    {bottle.volume}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Smoothly Transitioning Specification Panel */}
          <div className="lg:col-span-5 border border-obsidian/12 bg-obsidian text-alabaster p-8 sm:p-10 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpec.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-alabaster/14">
                    <span className="text-[10px] uppercase tracking-[0.26em] text-gold">
                      VESSEL SPECIFICATION · {activeSpec.volume}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-alabaster/55">
                      Ø {activeSpec.diameterMm} × {activeSpec.heightMm} mm
                    </span>
                  </div>

                  <h3 className="mt-7 font-serif text-3xl sm:text-4xl font-normal text-alabaster">
                    {activeSpec.editionName}
                  </h3>

                  <p className="mt-4 text-sm text-alabaster/75 leading-relaxed font-light">
                    {activeSpec.tastingNote}
                  </p>

                  {/* Ideal Venues */}
                  <div className="mt-8 pt-6 border-t border-alabaster/12">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-alabaster/50 block mb-2">
                      IDEAL VENUES
                    </span>
                    <p className="font-serif italic text-xl text-alabaster">
                      {activeSpec.idealVenues}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeSpec.venueTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] border border-alabaster/20 text-alabaster/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Label Dimensions & Cap Finishes */}
                  <div className="mt-7 pt-6 border-t border-alabaster/12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-alabaster/50 mb-2">
                        <Ruler className="w-3.5 h-3.5 text-gold" />
                        <span>LABEL DIMENSIONS</span>
                      </div>
                      <p className="text-base font-medium text-alabaster">
                        {activeSpec.labelDimensions}
                      </p>
                      <p className="text-[11px] text-alabaster/55 mt-1">
                        {activeSpec.casePack}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-alabaster/50 mb-2">
                        <Layers className="w-3.5 h-3.5 text-gold" />
                        <span>CAP FINISH OPTIONS</span>
                      </div>
                      <ul className="space-y-1.5">
                        {activeSpec.capFinishes.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-center gap-2 text-xs text-alabaster/85"
                          >
                            <Check className="w-3 h-3 text-gold shrink-0" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-alabaster/14">
                  <button
                    type="button"
                    onClick={() => onSelectSizeForStudio(activeSpec.id)}
                    className="w-full py-4 px-6 bg-gold text-obsidian text-[11px] uppercase tracking-[0.24em] font-medium flex items-center justify-between hover:bg-alabaster transition-colors duration-300 cursor-pointer"
                  >
                    <span>Customize This Size ({activeSpec.id})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
