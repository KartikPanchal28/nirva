"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { COLLABORATIONS, VenueCategory } from "@/data/nirvaData";

const CATEGORIES: VenueCategory[] = [
  "All",
  "Cafes",
  "Hotels",
  "Offices",
  "Colleges",
  "Events",
];

interface CollaborationsSectionProps {
  onOpenInquiry: () => void;
}

export const CollaborationsSection: React.FC<CollaborationsSectionProps> = ({
  onOpenInquiry,
}) => {
  const [activeCategory, setActiveCategory] = useState<VenueCategory>("All");

  const filtered =
    activeCategory === "All"
      ? COLLABORATIONS
      : COLLABORATIONS.filter((c) => c.category === activeCategory);

  return (
    <section
      id="collaborations"
      className="border-b border-obsidian/12 bg-alabaster paper-grain py-20 lg:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Section Header + Category Filter Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-obsidian/12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.28em] text-gold font-medium block mb-3">
              04 · SELECTED SPACES
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-obsidian leading-tight">
              Our Tie-Ups &amp; Selected Spaces
            </h2>
          </div>

          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter collaborations by venue category"
          >
            {CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-[10px] uppercase tracking-[0.22em] border transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-obsidian text-alabaster border-obsidian"
                      : "bg-transparent text-obsidian/70 border-obsidian/18 hover:border-obsidian"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((partner, idx) => (
            <motion.article
              key={partner.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="group border border-obsidian/12 bg-ivory/75 p-7 sm:p-8 flex flex-col justify-between min-h-[290px] hover:border-obsidian/45 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-obsidian/55 pb-4 border-b border-obsidian/10">
                  <span>{partner.category}</span>
                  <span>{partner.city}</span>
                </div>

                {/* Monochrome Atelier Crest Placeholder */}
                <div className="mt-7 flex items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-obsidian group-hover:text-gold transition-colors">
                    {partner.name}
                  </h3>
                  <span className="w-8 h-8 border border-obsidian/15 flex items-center justify-center text-obsidian/50 group-hover:border-gold group-hover:text-obsidian transition-colors shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-obsidian/68 leading-relaxed font-light">
                  {partner.editionNote}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-obsidian/10 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-obsidian/60">
                <span>{partner.bottleUsed} Vessel</span>
                <span>{partner.finishUsed}</span>
              </div>
            </motion.article>
          ))}

          {/* Distinguished Founding Partner Invitation Card */}
          <motion.button
            type="button"
            onClick={onOpenInquiry}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="text-left border border-obsidian bg-obsidian text-alabaster p-7 sm:p-8 flex flex-col justify-between min-h-[290px] group hover:border-gold transition-all duration-300 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-gold pb-4 border-b border-alabaster/14">
                <span>OPEN INVITATION</span>
                <span>2026 COMMISSION</span>
              </div>

              <h3 className="mt-7 font-serif italic text-3xl sm:text-4xl font-normal text-alabaster leading-tight">
                Become a Founding Partner
              </h3>

              <p className="mt-4 text-xs sm:text-sm text-alabaster/75 leading-relaxed font-light">
                Reserve bespoke print runs for your cafe, boutique hotel,
                studio, campus, or upcoming cultural gathering—complete with
                complimentary tactile paper samples.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-alabaster/14 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-gold group-hover:text-alabaster transition-colors">
              <span>Initiate Collaboration</span>
              <Plus className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
