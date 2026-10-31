import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { RotateCcw, ShieldCheck, Video, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Returns & Exchange Policy | FINEVERSE Streetwear',
  description:
    'Clear guidelines on 7-day doorstep size swaps, unboxing video policy for limited drops, and return eligibility.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-silver mb-4">
          <Link href="/" className="hover:text-brand-crimson transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-silver">Policies</span>
          <span>/</span>
          <span className="text-brand-crimson font-semibold">Returns & Exchanges</span>
        </div>

        {/* Title */}
        <div className="border-b border-brand-charcoal/80 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-crimson/10 border border-brand-crimson/30 text-brand-crimson text-xs font-mono uppercase tracking-widest mb-3">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Customer Guarantee</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-tight">
            Returns & <span className="text-brand-crimson">Exchange</span> Policy
          </h1>
          <p className="text-brand-silver text-xs font-mono mt-2">
            Effective Date: October 2026 • 7-Day Doorstep Replacement Window
          </p>
        </div>

        {/* Guarantee Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-brand-dark/60 border border-brand-charcoal/80 mb-12">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block">Exchange Window</span>
            <span className="text-lg font-black font-heading text-emerald-400 mt-1 block">
              7 Days from Delivery
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block">Size Swap Fee</span>
            <span className="text-lg font-black font-heading text-white mt-1 block">
              ₹0 (First Swap Free)
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block">Reverse Pickup</span>
            <span className="text-lg font-black font-heading text-brand-crimson mt-1 block">
              Doorstep Courier Pickup
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="space-y-10 text-brand-silver text-sm leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              1. 7-Day Size Exchange Commitment
            </h2>
            <p>
              We want your oversized silhouette to fit exactly how you envision. If the size you ordered does not drape to your preference, you can request a size exchange within <strong className="text-white">7 days</strong> of marked parcel delivery.
            </p>
            <p>
              Your first size exchange on any order is completely free of charge. We arrange an air courier partner to pick up the item from your doorstep and dispatch the replacement size once inspected.
            </p>
          </section>

          {/* Unboxing Video Callout */}
          <section className="p-6 rounded-2xl bg-brand-dark/80 border border-brand-crimson/40 space-y-3">
            <div className="flex items-center gap-2 text-brand-crimson font-mono font-bold text-xs uppercase tracking-wider">
              <Video className="w-4 h-4" />
              <span>Collector Drop Condition: Unboxing Video Policy</span>
            </div>
            <h3 className="text-base font-heading font-bold text-white uppercase">
              Mandatory Video for Transit Damage / Defect Claims
            </h3>
            <p className="text-xs text-brand-silver leading-relaxed font-sans">
              Because FINEVERSE pieces are limited numbered drops (e.g. Drop 04 "Sisters Revenge" limited to 500 units), we enforce an unboxing video policy for claims involving fabric cuts, stitching defects, missing items, or wrong size received:
            </p>
            <ul className="list-disc pl-5 text-xs space-y-1.5 font-mono text-brand-silver">
              <li>Record a clear, unedited, continuous video showing the sealed courier poly mailer before cutting.</li>
              <li>Show the shipping label with AWB number clearly legible.</li>
              <li>Open the parcel and display the garment front, back, and neck tag.</li>
            </ul>
            <p className="text-xs text-brand-silver/90">
              This protects both collectors from postal pilferage and ensures instantaneous, no-questions-asked replacement authorization.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              2. Eligibility Criteria for Returns & Swaps
            </h2>
            <p>To qualify for an exchange or store credit voucher, the garment must satisfy the following conditions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-brand-dark/40 border border-brand-charcoal/60 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs">Unworn, unwashed, and free of perfumes or body odor.</span>
              </div>
              <div className="p-4 rounded-xl bg-brand-dark/40 border border-brand-charcoal/60 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs">Original woven Fineverse tags & NFC security tag intact.</span>
              </div>
              <div className="p-4 rounded-xl bg-brand-dark/40 border border-brand-charcoal/60 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs">Returned inside original matte poly packaging.</span>
              </div>
              <div className="p-4 rounded-xl bg-brand-dark/40 border border-brand-charcoal/60 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs">Initiated within 7 calendar days of courier delivery.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              3. Refund & Store Credit Mode
            </h2>
            <p>
              In situations where the requested replacement size in a limited drop has completely sold out, customers will be issued a full refund:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">Prepaid Orders (UPI / Cards):</strong> Refund credited directly back to the original source payment account within 5–7 business days of warehouse inspection.
              </li>
              <li>
                <strong className="text-white">Cash on Delivery (COD):</strong> Refund issued as an instant Fineverse Store Credit Voucher or via direct Bank Transfer / UPI upon receiving verified account details.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              4. How to Initiate an Exchange
            </h2>
            <p>
              Initiating a swap takes less than 2 minutes:
            </p>
            <ol className="list-decimal pl-5 space-y-2 font-mono text-xs">
              <li>Navigate to the <Link href="/contact" className="text-brand-crimson underline font-bold">Support Desk</Link> or your <Link href="/account" className="text-brand-crimson underline font-bold">Account Portal</Link>.</li>
              <li>Select category "Size Swap" and provide your Order ID (e.g. FV-2026-8849).</li>
              <li>Specify your current size and your requested replacement size.</li>
              <li>Our team dispatches reverse pickup instructions within 12 hours.</li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
