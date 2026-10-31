"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useUiStore } from "@/store/ui-store";

// The drawer (and Framer Motion) is only downloaded the first time the cart is opened.
const CartDrawer = dynamic(() => import("./cart-drawer").then((module) => module.CartDrawer), {
  ssr: false,
});

export function CartDrawerLoader() {
  const open = useUiStore((state) => state.cartOpen);
  const [loaded, setLoaded] = useState(false);

  if (open && !loaded) setLoaded(true);

  return loaded ? <CartDrawer /> : null;
}