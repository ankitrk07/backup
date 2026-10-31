"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import type { SearchEntry } from "@/lib/search";
import { hydrateStores } from "@/store/hydrate";
import { useToastStore } from "@/store/toast-store";
import { CartDrawerLoader } from "./cart-drawer-loader";
import { CommandPaletteLoader } from "./command-palette-loader";

const Toaster = dynamic(() => import("@/components/ui/toaster").then((module) => module.Toaster), {
  ssr: false,
});

/** The toaster (and Framer Motion) loads only when the first toast is shown. */
function LazyToaster() {
  const hasToasts = useToastStore((state) => state.toasts.length > 0);
  const [loaded, setLoaded] = useState(false);

  if (hasToasts && !loaded) setLoaded(true);

  return loaded ? <Toaster /> : null;
}

interface ProvidersProps {
  searchEntries: SearchEntry[];
  children: ReactNode;
}

export function Providers({ searchEntries, children }: ProvidersProps) {
  // Applies saved cart / wishlist after mount, so server HTML and first render always match.
  useEffect(() => {
    void hydrateStores();
  }, []);

  return (
    <>
      {children}
      <CartDrawerLoader />
      <CommandPaletteLoader entries={searchEntries} />
      <LazyToaster />
    </>
  );
}