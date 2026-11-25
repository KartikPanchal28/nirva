"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BottleSizeId, BOTTLE_SPECS } from "@/data/nirvaData";
import { LabelCanvas, LabelDesignConfig } from "./LabelCanvas";

interface BottleVisualProps {
  config: LabelDesignConfig;
  sizeId?: BottleSizeId;
  interactiveTilt?: boolean;
  capFinish?: "champagne" | "obsidian" | "pewter";
  scale?: number;
  showShadow?: boolean;
  className?: string;
}

export const BottleVisual: React.FC<BottleVisualProps> = ({
  config,
  sizeId,
  interactiveTilt = false,
  capFinish = "champagne",
  scale = 1,
  showShadow = true,
  className = "",
}) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, sheenX: 50 });

  const activeSize = sizeId ?? config.bottleSize;
  const spec =
    BOTTLE_SPECS.find((b) => b.id === activeSize) ?? BOTTLE_SPECS[1];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - y) * 7,
      ry: (x - 0.5) * 10,
      sheenX: x * 100,
    });
  };

  const handleMouseLeave = () => {
    if (!interactiveTilt) return;
    setTilt({ rx: 0, ry: 0, sheenX: 50 });
  };

  const capGradient =
    capFinish === "obsidian"
      ? { c1: "#2A2927", c2: "#0E0E0E", c3: "#3D3A35", c4: "#111110" }
      : capFinish === "pewter"
      ? { c1: "#9C9890", c2: "#5C5852", c3: "#D6D1C8", c4: "#6E6A63" }
      : { c1: "#D9C398", c2: "#9A7D4D", c3: "#EFE0BE", c4: "#8D7041" };

  // Proportional dimensions
  const baseHeight = 460 * spec.visualScale * scale;
  const baseWidth = Math.round(baseHeight * (spec.diameterMm / spec.heightMm) * 1.18);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rx,
        rotateY: tilt.ry,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
      style={{
        perspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={`relative inline-flex flex-col items-center justify-end select-none ${className}`}
    >
      {/* Bottle Container */}
      <div
        className="relative flex items-center justify-center transition-all duration-500"
        style={{
          width: `${baseWidth}px`,
          height: `${baseHeight}px`,
        }}
      >
        {/* Architectural Glass Bottle SVG */}
        <svg
          viewBox="0 0 180 460"
          className="w-full h-full drop-shadow-[0_24px_34px_rgba(14,14,14,0.16)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Metallic Cap Gradient */}
            <linearGradient id={`cap-${activeSize}-${capFinish}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={capGradient.c2} />
              <stop offset="22%" stopColor={capGradient.c3} />
              <stop offset="50%" stopColor={capGradient.c1} />
              <stop offset="78%" stopColor={capGradient.c4} />
              <stop offset="100%" stopColor={capGradient.c2} />
            </linearGradient>

            {/* Glass Body Base */}
            <linearGradient id={`glass-${activeSize}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D7D2C8" stopOpacity="0.58" />
              <stop offset="16%" stopColor="#FAF8F4" stopOpacity="0.82" />
              <stop offset="35%" stopColor="#EFECE5" stopOpacity="0.32" />
              <stop offset="72%" stopColor="#DDD7CC" stopOpacity="0.38" />
              <stop offset="88%" stopColor="#FAF8F4" stopOpacity="0.72" />
              <stop offset="100%" stopColor="#B8B1A4" stopOpacity="0.55" />
            </linearGradient>

            {/* Subtle Water Volume Inside */}
            <linearGradient id={`water-${activeSize}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EAE6DD" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#CBC5B9" stopOpacity="0.45" />
            </linearGradient>

            {/* Crisp Specular Edge Highlight */}
            <linearGradient id="specular-left" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.78" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Precision Cap */}
          <rect
            x="64"
            y="14"
            width="52"
            height="34"
            rx="3"
            fill={`url(#cap-${activeSize}-${capFinish})`}
          />
          {/* Knurled Cap Collar Detail */}
          <rect x="64" y="42" width="52" height="6" fill="#0E0E0E" fillOpacity="0.18" />
          <line x1="66" y1="22" x2="114" y2="22" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="0.8" />
          {/* Subtle vertical knurling ticks */}
          {[70, 76, 82, 88, 94, 100, 106, 110].map((x) => (
            <line
              key={x}
              x1={x}
              y1="16"
              x2={x}
              y2="41"
              stroke="#0E0E0E"
              strokeOpacity="0.12"
              strokeWidth="0.7"
            />
          ))}

          {/* Glass Neck Ring */}
          <rect
            x="62"
            y="48"
            width="56"
            height="7"
            rx="2"
            fill="#E5E0D6"
            stroke="#9C9588"
            strokeOpacity="0.45"
            strokeWidth="0.8"
          />

          {/* Main Architectural Bottle Silhouette */}
          <path
            d="M 65 55 L 65 82 C 65 104 22 118 22 152 L 22 426 C 22 438 30 446 42 446 L 138 446 C 150 446 158 438 158 426 L 158 152 C 158 118 115 104 115 82 L 115 55 Z"
            fill={`url(#glass-${activeSize})`}
            stroke="#9C9588"
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />

          {/* Inner Glass Wall & Water Fill */}
          <path
            d="M 28 156 L 28 422 C 28 431 35 436 44 436 L 136 436 C 145 436 152 431 152 422 L 152 156 C 152 130 116 116 112 96 L 68 96 C 64 116 28 130 28 156 Z"
            fill={`url(#water-${activeSize})`}
          />

          {/* Water Meniscus Line */}
          <path
            d="M 66 96 Q 90 100 114 96"
            stroke="#FFFFFF"
            strokeOpacity="0.65"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Thick Glass Base Punt */}
          <path
            d="M 32 428 Q 90 416 148 428 L 148 436 Q 90 443 32 436 Z"
            fill="#C8C2B8"
            fillOpacity="0.48"
          />

          {/* Left & Right Glass Specular Reflections */}
          <rect x="31" y="148" width="9" height="275" rx="4" fill="url(#specular-left)" />
          <rect x="142" y="152" width="4" height="270" rx="2" fill="#FFFFFF" fillOpacity="0.45" />
          <path
            d="M 62 96 C 48 112 34 126 32 148"
            stroke="#FFFFFF"
            strokeOpacity="0.72"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Live Wrapped Label Overlay positioned cleanly on the cylindrical body */}
        <div
          className="absolute left-[13.5%] right-[13.5%] overflow-hidden shadow-[0_6px_18px_rgba(14,14,14,0.16)]"
          style={{
            top: "38%",
            bottom: "15.5%",
            borderRadius: "2px",
          }}
        >
          <LabelCanvas
            config={config}
            mode="bottle-wrap"
            className="w-full h-full"
          />

          {/* Interactive Mouse Sheen */}
          {interactiveTilt && (
            <div
              className="pointer-events-none absolute inset-0 z-40 transition-opacity duration-300"
              style={{
                background: `linear-gradient(105deg, transparent ${Math.max(
                  0,
                  tilt.sheenX - 24
                )}%, rgba(255,255,255,0.22) ${tilt.sheenX}%, transparent ${Math.min(
                  100,
                  tilt.sheenX + 24
                )}%)`,
              }}
            />
          )}
        </div>
      </div>

      {/* Architectural Ground Contact Shadow */}
      {showShadow && (
        <div
          className="mt-2 rounded-full blur-md transition-all duration-500"
          style={{
            width: `${Math.round(baseWidth * 0.85)}px`,
            height: "12px",
            background:
              "radial-gradient(ellipse at center, rgba(14,14,14,0.24) 0%, rgba(14,14,14,0) 72%)",
          }}
        />
      )}
    </motion.div>
  );
};
