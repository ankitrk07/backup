'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ArrowRight, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    id: 'drops',
    title: 'Drops & Limited Allocations',
    items: [
      {
        q: 'How do Fineverse drops work?',
        a: 'We operate on a limited capsule drop model. Each drop (such as Drop 04 "Sisters Revenge") is strictly limited to 500 numbered units across all sizes. Once all allocations are claimed, the collection is vaulted and never reprinted, protecting the exclusivity of collector pieces.',
      },
      {
        q: 'Will sold-out sizes be restocked?',
        a: 'Core collection basic garments may restock periodically, but numbered drop pieces (Drop 01 through 04) are strictly limited and will not be re-manufactured once sold out.',
      },
      {
        q: 'How does the NFC Authentication Tag work?',
        a: 'Every limited drop hoodie and t-shirt features a woven or embedded NFC security chip. Tapping your smartphone (iPhone or Android) against the chip instantly opens a cryptographic verification screen displaying your individual sequence number and authenticity certificate.',
      },
    ],
  },
  {
    id: 'fabric',
    title: 'Fabric, GSM & Sizing',
    items: [
      {
        q: 'What is GSM and why does it matter?',
        a: 'GSM stands for Grams per Square Meter — the objective measure of fabric density and heft. Cheap fast-fashion t-shirts are typically 140–160 GSM. Fineverse tees are cut from custom-milled 240 GSM 100% Super Combed Compact Cotton (Single Jersey), giving them a substantial drape that holds its shape. Our hoodies are heavyweight 420 GSM 100% Cotton French Terry loopback.',
      },
      {
        q: 'Are your garments 100% Cotton?',
        a: 'Yes. We strictly use 100% combed compact cotton for both our 240 GSM tees and 420 GSM hoodies. We do not blend polyester or cheap synthetic fleece fillers into our streetwear.',
      },
      {
        q: 'How does the oversized silhouette fit?',
        a: 'Our silhouettes are custom graded with dropped shoulders and a boxy, architectural chest width. For an intended streetwear oversized drape, order your true size. If you prefer a regular or fitted silhouette, size down one size.',
      },
      {
        q: 'How should I wash and care for my Fineverse pieces?',
        a: 'Always machine wash inside-out in cold water (maximum 30°C) on a gentle cycle. Never iron directly over screen prints or high-density puff graphics. Hang dry in shade; do not tumble dry to prevent shrinkage and preserve fabric weight.',
      },
    ],
  },
  {
    id: 'shipping',
    title: 'Shipping, Speeds & Tracking',
    items: [
      {
        q: 'What are your delivery timelines across India?',
        a: 'Orders are dispatched within 24–48 hours directly from our manufacturing hub in Tirupur, Tamil Nadu. Metro deliveries (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata) arrive via air courier in 2–4 business days. Tier 2 and Tier 3 cities typically take 4–6 business days.',
      },
      {
        q: 'Is shipping free?',
        a: 'Yes! All orders above ₹1,999 qualify for Free Air Express Shipping across India. For orders under ₹1,999, a flat delivery fee of ₹99 applies.',
      },
      {
        q: 'How do I track my order?',
        a: 'Immediately upon dispatch, you will receive an SMS and email with your Airway Bill (AWB) number. You can track your package live at any time on our /track-order page using your Order ID or AWB.',
      },
    ],
  },
  {
    id: 'payment',
    title: 'Payment & Cash on Delivery (COD)',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major Indian payment channels powered by Razorpay: UPI (Google Pay, PhonePe, Paytm, CRED), Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking across 50+ banks, and Cash on Delivery (COD).',
      },
      {
        q: 'Is Cash on Delivery (COD) available for all pin codes?',
        a: 'Yes, COD is supported for orders up to ₹5,000 across 19,000+ Indian pin codes serviced by Delhivery and Bluedart. A nominal ₹99 COD handling fee is charged by logistics partners. All COD orders require a rapid automated WhatsApp/SMS verification prior to warehouse dispatch.',
      },
      {
        q: 'Is online payment secure?',
        a: '100% secure. All payments are encrypted using bank-grade 256-bit SSL via PCI-DSS Level 1 certified gateways. Fineverse does not store credit card or banking credentials.',
      },
    ],
  },
  {
    id: 'returns',
    title: 'Returns & Size Swaps',
    items: [
      {
        q: 'What is your size exchange policy?',
        a: 'We offer a hassle-free 7-day doorstep size exchange. If the fit isn’t perfect, submit a request via our Contact or Account portal within 7 days of delivery. Our courier partner will pick up the garment and hand over your replacement size simultaneously.',
      },
      {
        q: 'Why do you recommend an unboxing video?',
        a: 'Because Fineverse pieces are limited collector drops, we request customers to record a continuous unboxing video when opening their courier package. This guarantees immediate replacement in the rare event of transit damage or missing tags.',
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('drops');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'drops-0': true,
    'fabric-0': true,
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentCategoryData = faqData.find((c) => c.id === activeCategory) || faqData[0];

  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-silver mb-4">
          <Link href="/" className="hover:text-brand-crimson transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-crimson font-semibold">Knowledge Base</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-crimson/10 border border-brand-crimson/30 text-brand-crimson text-xs font-mono uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-tight">
            Clear Answers. <span className="text-brand-crimson">Zero Ambiguity.</span>
          </h1>
          <p className="text-brand-silver text-sm mt-3 font-sans">
            Everything you need to know about GSM specifications, limited drops, Tirupur shipping, and doorstep size swaps.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {faqData.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-brand-crimson text-white border-brand-crimson shadow-lg shadow-brand-crimson/30'
                  : 'bg-brand-dark/80 text-brand-silver border-brand-charcoal hover:border-white/30'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Accordion Questions */}
        <div className="bg-brand-dark/60 border border-brand-charcoal/80 rounded-2xl divide-y divide-brand-charcoal/60 overflow-hidden shadow-2xl backdrop-blur-md">
          {currentCategoryData.items.map((item, idx) => {
            const key = `${currentCategoryData.id}-${idx}`;
            const isOpen = Boolean(openItems[key]);

            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleItem(key)}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-center justify-between gap-4 group"
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-brand-crimson transition-colors">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-brand-charcoal/50 flex items-center justify-center shrink-0 text-brand-silver transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-brand-crimson bg-brand-crimson/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 text-sm text-brand-silver leading-relaxed font-sans animate-fade-in">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-14 p-8 rounded-2xl bg-brand-dark/40 border border-brand-charcoal/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-heading font-black uppercase text-white text-lg">
              Still Need Clarification?
            </h4>
            <p className="text-xs text-brand-silver font-sans mt-1">
              Speak directly with our support engineers on Discord or submit a priority ticket.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-brand-crimson hover:bg-brand-crimson/90 text-white font-mono text-xs uppercase font-bold tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              Contact Support
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
