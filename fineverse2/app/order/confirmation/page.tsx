"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { CheckCircle2, Package, ArrowRight, Truck, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "FV-2026-84920";
  const email = searchParams.get("email") || "your verified email address";

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#CCFF00", "#8B5CF6", "#00F0FF", "#FFFFFF"],
      });
    } catch {
      // Fallback if canvas is unavailable
    }
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-2xl text-center space-y-8">
      {/* Success Icon */}
      <div className="w-20 h-20 rounded-full bg-acid/10 border-2 border-acid flex items-center justify-center text-acid shadow-acid mx-auto">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      {/* Headings */}
      <div className="space-y-2">
        <span className="font-mono text-xs text-acid tracking-widest uppercase">
          ORDER TRANSMISSION CONFIRMED
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          THANK YOU FOR WEARING THE UNIVERSE
        </h1>
        <p className="text-xs sm:text-sm font-mono text-zinc-300 max-w-lg mx-auto">
          Your order has been allocated in our Tirupur facility. A dispatch confirmation receipt has been sent to <strong className="text-acid">{email}</strong>.
        </p>
      </div>

      {/* Order Spec Card */}
      <div className="surface-card p-6 border border-white/15 text-left space-y-4 font-mono text-xs">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-zinc-400">ORDER TRACKING ID:</span>
          <strong className="text-acid font-bold text-sm">{orderId}</strong>
        </div>

        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-zinc-400">ESTIMATED DISPATCH:</span>
          <span className="text-white">Within 24-48 Hours</span>
        </div>

        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <span className="text-zinc-400">ESTIMATED TRANSIT:</span>
          <span className="text-white">{siteConfig.shipping.metroEstimatedDays} (Metro Hubs)</span>
        </div>

        <div className="flex items-center gap-2 text-zinc-400 pt-1 text-[11px]">
          <Mail className="w-4 h-4 text-acid flex-shrink-0" />
          <span>Tracking checkpoints will be messaged via SMS & WhatsApp once dispatched.</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="acid" size="lg" className="w-full sm:w-auto">
          <Link href={`/track-order?orderId=${orderId}`} className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>TRACK DISPATCH STATUS</span>
          </Link>
        </Button>

        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          <Link href="/shop" className="flex items-center gap-2">
            <span>EXPLORE MORE MERCH</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
