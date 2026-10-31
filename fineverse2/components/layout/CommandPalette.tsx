"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_PRODUCTS, MOCK_COLLECTIONS } from "@/lib/data/mock-db";
import { FineverseImage } from "@/components/ui/FineverseImage";
import { formatPrice } from "@/lib/formatters";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener (CMD+K / CTRL+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setQuery("");
      setSelectedIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Filter products and collections
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return {
        products: MOCK_PRODUCTS.slice(0, 3), // Recommended items
        collections: MOCK_COLLECTIONS.slice(0, 2),
      };
    }

    const q = query.toLowerCase().trim();
    const products = MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    const collections = MOCK_COLLECTIONS.filter(
      (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );

    return { products, collections };
  }, [query]);

  const totalResultsCount =
    filteredResults.products.length + filteredResults.collections.length;

  // Arrow key navigation
  useEffect(() => {
    const handleKeyNav = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (totalResultsCount || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (totalResultsCount || 1)) % (totalResultsCount || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex < filteredResults.products.length) {
          const prod = filteredResults.products[selectedIndex];
          if (prod) {
            router.push(`/shop/${prod.slug}`);
            onClose();
          }
        } else {
          const colIndex = selectedIndex - filteredResults.products.length;
          const col = filteredResults.collections[colIndex];
          if (col) {
            router.push(`/collections/${col.slug}`);
            onClose();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyNav);
    return () => window.removeEventListener("keydown", handleKeyNav);
  }, [isOpen, selectedIndex, filteredResults, totalResultsCount, router, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Palette Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18 }}
            className="relative w-full max-w-2xl bg-space-950 border border-white/15 shadow-2xl overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Search Fineverse products and collections"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center px-4 border-b border-white/10 bg-space-900">
              <Search className="w-5 h-5 text-acid mr-3 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search Drop 04, tees, 420 GSM hoodies, caps..."
                className="w-full h-14 bg-transparent text-sm sm:text-base text-zinc-100 placeholder:text-zinc-500 font-sans focus:outline-none"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 text-zinc-500 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results Container */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
              {/* Products Section */}
              {filteredResults.products.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase px-2 mb-2 block flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-acid" />
                    {query ? "PRODUCTS" : "FEATURED MERCH"}
                  </span>
                  <div className="space-y-1">
                    {filteredResults.products.map((product, idx) => {
                      const isSelected = selectedIndex === idx;

                      return (
                        <div
                          key={product.id}
                          onClick={() => {
                            router.push(`/shop/${product.slug}`);
                            onClose();
                          }}
                          className={`flex items-center gap-3 p-2.5 transition-all cursor-pointer border ${
                            isSelected
                              ? "bg-acid/10 border-acid text-acid"
                              : "border-transparent text-zinc-200 hover:bg-space-900"
                          }`}
                        >
                          <div className="w-12 h-14 bg-space-900 border border-white/10 flex-shrink-0 overflow-hidden">
                            <FineverseImage slotKey={product.images[0].slotKey} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-display font-bold uppercase text-sm truncate">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5 text-xs font-mono text-zinc-400">
                              <span>{formatPrice(product.price)}</span>
                              {product.gsm > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{product.gsm} GSM</span>
                                </>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-50" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Collections Section */}
              {filteredResults.collections.length > 0 && (
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase px-2 mb-2 block">
                    COLLECTIONS & DROPS
                  </span>
                  <div className="space-y-1">
                    {filteredResults.collections.map((col, idx) => {
                      const actualIdx = filteredResults.products.length + idx;
                      const isSelected = selectedIndex === actualIdx;

                      return (
                        <div
                          key={col.id}
                          onClick={() => {
                            router.push(`/collections/${col.slug}`);
                            onClose();
                          }}
                          className={`flex items-center justify-between p-3 transition-all cursor-pointer border ${
                            isSelected
                              ? "bg-acid/10 border-acid text-acid"
                              : "border-transparent text-zinc-200 hover:bg-space-900"
                          }`}
                        >
                          <div>
                            <h4 className="font-display font-bold uppercase text-sm">{col.title}</h4>
                            <p className="text-xs font-mono text-zinc-400 mt-0.5">{col.tagline}</p>
                          </div>
                          <span className="text-xs font-mono text-zinc-500">
                            {col.productCount} Items →
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Empty Search State */}
              {totalResultsCount === 0 && (
                <div className="py-12 text-center space-y-2">
                  <p className="font-display uppercase text-white font-bold">
                    NO MERCH FOUND FOR "{query}"
                  </p>
                  <p className="text-xs font-mono text-zinc-400">
                    Try searching for "Oversized", "Sisters Revenge", "420 GSM", or "Hoodie"
                  </p>
                </div>
              )}
            </div>

            {/* Keyboard Shortcuts Footer */}
            <div className="px-4 py-2.5 bg-space-900/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-space-950 border border-white/20 text-zinc-300">↑</kbd>{" "}
                  <kbd className="px-1.5 py-0.5 bg-space-950 border border-white/20 text-zinc-300">↓</kbd> Navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-space-950 border border-white/20 text-zinc-300">↵</kbd> Select
                </span>
              </div>
              <span>
                <kbd className="px-1.5 py-0.5 bg-space-950 border border-white/20 text-zinc-300">ESC</kbd> Close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
