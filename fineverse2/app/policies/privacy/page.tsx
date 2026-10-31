import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Shield, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | FINEVERSE Streetwear',
  description:
    'Data protection, security standards, and privacy compliance under the Digital Personal Data Protection Act (DPDP), India.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-silver mb-4">
          <Link href="/" className="hover:text-brand-crimson transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-silver">Policies</span>
          <span>/</span>
          <span className="text-brand-crimson font-semibold">Privacy Policy</span>
        </div>

        {/* Title */}
        <div className="border-b border-brand-charcoal/80 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-crimson/10 border border-brand-crimson/30 text-brand-crimson text-xs font-mono uppercase tracking-widest mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>DPDP India Compliant</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-tight">
            Privacy & <span className="text-brand-crimson">Data</span> Governance
          </h1>
          <p className="text-brand-silver text-xs font-mono mt-2">
            Last Updated: October 2026 • Complies with the Digital Personal Data Protection (DPDP) Act, India
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-10 text-brand-silver text-sm leading-relaxed font-sans">
          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              1. Commitment to Collector Privacy
            </h2>
            <p>
              FINEVERSE ("we", "us", or "our") respects the privacy of every creator, fan, and collector visiting <strong className="text-white">fineverse.in</strong>. This Privacy Notice governs the collection, processing, and protection of personal data in accordance with the Digital Personal Data Protection Act (DPDP) 2023 of India and applicable telecommunications regulations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              2. Information We Collect
            </h2>
            <p>We only collect information necessary to fulfill your streetwear drops and maintain your vault account:</p>
            <div className="space-y-2 text-xs font-mono bg-brand-dark/40 border border-brand-charcoal/60 rounded-xl p-5">
              <p><strong className="text-white">A. Contact & Identity Data:</strong> Full Name, Email Address, and WhatsApp/Mobile Phone Number.</p>
              <p><strong className="text-white">B. Fulfillment Data:</strong> Complete Shipping Address, Pincode, City, State, and Delivery Landmarks.</p>
              <p><strong className="text-white">C. Transaction Logs:</strong> Razorpay Payment Reference ID, UPI Transaction ID, and Order Receipt Numbers (We NEVER store credit card numbers, CVVs, or Net Banking passwords).</p>
              <p><strong className="text-white">D. Technical Telemetry:</strong> Device type, browser architecture, approximate regional IP location, and browsing journey to prevent automated drop-bot abuse.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              3. Payment Security & Tokenization
            </h2>
            <p>
              All online transactions are processed through <strong className="text-white">Razorpay</strong>, a PCI-DSS Level 1 certified payment aggregator. Sensitive payment credentials (credit/debit cards, net banking passwords, UPI PINs) are processed directly within encrypted bank channels and never touch or reside on FINEVERSE web servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              4. Third-Party Service Providers
            </h2>
            <p>We share minimal required data solely with audited logistics and messaging partners:</p>
            <ul className="list-disc pl-5 space-y-2 text-xs font-mono">
              <li><strong className="text-white">Logistics Integrators (Delhivery / Bluedart):</strong> Name, Shipping Address, Pincode, and Mobile Number for AWB manifest creation and doorstep OTP delivery.</li>
              <li><strong className="text-white">Transactional SMS / WhatsApp:</strong> Automated order confirmation, AWB dispatch alerts, and out-for-delivery OTP notifications.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              5. Cookies & Local Browser Storage
            </h2>
            <p>
              We utilize essential browser local storage (Zustand client-state cache) solely to preserve your active shopping bag items and saved wishlist pieces across page refreshes. We do not sell user data to advertising data brokers or commercial data syndicates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-heading font-black uppercase text-white tracking-wide">
              6. Your Rights & Grievance Officer
            </h2>
            <p>
              Under the DPDP Act of India, you hold the legal right to request inspection, correction, or permanent erasure of your personal account information from our systems at any time.
            </p>
            <div className="p-5 rounded-xl bg-brand-dark/50 border border-brand-charcoal/80 text-xs font-mono space-y-1">
              <span className="text-brand-crimson font-bold uppercase block mb-1">Grievance & Privacy Officer</span>
              <p className="text-white">Designated Officer: Privacy Operations Lead [EDIT: Replace with Legal Officer Name]</p>
              <p>Email: <a href={`mailto:${siteConfig.supportEmail}`} className="text-brand-crimson hover:underline">{siteConfig.supportEmail}</a></p>
              <p>Jurisdiction: Bengaluru, Karnataka / Tirupur, Tamil Nadu</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
