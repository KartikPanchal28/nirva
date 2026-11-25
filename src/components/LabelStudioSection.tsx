"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Palette,
  Sparkles,
  Trash2,
  ArrowRight,
  SlidersHorizontal,
  Eye,
} from "lucide-react";
import {
  BOTTLE_SPECS,
  GALLERY_THEMES,
  PAPER_FINISHES,
  QR_STYLE_OPTIONS,
  BottleSizeId,
  GalleryThemeId,
  PaperFinishId,
  QrStyleId,
} from "@/data/nirvaData";
import { BottleVisual } from "./BottleVisual";
import { LabelCanvas, LabelDesignConfig } from "./LabelCanvas";
import { CustomQrCode } from "./CustomQrCode";

interface LabelStudioSectionProps {
  config: LabelDesignConfig;
  onChange: React.Dispatch<React.SetStateAction<LabelDesignConfig>>;
  onOpenInquiry: () => void;
}

export const LabelStudioSection: React.FC<LabelStudioSectionProps> = ({
  config,
  onChange,
  onOpenInquiry,
}) => {
  const [previewMode, setPreviewMode] = useState<"bottle" | "flat">("bottle");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeSpec =
    BOTTLE_SPECS.find((b) => b.id === config.bottleSize) ?? BOTTLE_SPECS[1];
  const activeFinish =
    PAPER_FINISHES.find((f) => f.id === config.paperFinish) ??
    PAPER_FINISHES[0];
  const activeTheme =
    GALLERY_THEMES.find((t) => t.id === config.galleryTheme) ??
    GALLERY_THEMES[0];

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange((prev) => ({
          ...prev,
          artworkMode: "upload",
          uploadedImageUrl: reader.result as string,
          uploadedFileName: file.name,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  return (
    <section
      id="label-studio"
      className="border-b border-obsidian/12 bg-ivory py-20 lg:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-obsidian/12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.28em] text-gold font-medium block mb-3">
              03 · BESPOKE ATELIER CONFIGURATOR
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-obsidian leading-tight">
              Interactive Custom Label Studio
            </h2>
          </div>
          <p className="max-w-md text-sm text-obsidian/70 leading-relaxed">
            Compose your label in real time. Upload print-ready artwork or
            tailor an archival Nirva house theme, select tactile stock, and
            preview your bottle before requesting physical proofs.
          </p>
        </div>

        {/* Split-Screen Configurator */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT PANEL: Sticky Live Preview */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 border border-obsidian/12 bg-[#ECE7DD]/80 p-6 sm:p-8 flex flex-col justify-between min-h-[560px]">
            {/* Preview Header & View Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-obsidian/12">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-obsidian/65">
                <Eye className="w-3.5 h-3.5 text-gold" />
                <span>LIVE STUDIO PREVIEW</span>
              </div>

              <div
                className="inline-flex border border-obsidian/20 bg-alabaster p-0.5"
                role="tablist"
                aria-label="Preview view mode"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={previewMode === "bottle"}
                  onClick={() => setPreviewMode("bottle")}
                  className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                    previewMode === "bottle"
                      ? "bg-obsidian text-alabaster"
                      : "text-obsidian/65 hover:text-obsidian"
                  }`}
                >
                  Bottle View
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={previewMode === "flat"}
                  onClick={() => setPreviewMode("flat")}
                  className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                    previewMode === "flat"
                      ? "bg-obsidian text-alabaster"
                      : "text-obsidian/65 hover:text-obsidian"
                  }`}
                >
                  Flat Label View
                </button>
              </div>
            </div>

            {/* Preview Stage */}
            <div className="relative flex-1 flex items-center justify-center py-10 min-h-[410px]">
              <div
                className="pointer-events-none absolute inset-4 border border-obsidian/8"
                aria-hidden="true"
              />

              <AnimatePresence mode="wait">
                {previewMode === "bottle" ? (
                  <motion.div
                    key="bottle-view"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <BottleVisual
                      config={config}
                      sizeId={config.bottleSize}
                      interactiveTilt={true}
                      capFinish="champagne"
                      scale={1.02}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="flat-view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-[520px] px-2"
                  >
                    <div className="mb-3 flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-obsidian/55">
                      <span>FLAT DIE-LINE · {activeSpec.labelDimensions}</span>
                      <span>{activeFinish.name}</span>
                    </div>
                    <div className="aspect-[16/9] w-full border border-obsidian/20 shadow-[0_24px_48px_rgba(14,14,14,0.16)]">
                      <LabelCanvas
                        config={config}
                        mode="flat"
                        className="w-full h-full"
                      />
                    </div>
                    <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-obsidian/55">
                      {activeFinish.sheenHint} · {activeFinish.weight}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Live Specification Strip */}
            <div className="pt-5 border-t border-obsidian/12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] uppercase tracking-[0.18em]">
              <div>
                <span className="block text-obsidian/50 mb-0.5">FORMAT</span>
                <span className="text-obsidian font-medium">
                  {activeSpec.volume}
                </span>
              </div>
              <div>
                <span className="block text-obsidian/50 mb-0.5">ARTWORK</span>
                <span className="text-obsidian font-medium truncate block">
                  {config.artworkMode === "upload" && config.uploadedFileName
                    ? config.uploadedFileName
                    : activeTheme.name}
                </span>
              </div>
              <div>
                <span className="block text-obsidian/50 mb-0.5">STOCK</span>
                <span className="text-obsidian font-medium truncate block">
                  {activeFinish.name}
                </span>
              </div>
              <div>
                <span className="block text-obsidian/50 mb-0.5">QR SEAL</span>
                <span className="text-obsidian font-medium">
                  {
                    QR_STYLE_OPTIONS.find((q) => q.id === config.qrStyle)
                      ?.name
                  }
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Design Controls */}
          <div className="lg:col-span-6 space-y-8">
            {/* 1. Bottle Size Selector */}
            <div className="border border-obsidian/12 bg-alabaster/60 p-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-[10px] uppercase tracking-[0.24em] text-obsidian/65 font-medium">
                  01 · BOTTLE FORMAT
                </label>
                <span className="text-[10px] uppercase tracking-[0.18em] text-gold">
                  {activeSpec.labelDimensions}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {BOTTLE_SPECS.map((bottle) => {
                  const active = config.bottleSize === bottle.id;
                  return (
                    <button
                      key={bottle.id}
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          bottleSize: bottle.id as BottleSizeId,
                        }))
                      }
                      className={`py-3 px-2 border text-center transition-all cursor-pointer ${
                        active
                          ? "bg-obsidian text-alabaster border-obsidian"
                          : "bg-ivory text-obsidian border-obsidian/15 hover:border-obsidian/45"
                      }`}
                    >
                      <span className="block font-serif text-lg leading-none">
                        {bottle.id}
                      </span>
                      <span
                        className={`block text-[9px] uppercase tracking-[0.15em] mt-1 ${
                          active ? "text-gold" : "text-obsidian/50"
                        }`}
                      >
                        {bottle.editionName.replace("The ", "")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Artwork Mode Toggle */}
            <div className="border border-obsidian/12 bg-alabaster/60 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <span className="text-[10px] uppercase tracking-[0.24em] text-obsidian/65 font-medium">
                  02 · ARTWORK DIRECTION
                </span>
                <div className="inline-flex border border-obsidian/20 bg-ivory p-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({ ...prev, artworkMode: "gallery" }))
                    }
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer ${
                      config.artworkMode === "gallery"
                        ? "bg-obsidian text-alabaster"
                        : "text-obsidian/65 hover:text-obsidian"
                    }`}
                  >
                    <Palette className="w-3 h-3" />
                    Nirva Luxury Gallery
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({ ...prev, artworkMode: "upload" }))
                    }
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-all cursor-pointer ${
                      config.artworkMode === "upload"
                        ? "bg-obsidian text-alabaster"
                        : "text-obsidian/65 hover:text-obsidian"
                    }`}
                  >
                    <Upload className="w-3 h-3" />
                    Upload Your Own Print
                  </button>
                </div>
              </div>

              {config.artworkMode === "gallery" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GALLERY_THEMES.map((theme) => {
                    const active = config.galleryTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() =>
                          onChange((prev) => ({
                            ...prev,
                            artworkMode: "gallery",
                            galleryTheme: theme.id as GalleryThemeId,
                          }))
                        }
                        className={`flex items-center gap-3.5 p-3.5 border text-left transition-all cursor-pointer ${
                          active
                            ? "border-obsidian bg-ivory ring-1 ring-gold"
                            : "border-obsidian/12 bg-ivory/60 hover:border-obsidian/40"
                        }`}
                      >
                        {/* Swatch Preview */}
                        <span
                          className="w-10 h-10 shrink-0 border flex items-center justify-center"
                          style={{
                            backgroundColor: theme.bgHex,
                            borderColor: theme.borderHex,
                          }}
                        >
                          <span
                            className="w-3 h-3 border"
                            style={{ borderColor: theme.accentHex }}
                          />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-serif text-lg leading-tight text-obsidian">
                            {theme.name}
                          </span>
                          <span className="block text-[10px] text-obsidian/55 truncate mt-0.5">
                            {theme.subtitle}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Drag & Drop + File Input */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border border-dashed p-7 text-center transition-all cursor-pointer ${
                      isDragging
                        ? "border-gold bg-gold/10"
                        : "border-obsidian/30 bg-ivory/70 hover:border-obsidian"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      className="hidden"
                      onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                    <Upload className="w-5 h-5 mx-auto text-gold mb-2.5" />
                    <p className="font-serif text-xl text-obsidian">
                      {config.uploadedFileName
                        ? `Loaded: ${config.uploadedFileName}`
                        : "Drop your crest, logo, or print file here"}
                    </p>
                    <p className="mt-1 text-[11px] text-obsidian/55">
                      PNG, SVG, JPG, or WEBP · Rendered directly onto the live
                      bottle &amp; flat label preview
                    </p>
                  </div>

                  {/* Scale & Fit Controls when an image is uploaded */}
                  {config.uploadedImageUrl && (
                    <div className="border border-obsidian/12 bg-ivory p-4 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-obsidian/70">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
                          <span>
                            SCALE ({Math.round(config.uploadedScale * 100)}%)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {(["contain", "cover"] as const).map((fitMode) => (
                            <button
                              key={fitMode}
                              type="button"
                              onClick={() =>
                                onChange((prev) => ({
                                  ...prev,
                                  uploadedFit: fitMode,
                                }))
                              }
                              className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] border cursor-pointer ${
                                config.uploadedFit === fitMode
                                  ? "bg-obsidian text-alabaster border-obsidian"
                                  : "border-obsidian/20 text-obsidian/65"
                              }`}
                            >
                              {fitMode}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              onChange((prev) => ({
                                ...prev,
                                uploadedImageUrl: null,
                                uploadedFileName: null,
                                artworkMode: "gallery",
                              }))
                            }
                            className="p-1.5 border border-obsidian/20 text-obsidian/65 hover:text-obsidian cursor-pointer"
                            title="Remove uploaded artwork"
                            aria-label="Remove uploaded artwork"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="range"
                        min={0.5}
                        max={1.8}
                        step={0.05}
                        value={config.uploadedScale}
                        onChange={(e) =>
                          onChange((prev) => ({
                            ...prev,
                            uploadedScale: parseFloat(e.target.value),
                          }))
                        }
                        className="w-full accent-[#B89B6A] cursor-pointer"
                        aria-label="Artwork scale"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. Paper & Tactile Finish Selector */}
            <div className="border border-obsidian/12 bg-alabaster/60 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.24em] text-obsidian/65 font-medium">
                  03 · PAPER &amp; TACTILE FINISH
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-obsidian/55">
                  {activeFinish.weight}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PAPER_FINISHES.map((finish) => {
                  const active = config.paperFinish === finish.id;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          paperFinish: finish.id as PaperFinishId,
                        }))
                      }
                      className={`p-4 border text-left transition-all cursor-pointer ${
                        active
                          ? "border-obsidian bg-obsidian text-alabaster"
                          : "border-obsidian/12 bg-ivory/80 text-obsidian hover:border-obsidian/45"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-serif text-lg leading-tight">
                          {finish.name}
                        </span>
                        <span
                          className={`text-[9px] uppercase tracking-[0.16em] ${
                            active ? "text-gold" : "text-obsidian/50"
                          }`}
                        >
                          {finish.weight}
                        </span>
                      </div>
                      <p
                        className={`mt-2 text-xs leading-relaxed ${
                          active ? "text-alabaster/75" : "text-obsidian/65"
                        }`}
                      >
                        {finish.tactileDescription}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Personalization Fields */}
            <div className="border border-obsidian/12 bg-alabaster/60 p-6 space-y-6">
              <span className="block text-[10px] uppercase tracking-[0.24em] text-obsidian/65 font-medium">
                04 · PERSONALIZATION &amp; CO-BRANDED QR
              </span>

              {/* Customer Brand Name */}
              <div>
                <label
                  htmlFor="brand-name-input"
                  className="block text-[11px] uppercase tracking-[0.18em] text-obsidian/70 mb-2"
                >
                  Customer Brand / Venue Name
                </label>
                <input
                  id="brand-name-input"
                  type="text"
                  maxLength={38}
                  value={config.brandName}
                  onChange={(e) =>
                    onChange((prev) => ({ ...prev, brandName: e.target.value }))
                  }
                  placeholder="e.g. MAISON AURELIA"
                  className="w-full bg-ivory border border-obsidian/20 px-4 py-3 text-sm text-obsidian focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              {/* Toggle & Textarea for Brand/Store Story */}
              <div className="pt-2 border-t border-obsidian/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="block text-[11px] uppercase tracking-[0.18em] text-obsidian">
                      Include Brand / Store Story
                    </span>
                    <span className="block text-[11px] text-obsidian/55">
                      Adds the micro-editorial Story Column onto the label
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={config.includeStory}
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        includeStory: !prev.includeStory,
                      }))
                    }
                    className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                      config.includeStory ? "bg-obsidian" : "bg-stone"
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-alabaster transition-transform ${
                        config.includeStory ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {config.includeStory && (
                  <textarea
                    rows={3}
                    maxLength={220}
                    value={config.storyText}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        storyText: e.target.value,
                      }))
                    }
                    placeholder="Tell your guests the story of your cafe, hotel, campus, or gathering..."
                    className="w-full bg-ivory border border-obsidian/20 px-4 py-3 text-xs leading-relaxed text-obsidian focus:outline-none focus:border-gold transition-colors"
                  />
                )}
              </div>

              {/* Custom QR Style Selector */}
              <div className="pt-2 border-t border-obsidian/10">
                <span className="block text-[11px] uppercase tracking-[0.18em] text-obsidian/70 mb-3">
                  Nirva Mark &amp; Theme-Matched QR Style
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {QR_STYLE_OPTIONS.map((qr) => {
                    const active = config.qrStyle === qr.id;
                    return (
                      <button
                        key={qr.id}
                        type="button"
                        onClick={() =>
                          onChange((prev) => ({
                            ...prev,
                            qrStyle: qr.id as QrStyleId,
                          }))
                        }
                        className={`p-3 border flex flex-col items-center text-center transition-all cursor-pointer ${
                          active
                            ? "border-obsidian bg-ivory ring-1 ring-gold"
                            : "border-obsidian/12 bg-ivory/60 hover:border-obsidian/40"
                        }`}
                      >
                        <CustomQrCode
                          styleId={qr.id}
                          inkColor="#0E0E0E"
                          accentColor="#B89B6A"
                          size={34}
                          showNirvaMark={false}
                        />
                        <span className="mt-2 text-[10px] uppercase tracking-[0.14em] text-obsidian font-medium">
                          {qr.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 5. Primary Action Button */}
            <button
              type="button"
              onClick={onOpenInquiry}
              className="w-full py-5 px-7 bg-obsidian text-alabaster text-xs uppercase tracking-[0.26em] font-medium flex items-center justify-between border border-obsidian hover:bg-gold hover:text-obsidian hover:border-gold transition-all duration-300 cursor-pointer"
            >
              <span className="inline-flex items-center gap-3">
                <Sparkles className="w-4 h-4" />
                Request Custom Design &amp; Sample
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
