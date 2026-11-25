"use client";

import React, { useState } from "react";
import { BottleSizeId } from "@/data/nirvaData";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CollectionSection } from "@/components/CollectionSection";
import { AnatomySection } from "@/components/AnatomySection";
import { LabelStudioSection } from "@/components/LabelStudioSection";
import { CollaborationsSection } from "@/components/CollaborationsSection";
import { InquiryDrawer } from "@/components/InquiryDrawer";
import { Footer } from "@/components/Footer";
import { LabelDesignConfig } from "@/components/LabelCanvas";

const INITIAL_CONFIG: LabelDesignConfig = {
  bottleSize: "500ml",
  artworkMode: "gallery",
  galleryTheme: "raw-monolith",
  uploadedImageUrl: null,
  uploadedFileName: null,
  uploadedScale: 1,
  uploadedFit: "contain",
  paperFinish: "foil-parchment",
  brandName: "MAISON AURELIA",
  includeStory: true,
  storyText:
    "Poured for quiet mornings and unhurried dialogue. Mineral still water bottled exclusively for guests of our house.",
  qrStyle: "architectural-crest",
};

export default function HomePage() {
  const [labelConfig, setLabelConfig] =
    useState<LabelDesignConfig>(INITIAL_CONFIG);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCustomizeSize = (sizeId: BottleSizeId) => {
    setLabelConfig((prev) => ({ ...prev, bottleSize: sizeId }));
    const studioEl = document.querySelector("#label-studio");
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-alabaster text-obsidian">
      <Navbar />

      <main>
        <HeroSection liveConfig={labelConfig} />

        <CollectionSection
          liveConfig={labelConfig}
          onSelectSizeForStudio={handleCustomizeSize}
        />

        <AnatomySection liveConfig={labelConfig} />

        <LabelStudioSection
          config={labelConfig}
          onChange={setLabelConfig}
          onOpenInquiry={() => setDrawerOpen(true)}
        />

        <CollaborationsSection onOpenInquiry={() => setDrawerOpen(true)} />
      </main>

      <Footer qrStyle={labelConfig.qrStyle} />

      <InquiryDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        config={labelConfig}
      />
    </div>
  );
}
