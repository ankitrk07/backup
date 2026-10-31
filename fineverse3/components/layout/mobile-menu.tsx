"use client";

import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";
import { headerIconButton } from "./header-styles";

const MobileMenuPanel = dynamic(
  () => import("./mobile-menu-panel").then((module) => module.MobileMenuPanel),
  { ssr: false },
);

export function MobileMenu() {
  const open = useUiStore((state) => state.mobileMenuOpen);
  const setOpen = useUiStore((state) => state.setMobileMenuOpen);
  const [loaded, setLoaded] = useState(false);

  if (open && !loaded) setLoaded(true);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        onPointerEnter={() => void import("./mobile-menu-panel")}
        className={cn(headerIconButton, "-ml-2 lg:hidden")}
      >
        <Menu className="size-6" aria-hidden="true" />
      </button>
      {loaded ? <MobileMenuPanel /> : null}
    </>
  );
}