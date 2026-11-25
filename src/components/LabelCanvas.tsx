"use client";

import React from "react";
import {
  GALLERY_THEMES,
  PAPER_FINISHES,
  GalleryThemeId,
  PaperFinishId,
  QrStyleId,
  BottleSizeId,
} from "@/data/nirvaData";
import { CustomQrCode } from "./CustomQrCode";

export interface LabelDesignConfig {
  bottleSize: BottleSizeId;
  artworkMode: "gallery" | "upload";
  galleryTheme: GalleryThemeId;
  uploadedImageUrl: string | null;
  uploadedFileName: string | null;
  uploadedScale: number;
  uploadedFit: "contain" | "cover";
  paperFinish: PaperFinishId;
  brandName: string;
  includeStory: boolean;
  storyText: string;
  qrStyle: QrStyleId;
}

interface LabelCanvasProps {
  config: LabelDesignConfig;
  mode?: "flat" | "bottle-wrap";
  highlightZone?: "identity-canvas" | "story-column" | "nirva-qr" | null;
  className?: string;
}

export const LabelCanvas: React.FC<LabelCanvasProps> = ({
  config,
  mode = "flat",
  highlightZone = null,
  className = "",
}) => {
  const theme =
    GALLERY_THEMES.find((t) => t.id === config.galleryTheme) ??
    GALLERY_THEMES[0];
  const finish =
    PAPER_FINISHES.find((f) => f.id === config.paperFinish) ??
    PAPER_FINISHES[0];

  const isUploadMode =
    config.artworkMode === "upload" && Boolean(config.uploadedImageUrl);
  const displayBrand = config.brandName.trim() || "MAISON AURELIA";
  const displayStory =
    config.storyText.trim() ||
    "Crafted for quiet mornings and unhurried conversation. Sourced from protected mineral aquifers and bottled exclusively for our guests.";

  const isBottleWrap = mode === "bottle-wrap";
  const isFoilParchment = config.paperFinish === "foil-parchment";

  const zoneRing = (zone: "identity-canvas" | "story-column" | "nirva-qr") =>
    highlightZone === zone
      ? "ring-1 ring-[#B89B6A] bg-[#B89B6A]/10 transition-all duration-300"
      : highlightZone
      ? "opacity-45 transition-all duration-300"
      : "transition-all duration-300";

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      style={{
        backgroundColor: isUploadMode ? "#FAF8F4" : theme.bgHex,
        color: isUploadMode ? "#0E0E0E" : theme.textHex,
      }}
    >
      {/* Tactile Paper Finish Overlay */}
      <div
        className={`pointer-events-none absolute inset-0 z-20 ${finish.cssClass}`}
      />

      {/* Foil-Accented Parchment Gold Hairline Frame */}
      {isFoilParchment && (
        <div
          className="pointer-events-none absolute inset-[5px] z-20 border"
          style={{
            borderColor: "#B89B6A",
            boxShadow: "inset 0 0 0 1px rgba(184,155,106,0.28)",
          }}
        />
      )}

      {/* Bespoke Theme Ornamental Layer (when in Gallery mode) */}
      {!isUploadMode && (
        <div className="pointer-events-none absolute inset-0 z-0">
          {theme.id === "raw-monolith" && (
            <>
              <div
                className="absolute inset-3 border"
                style={{ borderColor: "rgba(184, 155, 106, 0.35)" }}
              />
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-[1px]"
                style={{ backgroundColor: theme.accentHex }}
              />
            </>
          )}

          {theme.id === "botanical-etch" && (
            <svg
              viewBox="0 0 320 180"
              className="w-full h-full opacity-25"
              preserveAspectRatio="xMidYMid slice"
            >
              <g
                stroke={theme.accentHex}
                strokeWidth="0.7"
                fill="none"
              >
                <path d="M 32 165 Q 48 110 38 45" />
                <path d="M 39 125 Q 60 112 68 95 Q 50 105 39 125 Z" />
                <path d="M 41 92 Q 20 78 16 58 Q 34 72 41 92 Z" />
                <path d="M 40 65 Q 58 52 62 35 Q 46 48 40 65 Z" />
                <circle cx="38" cy="36" r="2.2" />
              </g>
            </svg>
          )}

          {theme.id === "heritage-arch" && (
            <svg
              viewBox="0 0 320 180"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M 18 168 L 18 58 A 50 42 0 0 1 118 58 L 118 168 Z"
                fill="none"
                stroke={theme.accentHex}
                strokeWidth="0.8"
                opacity="0.45"
              />
              <line
                x1="14"
                y1="14"
                x2="306"
                y2="14"
                stroke={theme.borderHex}
                strokeWidth="0.5"
                opacity="0.25"
              />
              <line
                x1="14"
                y1="166"
                x2="306"
                y2="166"
                stroke={theme.borderHex}
                strokeWidth="0.5"
                opacity="0.25"
              />
            </svg>
          )}

          {theme.id === "gilded-minimal" && (
            <>
              <div
                className="absolute inset-2.5 border"
                style={{ borderColor: "rgba(184, 155, 106, 0.48)" }}
              />
              <div
                className="absolute inset-4 border"
                style={{ borderColor: "rgba(184, 155, 106, 0.2)" }}
              />
            </>
          )}

          {theme.id === "editorial-grid" && (
            <div className="absolute inset-3 grid grid-cols-12 border border-white/15">
              <div className="col-span-8 border-r border-white/15" />
              <div className="col-span-4" />
            </div>
          )}
        </div>
      )}

      {/* Uploaded Artwork Layer */}
      {isUploadMode && config.uploadedImageUrl && (
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={config.uploadedImageUrl}
            alt={config.uploadedFileName || "Uploaded custom label print"}
            className="w-full h-full transition-transform duration-200"
            style={{
              objectFit: config.uploadedFit,
              transform: `scale(${config.uploadedScale})`,
            }}
          />
          {/* Subtle scrim when brand text or story overlay is enabled over uploaded print */}
          {(config.brandName.trim() || config.includeStory) && (
            <div className="absolute inset-0 bg-[#FAF8F4]/35 backdrop-blur-[0.5px]" />
          )}
        </div>
      )}

      {/* Main Typographic & Co-Branding Grid */}
      <div
        className={`relative z-10 h-full w-full flex ${
          isBottleWrap ? "p-3.5 gap-2.5" : "p-5 sm:p-6 gap-4"
        }`}
      >
        {/* Left/Center: Zone 01 — Client Identity Canvas */}
        <div
          className={`flex-1 flex flex-col justify-between min-w-0 rounded-xs ${
            isBottleWrap ? "p-1" : "p-2"
          } ${zoneRing("identity-canvas")}`}
        >
          <div className="flex items-center justify-between gap-2">
            <span
              className="uppercase tracking-[0.24em] font-sans font-medium truncate"
              style={{
                fontSize: isBottleWrap ? "6px" : "8px",
                color: isUploadMode ? "#5C5852" : theme.accentHex,
              }}
            >
              {isUploadMode
                ? "CUSTOM PRINT EDITION"
                : theme.defaultSublabel}
            </span>
            <span
              className="uppercase tracking-[0.18em] font-sans shrink-0"
              style={{
                fontSize: isBottleWrap ? "6px" : "8px",
                opacity: 0.6,
              }}
            >
              {config.bottleSize}
            </span>
          </div>

          <div className="my-auto py-1">
            {(!isUploadMode || config.brandName.trim().length > 0) && (
              <>
                <h4
                  className="font-serif font-normal tracking-[0.04em] leading-[1.05] break-words"
                  style={{
                    fontSize: isBottleWrap
                      ? displayBrand.length > 16
                        ? "14px"
                        : "17px"
                      : displayBrand.length > 16
                      ? "22px"
                      : "27px",
                  }}
                >
                  {displayBrand}
                </h4>
                <div
                  className="mt-2 h-[1px] w-10"
                  style={{
                    backgroundColor: isUploadMode
                      ? "#B89B6A"
                      : theme.accentHex,
                  }}
                />
              </>
            )}
          </div>

          <div
            className="flex items-center gap-3 uppercase tracking-[0.2em]"
            style={{
              fontSize: isBottleWrap ? "5.5px" : "7.5px",
              opacity: 0.65,
            }}
          >
            <span>NATURAL MINERAL</span>
            <span>·</span>
            <span>PH 7.4</span>
          </div>
        </div>

        {/* Right Column: Zone 02 (Story Column) + Zone 03 (Nirva Mark & QR) */}
        <div
          className={`flex flex-col justify-between items-end shrink-0 border-l ${
            isBottleWrap ? "w-[36%] pl-2.5" : "w-[34%] pl-4"
          }`}
          style={{
            borderColor: isUploadMode
              ? "rgba(14,14,14,0.14)"
              : theme.isDark
              ? "rgba(245,242,235,0.16)"
              : "rgba(14,14,14,0.14)",
          }}
        >
          {/* Zone 02: Story Column */}
          <div
            className={`w-full rounded-xs ${
              isBottleWrap ? "p-0.5" : "p-1"
            } ${zoneRing("story-column")}`}
          >
            {config.includeStory ? (
              <div>
                <p
                  className="uppercase tracking-[0.22em] mb-1 font-medium"
                  style={{
                    fontSize: isBottleWrap ? "5px" : "7px",
                    color: isUploadMode ? "#B89B6A" : theme.accentHex,
                  }}
                >
                  THE SPACE
                </p>
                <p
                  className="font-serif italic leading-[1.32] line-clamp-5"
                  style={{
                    fontSize: isBottleWrap ? "6.5px" : "9.5px",
                    opacity: 0.85,
                  }}
                >
                  {displayStory}
                </p>
              </div>
            ) : (
              <div className="opacity-35">
                <p
                  className="uppercase tracking-[0.2em]"
                  style={{ fontSize: isBottleWrap ? "5px" : "6.5px" }}
                >
                  ATELIER RESERVE
                </p>
              </div>
            )}
          </div>

          {/* Zone 03: Nirva Mark & Theme-Matched QR */}
          <div
            className={`mt-auto pt-1.5 flex items-end justify-end w-full rounded-xs ${
              isBottleWrap ? "p-0.5" : "p-1"
            } ${zoneRing("nirva-qr")}`}
          >
            <CustomQrCode
              styleId={config.qrStyle}
              inkColor={isUploadMode ? "#0E0E0E" : theme.textHex}
              accentColor={isUploadMode ? "#B89B6A" : theme.accentHex}
              size={isBottleWrap ? 28 : 42}
              compact={isBottleWrap}
              showNirvaMark={true}
            />
          </div>
        </div>
      </div>

      {/* Cylindrical Shading Overlay when wrapped onto a bottle */}
      {isBottleWrap && (
        <div
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.28) 0%, rgba(255,255,255,0.14) 22%, rgba(255,255,255,0.03) 50%, rgba(0,0,0,0.08) 78%, rgba(0,0,0,0.34) 100%)",
          }}
        />
      )}
    </div>
  );
};
