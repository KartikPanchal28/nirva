"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import {
  BOTTLE_SPECS,
  GALLERY_THEMES,
  PAPER_FINISHES,
  QR_STYLE_OPTIONS,
} from "@/data/nirvaData";
import { LabelDesignConfig } from "./LabelCanvas";

interface InquiryDrawerProps {
  open: boolean;
  onClose: () => void;
  config: LabelDesignConfig;
}

const VENUE_TYPES = ["Cafe", "Hotel", "College", "Event", "Office"] as const;
const QUANTITY_TIERS = [
  "250 – 500 bottles (Tasting Run)",
  "500 – 2,000 bottles (Atelier Edition)",
  "2,000 – 10,000 bottles (House Supply)",
  "10,000+ bottles (Estate Contract)",
];

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  open,
  onClose,
  config,
}) => {
  const [venueType, setVenueType] = useState<string>("Cafe");
  const [quantity, setQuantity] = useState<string>(QUANTITY_TIERS[1]);
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const spec =
    BOTTLE_SPECS.find((b) => b.id === config.bottleSize) ?? BOTTLE_SPECS[1];
  const finish =
    PAPER_FINISHES.find((f) => f.id === config.paperFinish) ??
    PAPER_FINISHES[0];
  const theme =
    GALLERY_THEMES.find((t) => t.id === config.galleryTheme) ??
    GALLERY_THEMES[0];
  const qr =
    QR_STYLE_OPTIONS.find((q) => q.id === config.qrStyle) ??
    QR_STYLE_OPTIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 z-50 bg-obsidian/55 backdrop-blur-xs"
          />

          {/* Slide-Over Atelier Dossier Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xl bg-alabaster text-obsidian border-l border-obsidian/15 overflow-y-auto shadow-2xl"
            aria-label="Custom Design & Sample Request"
          >
            <div className="p-6 sm:p-10 flex flex-col min-h-full">
              {/* Top Bar */}
              <div className="flex items-start justify-between pb-6 border-b border-obsidian/12">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.26em] text-gold font-medium block mb-1.5">
                    ATELIER SAMPLE DOSSIER
                  </span>
                  <h3 className="font-serif text-3xl font-normal text-obsidian">
                    Commission Your Edition
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="p-2 border border-obsidian/20 text-obsidian hover:bg-obsidian hover:text-alabaster transition-colors cursor-pointer"
                  aria-label="Close drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <div className="my-auto py-12 text-center space-y-5">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-gold" />
                  <h4 className="font-serif text-3xl text-obsidian">
                    Dossier Received by Nirva
                  </h4>
                  <p className="text-sm text-obsidian/70 max-w-md mx-auto leading-relaxed">
                    Thank you,{" "}
                    <span className="text-obsidian font-medium">
                      {contactName || "Partner"}
                    </span>
                    . Our print directors have logged your{" "}
                    <span className="text-obsidian font-medium">
                      {spec.volume} · {finish.name}
                    </span>{" "}
                    specification for{" "}
                    <span className="text-obsidian font-medium">
                      {config.brandName || "your venue"}
                    </span>{" "}
                    and will dispatch physical paper swatches within 48 hours.
                  </p>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="mt-4 inline-flex items-center px-7 py-3 bg-obsidian text-alabaster text-[11px] uppercase tracking-[0.22em] cursor-pointer"
                  >
                    Return to Atelier
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-7 flex-1 flex flex-col justify-between space-y-7"
                >
                  {/* Automatic Studio Configuration Summary */}
                  <div className="border border-obsidian/15 bg-ivory p-5">
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-obsidian/55 mb-3">
                      CONFIGURED LABEL SPECIFICATION
                    </span>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-obsidian/50">
                          Bottle Size
                        </dt>
                        <dd className="font-medium text-obsidian mt-0.5">
                          {spec.volume} ({spec.labelDimensions})
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-obsidian/50">
                          Material Finish
                        </dt>
                        <dd className="font-medium text-obsidian mt-0.5">
                          {finish.name}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-obsidian/50">
                          Artwork Source
                        </dt>
                        <dd className="font-medium text-obsidian mt-0.5 truncate">
                          {config.artworkMode === "upload" &&
                          config.uploadedFileName
                            ? `Upload: ${config.uploadedFileName}`
                            : `Theme: ${theme.name}`}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-obsidian/50">
                          QR Co-Brand Seal
                        </dt>
                        <dd className="font-medium text-obsidian mt-0.5">
                          {qr.name}
                        </dd>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-obsidian/10">
                        <dt className="text-[10px] uppercase tracking-[0.16em] text-obsidian/50">
                          Brand Name &amp; Story Copy
                        </dt>
                        <dd className="font-medium text-obsidian mt-0.5">
                          {config.brandName || "Maison Aurelia"}
                        </dd>
                        {config.includeStory && (
                          <dd className="mt-1 font-serif italic text-sm text-obsidian/75">
                            &ldquo;{config.storyText}&rdquo;
                          </dd>
                        )}
                      </div>
                    </dl>
                  </div>

                  {/* Venue Type */}
                  <div>
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-obsidian/65 mb-2.5">
                      VENUE CLASSIFICATION
                    </span>
                    <div className="grid grid-cols-5 gap-2">
                      {VENUE_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setVenueType(type)}
                          className={`py-2 text-[10px] uppercase tracking-[0.16em] border transition-colors cursor-pointer ${
                            venueType === type
                              ? "bg-obsidian text-alabaster border-obsidian"
                              : "bg-ivory text-obsidian/70 border-obsidian/15 hover:border-obsidian"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Estimate */}
                  <div>
                    <label
                      htmlFor="quantity-select"
                      className="block text-[10px] uppercase tracking-[0.22em] text-obsidian/65 mb-2"
                    >
                      ESTIMATED RUN QUANTITY
                    </label>
                    <select
                      id="quantity-select"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full bg-ivory border border-obsidian/20 px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
                    >
                      {QUANTITY_TIERS.map((tier) => (
                        <option key={tier} value={tier}>
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Contact Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[10px] uppercase tracking-[0.22em] text-obsidian/65 mb-2"
                      >
                        YOUR NAME
                      </label>
                      <input
                        id="contact-name"
                        required
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Elena Rostova"
                        className="w-full bg-ivory border border-obsidian/20 px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[10px] uppercase tracking-[0.22em] text-obsidian/65 mb-2"
                      >
                        WORK EMAIL
                      </label>
                      <input
                        id="contact-email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@space.com"
                        className="w-full bg-ivory border border-obsidian/20 px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="sample-notes"
                      className="block text-[10px] uppercase tracking-[0.22em] text-obsidian/65 mb-2"
                    >
                      SHIPPING CITY OR BESPOKE NOTES
                    </label>
                    <textarea
                      id="sample-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Preferred cap finish, target event date, or Pantone reference..."
                      className="w-full bg-ivory border border-obsidian/20 px-4 py-3 text-xs text-obsidian focus:outline-none focus:border-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-obsidian text-alabaster text-[11px] uppercase tracking-[0.24em] font-medium flex items-center justify-between hover:bg-gold hover:text-obsidian transition-colors cursor-pointer"
                  >
                    <span>Dispatch Sample &amp; Proof Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
