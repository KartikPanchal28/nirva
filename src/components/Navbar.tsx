"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "Craftsmanship", href: "#craftsmanship" },
  { label: "Label Studio", href: "#label-studio" },
  { label: "Collaborations", href: "#collaborations" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-alabaster/90 backdrop-blur-md border-obsidian/12"
          : "bg-alabaster/75 backdrop-blur-sm border-obsidian/8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 h-18 flex items-center justify-between">
        {/* Left: NIRVA Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group"
        >
          <span className="inline-block w-2 h-2 rotate-45 bg-gold transition-transform duration-300 group-hover:rotate-90" />
          <span className="font-serif text-xl sm:text-2xl tracking-[0.28em] font-medium text-obsidian">
            NIRVA
          </span>
        </a>

        {/* Center: Desktop Anchor Links */}
        <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-[11px] uppercase tracking-[0.22em] text-obsidian/75 hover:text-obsidian transition-colors relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Commission Labels CTA */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => scrollToSection("#label-studio")}
            className="hidden sm:inline-flex items-center px-5 py-2.5 bg-obsidian text-alabaster text-[11px] uppercase tracking-[0.2em] border border-obsidian hover:bg-gold hover:text-obsidian hover:border-gold transition-all duration-300 cursor-pointer"
          >
            Commission Labels
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 border border-obsidian/15 text-obsidian cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-alabaster border-b border-obsidian/12 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-xs uppercase tracking-[0.24em] text-obsidian py-2 border-b border-obsidian/10"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => scrollToSection("#label-studio")}
                className="mt-2 w-full py-3 bg-obsidian text-alabaster text-xs uppercase tracking-[0.22em] cursor-pointer"
              >
                Commission Labels
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
