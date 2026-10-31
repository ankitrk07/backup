"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { SearchEntry } from "@/lib/search";
import { useUiStore } from "@/store/ui-store";

const CommandPalette = dynamic(
  () => import("./command-palette").then((module) => module.CommandPalette),
  { ssr: false },
);

/** Always mounted: owns the Ctrl/Cmd+K shortcut, loads the palette on first use. */
export function CommandPaletteLoader({ entries }: { entries: SearchEntry[] }) {
  const open = useUiStore((state) => state.searchOpen);
  const [loaded, setLoaded] = useState(false);

  if (open && !loaded) setLoaded(true);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        useUiStore.getState().toggleSearch();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return loaded ? <CommandPalette entries={entries} /> : null;
}