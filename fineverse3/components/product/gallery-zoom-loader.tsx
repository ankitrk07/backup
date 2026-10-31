"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { GalleryZoomProps } from "./gallery-zoom";

// The lightbox (and Framer Motion) is only downloaded the first time an image is tapped.
const GalleryZoom = dynamic(() => import("./gallery-zoom").then((module) => module.GalleryZoom), {
  ssr: false,
});

export function GalleryZoomLoader(props: GalleryZoomProps) {
  const [loaded, setLoaded] = useState(false);

  if (props.open && !loaded) setLoaded(true);

  return loaded ? <GalleryZoom {...props} /> : null;
}