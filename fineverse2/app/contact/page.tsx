'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageSquare, Clock, Send, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<'ORDER' | 'SIZE' | 'COLLAB' | 'OTHER'>('ORDER');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate immediate response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-silver mb-4">
          <Link href="/" className="hover:text-brand-crimson transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-crimson font-semibold">Support Desk</span>
        </div>

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-tight">
            Creator Support <span className="text-brand-crimson">Desk</span>
          </h1>
          <p className="text-brand-silver text-sm mt-3">
            Have a question regarding Drop 04, size exchanges, or express flight dispatch? 
            Our team responds within 24 hours (average response during drop days is &lt;2 hours).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-brand-dark/60 border border-brand-charcoal/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-black uppercase text-white">
                  Ticket Transmitted Successfully
                </h3>
                <p className="text-xs text-brand-silver max-w-sm mx-auto font-mono">
                  Ticket #FV-SUPPORT-{Math.floor(1000 + Math.random() * 9000)} has been logged. 
                  Our support lead will reply to <span className="text-white font-bold">{formData.email}</span> shortly.
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', orderId: '', message: '' });
                    }}
                  >
                    Submit Another Query
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Inquiry Type Radio / Pill Tabs */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-2">
                    Inquiry Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'ORDER', label: 'Order / AWB' },
                      { id: 'SIZE', label: 'Size Swap' },
                      { id: 'COLLAB', label: 'Collab / Press' },
                      { id: 'OTHER', label: 'General' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setInquiryType(tab.id as any)}
                        className={`text-xs font-mono py-2 px-3 rounded-lg border transition-all text-center ${
                          inquiryType === tab.id
                            ? 'bg-brand-crimson text-white border-brand-crimson font-bold'
                            : 'bg-brand-charcoal/40 text-brand-silver border-brand-charcoal hover:border-white/20'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full bg-brand-charcoal/50 border border-brand-charcoal rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-crimson font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@domain.com"
                      className="w-full bg-brand-charcoal/50 border border-brand-charcoal rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-crimson font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-1.5">
                    Order ID (If applicable)
                  </label>
                  <input
                    type="text"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    placeholder="e.g. FV-2026-8849"
                    className="w-full bg-brand-charcoal/50 border border-brand-charcoal rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-crimson font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-1.5">
                    Message / Request Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry with as much detail as possible..."
                    className="w-full bg-brand-charcoal/50 border border-brand-charcoal rounded-lg p-3.5 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-crimson font-mono resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full gap-2 font-bold uppercase tracking-wider"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Transmitting...' : 'Dispatch Message'}
                </Button>
              </form>
            )}
          </div>

          {/* Quick Contact & Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-brand-dark/40 border border-brand-charcoal/80 space-y-4">
              <h3 className="font-heading font-bold uppercase text-white text-base">
                Direct Channels
              </h3>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-crimson shrink-0 mt-0.5" />
                  <div>
                    <span className="text-brand-silver block text-[10px] uppercase">Support Inbox</span>
                    <a href={`mailto:${siteConfig.supportEmail}`} className="text-white hover:text-brand-crimson font-bold">
                      {siteConfig.supportEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-crimson shrink-0 mt-0.5" />
                  <div>
                    <span className="text-brand-silver block text-[10px] uppercase">WhatsApp Helpline</span>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-crimson font-bold">
                      +91 98765 43210 (Mon - Sat, 10 AM - 7 PM IST)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-crimson shrink-0 mt-0.5" />
                  <div>
                    <span className="text-brand-silver block text-[10px] uppercase">SLA Commitment</span>
                    <span className="text-emerald-400 font-bold">&lt; 24 Hour Resolution Window</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Discord Invite */}
            <div className="p-6 rounded-2xl bg-brand-dark/40 border border-brand-charcoal/80 space-y-3">
              <div className="flex items-center gap-2 text-brand-crimson text-xs font-mono font-bold uppercase">
                <MessageSquare className="w-4 h-4" />
                <span>Discord Underground</span>
              </div>
              <h4 className="font-heading font-bold text-white text-sm uppercase">
                Join 14,000+ Anime Streetwear Collectors
              </h4>
              <p className="text-xs text-brand-silver leading-relaxed">
                Get early drop access links 15 minutes before public drop, sneak peeks into Drop 05 design boards, and trade fit checks.
              </p>
              <div className="pt-2">
                <a
                  href={siteConfig.socialLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs uppercase font-bold tracking-wider transition-colors"
                >
                  Enter Discord Server
                </a>
              </div>
            </div>

            {/* Registered Production Facility */}
            <div className="p-6 rounded-2xl bg-brand-dark/40 border border-brand-charcoal/80 text-xs font-mono space-y-2 text-brand-silver">
              <div className="flex items-center gap-2 text-white font-bold uppercase">
                <MapPin className="w-3.5 h-3.5 text-brand-crimson" />
                <span>Textile Production Hub</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Fineverse Garment Works<br />
                Tirupur Textile Park, Sector 4<br />
                Tirupur, Tamil Nadu — 641602 [EDIT: Replace with legal facility address]
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
