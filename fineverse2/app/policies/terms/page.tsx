import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { FileText, ShieldAlert, Scale, Ban, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms of Service | FINEVERSE Streetwear',
  description:
    'Terms of service, limited drop allocation mechanics, anti-bot rules, and governing legal frameworks for FINEVERSE.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-silver mb-4">
          <Link href="/" className="hover:text-brand-crimson transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-silver">Policies</span>
          <span>/</span>
          <span className="text-brand-crimson font-semibold">Terms of Service</span>
        </div>

        {/* Title */}
        <div className="border-b border-brand-charcoal/80 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-crimson/10 border border-brand-crimson/30 text-brand-crimson text-xs font-mono uppercase tracking-widest mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-tight">
            Terms of <span className="text-brand-crimson">Service</span>
          </h1>
          <p className="text-brand-silver text-xs font-mono mt-2">
            Last Updated: October 2026 • Governs usage of fineverse.in & limited streetwear drop releases
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-10 text-brand-silver text-sm leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing, browsing, or purchasing products on <strong className="text-white">fineverse.in</strong> (operated by Fineverse Apparel & Merchandise Pvt. Ltd. [EDIT: Replace with legal entity name]), you expressly agree to be bound by these Terms of Service and all related policies referenced herein.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              2. Limited Drop Mechanics & Anti-Bot Fair Allocation
            </h2>
            <p>
              To ensure that our creator-designed anime streetwear remains accessible to real fans and dedicated collectors rather than commercial scalpers or automated scrapers:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs font-mono">
              <li>
                <strong className="text-white">Household Purchase Limit:</strong> We enforce a strict maximum limit of <strong className="text-brand-crimson">2 units per drop design per customer/address</strong>.
              </li>
              <li>
                <strong className="text-white">Anti-Bot Cancellation Right:</strong> Any transaction detected to originate from automated scripts, proxy farms, disposable virtual credit cards, or bot frameworks will be cancelled immediately and refunded with a 10% administrative cancellation penalty.
              </li>
              <li>
                <strong className="text-white">Allocation Confirmation:</strong> An item placed in your digital shopping bag does NOT reserve the inventory until payment confirmation is finalized at the gateway.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              3. Pricing, GST & Accuracy
            </h2>
            <p>
              All prices displayed on FINEVERSE are denominated in Indian Rupees (INR) and are <strong className="text-white">fully inclusive of all applicable Goods and Services Tax (GST)</strong>. A digitally signed GST tax invoice is transmitted automatically upon order shipment.
            </p>
            <p>
              We strive for complete accuracy across color reproduction, fabric GSM ratings (240 GSM tees and 420 GSM hoodies), and measurements. However, slight batch-level visual variances of ±3% may occur due to artisanal screen printing and reactive low-impact vat dyeing techniques.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              4. Intellectual Property & Artwork Rights
            </h2>
            <p>
              All visual designs, typography, garment graphics, character concept art, drop names (including "Sisters Revenge", "Cyber Samurai", and "Neon Ronin"), and multimedia assets featured on fineverse.in are the exclusive proprietary intellectual property of FINEVERSE and its creator partners.
            </p>
            <p>
              Unauthorized reproduction, re-printing, derivative manufacturing, or commercial resale of Fineverse artworks is strictly prohibited under the Copyright Act, 1957 of India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              5. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms of Service and any transactional disputes arising out of the purchase of products shall be governed exclusively by the laws of India. Any legal proceedings or dispute arbitration shall be subject to the exclusive jurisdiction of the competent courts in <strong className="text-white">Bengaluru, Karnataka, India</strong> [EDIT: Update jurisdiction city if required].
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
