"use client";

import React from "react";
import { QrStyleId } from "@/data/nirvaData";

interface CustomQrCodeProps {
  styleId: QrStyleId;
  inkColor?: string;
  accentColor?: string;
  bgColor?: string;
  size?: number;
  showNirvaMark?: boolean;
  compact?: boolean;
}

// Deterministic 9x9 matrix for a clean, authentic architectural QR silhouette
const QR_MATRIX = [
  [1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1],
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0, 1],
  [0, 1, 1, 0, 1, 0, 0, 1, 0],
  [1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 0, 1, 1, 0, 1, 1],
];

export const CustomQrCode: React.FC<CustomQrCodeProps> = ({
  styleId,
  inkColor = "#0E0E0E",
  accentColor = "#B89B6A",
  bgColor = "transparent",
  size = 44,
  showNirvaMark = true,
  compact = false,
}) => {
  const isDot = styleId === "organic-dot";
  const isCrest = styleId === "architectural-crest";
  const isSeal = styleId === "monogram-seal";

  const cellSize = 4;
  const padding = 6;
  const matrixDim = QR_MATRIX.length * cellSize;
  const totalView = matrixDim + padding * 2;

  return (
    <div
      className="inline-flex flex-col items-center select-none"
      style={{ color: inkColor }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: size,
          height: size,
          backgroundColor: bgColor,
        }}
      >
        <svg
          viewBox={`0 0 ${totalView} ${totalView}`}
          width={size}
          height={size}
          className="overflow-visible"
          aria-label={`Nirva ${styleId} QR`}
        >
          {/* Outer frame variations */}
          {styleId === "minimal-frame" && (
            <rect
              x="1"
              y="1"
              width={totalView - 2}
              height={totalView - 2}
              fill="none"
              stroke={accentColor}
              strokeWidth="0.9"
              opacity="0.85"
            />
          )}

          {isCrest && (
            <g stroke={accentColor} strokeWidth="1" fill="none">
              <path
                d={`M 6 1.5 L 1.5 1.5 L 1.5 6 M ${totalView - 6} 1.5 L ${totalView - 1.5} 1.5 L ${totalView - 1.5} 6 M 1.5 ${totalView - 6} L 1.5 ${totalView - 1.5} L 6 ${totalView - 1.5} M ${totalView - 6} ${totalView - 1.5} L ${totalView - 1.5} ${totalView - 1.5} L ${totalView - 1.5} ${totalView - 6}`}
              />
              <rect
                x="3"
                y="3"
                width={totalView - 6}
                height={totalView - 6}
                strokeWidth="0.45"
                opacity="0.45"
              />
            </g>
          )}

          {isSeal && (
            <g>
              <circle
                cx={totalView / 2}
                cy={totalView / 2}
                r={totalView / 2 + 2.5}
                fill="none"
                stroke={accentColor}
                strokeWidth="0.9"
              />
              <circle
                cx={totalView / 2}
                cy={totalView / 2}
                r={totalView / 2 + 0.3}
                fill="none"
                stroke={inkColor}
                strokeWidth="0.35"
                strokeDasharray="1.5 1.5"
                opacity="0.6"
              />
            </g>
          )}

          {isDot && (
            <rect
              x="1.5"
              y="1.5"
              width={totalView - 3}
              height={totalView - 3}
              rx="6"
              fill="none"
              stroke={accentColor}
              strokeWidth="0.75"
              opacity="0.65"
            />
          )}

          {/* QR Matrix Modules */}
          <g>
            {QR_MATRIX.map((row, rIdx) =>
              row.map((cell, cIdx) => {
                if (!cell) return null;
                const x = padding + cIdx * cellSize;
                const y = padding + rIdx * cellSize;

                // Subtle accent highlight on center module
                const isCenter = rIdx === 4 && cIdx === 4;
                const fill = isCenter ? accentColor : inkColor;

                if (isDot) {
                  return (
                    <circle
                      key={`${rIdx}-${cIdx}`}
                      cx={x + cellSize / 2}
                      cy={y + cellSize / 2}
                      r={cellSize * 0.42}
                      fill={fill}
                    />
                  );
                }

                if (isSeal) {
                  return (
                    <rect
                      key={`${rIdx}-${cIdx}`}
                      x={x + 0.35}
                      y={y + 0.35}
                      width={cellSize - 0.7}
                      height={cellSize - 0.7}
                      rx="1"
                      fill={fill}
                    />
                  );
                }

                return (
                  <rect
                    key={`${rIdx}-${cIdx}`}
                    x={x + 0.25}
                    y={y + 0.25}
                    width={cellSize - 0.5}
                    height={cellSize - 0.5}
                    fill={fill}
                  />
                );
              })
            )}
          </g>
        </svg>
      </div>

      {showNirvaMark && (
        <div
          className={`flex items-center gap-1 ${
            compact ? "mt-1" : "mt-1.5"
          }`}
        >
          <span
            className="inline-block w-1.5 h-1.5 rotate-45"
            style={{ backgroundColor: accentColor }}
          />
          <span
            className="font-serif tracking-[0.26em] uppercase font-medium leading-none"
            style={{
              fontSize: compact ? "6.5px" : "8px",
              color: inkColor,
              opacity: 0.85,
            }}
          >
            NIRVA
          </span>
        </div>
      )}
    </div>
  );
};
