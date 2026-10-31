"use client";

import { Ruler } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import type { SizeChart } from "@/types/content";

const SizeGuideModal = dynamic(
  () => import("./size-guide-modal").then((module) => module.SizeGuideModal),
  { ssr: false },
);

export function SizeGuideTrigger({ chart }: { chart: SizeChart }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  if (open && !loaded) setLoaded(true);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        onPointerEnter={() => void import("./size-guide-modal")}
        className="inline-flex min-h-tap items-center gap-2 text-sm text-accent underline underline-offset-4"
      >
        <Ruler className="size-4" aria-hidden="true" />
        Size guide
      </button>
      {loaded ? <SizeGuideModal open={open} onClose={close} chart={chart} /> : null}
    </>
  );
}