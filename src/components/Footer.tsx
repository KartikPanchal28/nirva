"use client";

import React from "react";
import { QrStyleId } from "@/data/nirvaData";
import { CustomQrCode } from "./CustomQrCode";

interface FooterProps {
  qrStyle: QrStyleId;
}

export const Footer: React.FC<FooterProps> = ({ qrStyle }) => {
  return (
    <footer className="bg-obsidian text-alabaster py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-alabaster/12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-2 h-2 rotate-45 bg-gold" />
              <span className="font-serif text-2xl tracking-[0.3em] font-normal">
                NIRVA
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-alabaster/68 leading-relaxed font-light">
              A bespoke hydration atelier crafting custom-labeled mineral
              vessels for spaces defined by taste, ritual, and architectural
              calm.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <span className="block text-[10px] uppercase tracking-[0.24em] text-gold mb-4">
              ATELIER INDEX
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-[0.18em] text-alabaster/75">
              <li>
                <a
                  href="#collection"
                  className="hover:text-gold transition-colors"
                >
                  Collection
                </a>
              </li>
              <li>
                <a
                  href="#craftsmanship"
                  className="hover:text-gold transition-colors"
                >
                  Craftsmanship
                </a>
              </li>
              <li>
                <a
                  href="#label-studio"
                  className="hover:text-gold transition-colors"
                >
                  Label Studio
                </a>
              </li>
              <li>
                <a
                  href="#collaborations"
                  className="hover:text-gold transition-colors"
                >
                  Collaborations
                </a>
              </li>
            </ul>
          </div>

          {/* Bespoke Inquiry Contact */}
          <div className="md:col-span-2">
            <span className="block text-[10px] uppercase tracking-[0.24em] text-gold mb-4">
              COMMISSIONS
            </span>
            <p className="text-xs text-alabaster/80 leading-relaxed">
              concierge@nirva.atelier
              <br />
              +91 (22) 4890 1104
            </p>
            <p className="mt-3 text-[11px] text-alabaster/50">
              Mumbai · Zurich · Kyoto
            </p>
          </div>

          {/* Decorative Signature Custom-QR Badge */}
          <div className="md:col-span-2 flex md:justify-end items-start">
            <div className="border border-alabaster/16 bg-charcoal p-4 flex flex-col items-center text-center">
              <CustomQrCode
                styleId={qrStyle}
                inkColor="#F5F2EB"
                accentColor="#B89B6A"
                size={52}
                showNirvaMark={true}
              />
              <span className="mt-2 text-[8px] uppercase tracking-[0.22em] text-alabaster/50">
                SCAN FOR PROVENANCE
              </span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.22em] text-alabaster/45">
          <span>© 2026 NIRVA HYDRATION ATELIER. ALL RIGHTS RESERVED.</span>
          <span>ARCHIVAL PRINT · MINERAL STILL</span>
        </div>
      </div>
    </footer>
  );
};
