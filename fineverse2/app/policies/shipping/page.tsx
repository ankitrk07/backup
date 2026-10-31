import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Truck, ShieldCheck, Clock, MapPin, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { formatINR } from '@/lib/formatters';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | FINEVERSE Streetwear',
  description:
    'Comprehensive delivery guidelines, air express speeds, and free shipping thresholds across India for FINEVERSE collector drops.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-silver mb-4">
          <Link href="/" className="hover:text-brand-crimson transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-silver">Policies</span>
          <span>/</span>
          <span className="text-brand-crimson font-semibold">Shipping Policy</span>
        </div>

        {/* Title */}
        <div className="border-b border-brand-charcoal/80 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-crimson/10 border border-brand-crimson/30 text-brand-crimson text-xs font-mono uppercase tracking-widest mb-3">
            <Truck className="w-3.5 h-3.5" />
            <span>Fulfillment Protocol</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-tight">
            Shipping & <span className="text-brand-crimson">Delivery</span> Policy
          </h1>
          <p className="text-brand-silver text-xs font-mono mt-2">
            Effective Date: October 2026 • Governs all domestic shipments from Tirupur, India
          </p>
        </div>

        {/* Key Highlight Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-brand-dark/60 border border-brand-charcoal/80 mb-12">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block">Free Shipping Tier</span>
            <span className="text-lg font-black font-heading text-emerald-400 mt-1 block">
              Above {formatINR(siteConfig.shipping.freeShippingThreshold)}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block">Dispatch Window</span>
            <span className="text-lg font-black font-heading text-white mt-1 block">
              24 – 48 Hours
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block">Primary Logistics</span>
            <span className="text-lg font-black font-heading text-brand-crimson mt-1 block">
              Bluedart / Delhivery Air
            </span>
          </div>
        </div>

        {/* Policy Body */}
        <div className="space-y-10 text-brand-silver text-sm leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              1. Fulfillment & Dispatch Hub
            </h2>
            <p>
              All FINEVERSE collector garments, including limited numbered drops and core catalog pieces, are quality checked, ironed, and sealed in tamper-evident security bags directly at our textile production facility in Tirupur, Tamil Nadu — the textile capital of India.
            </p>
            <p>
              Orders are dispatched Monday through Saturday (excluding national holidays). Once an order is processed, a tracking link with your assigned Airway Bill (AWB) number is transmitted immediately via SMS and email.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              2. Shipping Charges & Rates
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">Prepaid Orders above {formatINR(siteConfig.shipping.freeShippingThreshold)}:</strong> Free Air Express delivery across all serviceable pin codes in India.
              </li>
              <li>
                <strong className="text-white">Orders below {formatINR(siteConfig.shipping.freeShippingThreshold)}:</strong> A flat standard shipping fee of ₹99 is added at checkout.
              </li>
              <li>
                <strong className="text-white">Cash on Delivery (COD):</strong> An additional logistics convenience fee of ₹99 applies to all COD shipments to cover third-party courier cash handling charges.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              3. Estimated Transit Times
            </h2>
            <p>
              We partner exclusively with premium Tier-1 air couriers (Delhivery Air Express, Blue Dart Apex, and Xpressbees Air) to ensure minimum transit delay:
            </p>
            <div className="bg-brand-dark/40 border border-brand-charcoal/60 rounded-xl p-4 font-mono text-xs space-y-2">
              <div className="flex justify-between py-1 border-b border-brand-charcoal/40">
                <span>Metro Cities (Bengaluru, Mumbai, Delhi NCR, Chennai, Hyderabad, Kolkata)</span>
                <strong className="text-white">2 – 4 Business Days</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-charcoal/40">
                <span>Tier 2 Cities & State Capitals</span>
                <strong className="text-white">3 – 5 Business Days</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Tier 3 & Remote Regional Pin Codes</span>
                <strong className="text-white">5 – 7 Business Days</strong>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              4. Tamper Evident Packaging & Delivery Inspection
            </h2>
            <p>
              Every Fineverse order is shipped in custom-branded, heavy-duty matte poly mailers featuring a reinforced security seal tape.
            </p>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white mb-0.5">IMPORTANT ADVISORY:</strong>
                If the outer mailer appears cut, retaped, or tampered with at the time of delivery, do NOT accept the parcel from the delivery agent. Refuse the delivery noting "Damaged/Tampered Packaging" and immediately inform our support desk at{' '}
                <a href={`mailto:${siteConfig.supportEmail}`} className="underline font-bold text-white">
                  {siteConfig.supportEmail}
                </a>.
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              5. Undelivered or Returned Parcels (RTO)
            </h2>
            <p>
              In the event that an order cannot be delivered due to an incorrect address, non-availability of the recipient across three delivery attempts, or refusal of COD payment, the shipment will be returned to our Tirupur facility (RTO). 
            </p>
            <p>
              Re-shipping a returned order requires customer address verification and will incur a standard re-dispatch fee of ₹150.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
