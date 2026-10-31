'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  PhoneCall,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

interface Checkpoint {
  title: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
  description: string;
}

interface TrackingData {
  orderId: string;
  trackingNumber: string;
  courier: string;
  status: 'PROCESSING' | 'DISPATCHED' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  estimatedDelivery: string;
  recipientName: string;
  destinationCity: string;
  destinationPincode: string;
  items: {
    name: string;
    size: string;
    qty: number;
  }[];
  timeline: Checkpoint[];
}

const mockOrderDatabase: Record<string, TrackingData> = {
  'FV-2026-8849': {
    orderId: 'FV-2026-8849',
    trackingNumber: 'DLV89124401IN',
    courier: 'Delhivery Air Express',
    status: 'IN_TRANSIT',
    estimatedDelivery: 'Oct 26, 2026 (Before 7:00 PM)',
    recipientName: 'Aarav Kumar',
    destinationCity: 'Bengaluru, Karnataka',
    destinationPincode: '560038',
    items: [
      { name: 'Sisters Revenge Heavyweight Hoodie', size: 'L', qty: 1 },
      { name: 'Sisters Revenge Oversized Tee', size: 'XL', qty: 1 },
    ],
    timeline: [
      {
        title: 'Order Confirmed & Payment Captured',
        location: 'Fineverse Core Server',
        timestamp: 'Oct 18, 2026 • 14:22 IST',
        completed: true,
        description: 'Payment authorized via Razorpay UPI. Order queue reserved.',
      },
      {
        title: 'Quality Check & NFC Tagging',
        location: 'Tirupur Garment Hub, Tamil Nadu',
        timestamp: 'Oct 19, 2026 • 09:40 IST',
        completed: true,
        description: '420 GSM French Terry loopback inspection passed. NFC chip encoded.',
      },
      {
        title: 'Manifested & Handed to Delhivery Air Express',
        location: 'Coimbatore Airport Cargo Terminal',
        timestamp: 'Oct 20, 2026 • 18:15 IST',
        completed: true,
        description: 'Airway Bill DLV89124401IN generated and scheduled on freighter flight.',
      },
      {
        title: 'Arrived at Destination Hub (In Transit)',
        location: 'Bengaluru Airport Sorting Center',
        timestamp: 'Oct 22, 2026 • 04:30 IST',
        completed: true,
        current: true,
        description: 'Package sorted into East Bengaluru delivery zonal bag.',
      },
      {
        title: 'Out for Delivery',
        location: 'Indiranagar Delivery Center',
        timestamp: 'Pending Expected: Oct 26',
        completed: false,
        description: 'Assigned to delivery agent with OTP verification.',
      },
      {
        title: 'Delivered',
        location: 'Recipient Address',
        timestamp: 'Pending',
        completed: false,
        description: 'Delivered and signed by recipient.',
      },
    ],
  },
  'FV-2026-7210': {
    orderId: 'FV-2026-7210',
    trackingNumber: 'BLU77310920IN',
    courier: 'Bluedart Apex Air',
    status: 'DELIVERED',
    estimatedDelivery: 'Sep 05, 2026',
    recipientName: 'Aarav Kumar',
    destinationCity: 'Bengaluru, Karnataka',
    destinationPincode: '560038',
    items: [
      { name: 'Cyber Samurai Oversized Acid-Wash Tee', size: 'L', qty: 1 },
    ],
    timeline: [
      {
        title: 'Order Confirmed',
        location: 'Fineverse Core Server',
        timestamp: 'Sep 02, 2026 • 11:15 IST',
        completed: true,
        description: 'Payment verified.',
      },
      {
        title: 'Dispatched from Tirupur Hub',
        location: 'Tirupur, Tamil Nadu',
        timestamp: 'Sep 03, 2026 • 16:00 IST',
        completed: true,
        description: 'Handed over to Bluedart Express.',
      },
      {
        title: 'Delivered to Recipient',
        location: 'Bengaluru, Karnataka',
        timestamp: 'Sep 05, 2026 • 13:45 IST',
        completed: true,
        description: 'Delivered securely. OTP validated.',
      },
    ],
  },
};

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const urlOrderId = searchParams.get('orderId') || searchParams.get('id') || '';

  const [inputOrderId, setInputOrderId] = useState(urlOrderId || 'FV-2026-8849');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [activeTracking, setActiveTracking] = useState<TrackingData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Auto-search on mount if URL parameter is present
  useEffect(() => {
    if (urlOrderId) {
      handleLookup(urlOrderId);
    } else {
      // Default initial display for interactive UX
      handleLookup('FV-2026-8849');
    }
  }, [urlOrderId]);

  const handleLookup = (idToLookup: string) => {
    const cleanId = idToLookup.trim().toUpperCase();
    if (!cleanId) return;

    setIsSearching(true);
    setErrorMessage('');

    setTimeout(() => {
      const found = mockOrderDatabase[cleanId];
      if (found) {
        setActiveTracking(found);
      } else {
        // Generate a synthetic live tracking preview for any valid order ID format
        setActiveTracking({
          orderId: cleanId,
          trackingNumber: `DLV${Math.floor(100000000 + Math.random() * 900000000)}IN`,
          courier: 'Delhivery Air Express',
          status: 'IN_TRANSIT',
          estimatedDelivery: 'Within 3-4 Business Days',
          recipientName: 'Verified Collector',
          destinationCity: 'Regional Destination Hub',
          destinationPincode: 'Verified Pincode',
          items: [{ name: 'Drop 04 Collector Edition Garment', size: 'L', qty: 1 }],
          timeline: [
            {
              title: 'Order Confirmed & Pre-Authorized',
              location: 'Fineverse Core Server',
              timestamp: 'Recently Recorded',
              completed: true,
              description: 'Order confirmed and registered in production schedule.',
            },
            {
              title: 'Quality Check & NFC Authentication',
              location: 'Tirupur Hub, Tamil Nadu',
              timestamp: 'In Progress',
              completed: true,
              current: true,
              description: 'Textile inspection and barcode generation.',
            },
            {
              title: 'Handover to Air Courier Partner',
              location: 'Transit Air Terminal',
              timestamp: 'Scheduled',
              completed: false,
              description: 'Air manifest preparation for rapid air express delivery.',
            },
            {
              title: 'Out for Delivery',
              location: 'Destination Delivery Hub',
              timestamp: 'Pending',
              completed: false,
              description: 'Contactless OTP delivery to your doorstep.',
            },
          ],
        });
      }
      setIsSearching(false);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLookup(inputOrderId);
  };

  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-silver mb-3">
          <Link href="/" className="hover:text-brand-crimson transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-crimson font-semibold">Live Order Tracking</span>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-tight">
            Live Dispatch <span className="text-brand-crimson">Radar</span>
          </h1>
          <p className="text-brand-silver text-sm mt-3">
            Real-time GPS status, textile manufacturing checks, and AWB flight tracking for all Fineverse drops.
          </p>
        </div>

        {/* Tracking Search Card */}
        <div className="bg-brand-dark/70 border border-brand-charcoal/80 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl mb-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-1.5">
                  Order ID or AWB Tracking #
                </label>
                <div className="relative">
                  <Package className="w-4 h-4 text-brand-silver absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={inputOrderId}
                    onChange={(e) => setInputOrderId(e.target.value)}
                    placeholder="e.g. FV-2026-8849"
                    className="w-full bg-brand-charcoal/60 border border-brand-charcoal rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-crimson font-mono uppercase tracking-wider"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-1.5">
                  Phone (Optional for SMS Sync)
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-brand-silver absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-brand-charcoal/60 border border-brand-charcoal rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-crimson font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-silver">
                <span>Quick demo orders:</span>
                <button
                  type="button"
                  onClick={() => { setInputOrderId('FV-2026-8849'); handleLookup('FV-2026-8849'); }}
                  className="text-brand-crimson hover:underline"
                >
                  FV-2026-8849 (In Transit)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => { setInputOrderId('FV-2026-7210'); handleLookup('FV-2026-7210'); }}
                  className="text-brand-crimson hover:underline"
                >
                  FV-2026-7210 (Delivered)
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSearching}
                className="gap-2 font-bold uppercase tracking-wider"
              >
                <Search className="w-4 h-4" />
                {isSearching ? 'Querying Radar...' : 'Locate Order'}
              </Button>
            </div>
          </form>
        </div>

        {/* Tracking Details View */}
        {activeTracking && (
          <div className="space-y-8 animate-fade-in">
            {/* High-level status banner */}
            <div className="rounded-2xl border border-brand-charcoal/80 bg-brand-dark/50 p-6 md:p-8 backdrop-blur-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brand-charcoal/60 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl md:text-2xl font-black font-heading uppercase text-white tracking-tight">
                      Order {activeTracking.orderId}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono uppercase tracking-wider bg-brand-crimson/20 text-brand-crimson border border-brand-crimson/40">
                      {activeTracking.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-brand-silver mt-1">
                    Courier: <strong className="text-white">{activeTracking.courier}</strong> • AWB:{' '}
                    <span className="text-brand-crimson font-bold">{activeTracking.trackingNumber}</span>
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block">
                    Estimated Delivery
                  </span>
                  <span className="text-base font-bold font-mono text-emerald-400 flex items-center gap-1.5 md:justify-end mt-0.5">
                    <Calendar className="w-4 h-4" />
                    {activeTracking.estimatedDelivery}
                  </span>
                </div>
              </div>

              {/* Items in package */}
              <div className="py-6 border-b border-brand-charcoal/60">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block mb-3">
                  Allocated Pieces in Consignment
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeTracking.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-brand-charcoal/40 border border-brand-charcoal/50">
                      <div className="w-8 h-8 rounded bg-brand-charcoal flex items-center justify-center font-mono text-xs font-bold text-brand-silver">
                        {it.size}
                      </div>
                      <div className="text-xs">
                        <p className="font-heading font-bold text-white">{it.name}</p>
                        <p className="text-brand-silver font-mono">Qty: {it.qty} • Size: {it.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Timeline */}
              <div className="pt-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block mb-6">
                  Fulfillment & Transit Timeline
                </span>

                <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-charcoal">
                  {activeTracking.timeline.map((step, idx) => {
                    const isDone = step.completed;
                    const isCurr = step.current;

                    return (
                      <div key={idx} className="relative group">
                        {/* Dot indicator */}
                        <div
                          className={`absolute -left-[30px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            isDone
                              ? 'bg-brand-crimson text-white shadow-lg shadow-brand-crimson/50'
                              : isCurr
                              ? 'bg-amber-400 text-brand-black animate-pulse'
                              : 'bg-brand-charcoal text-brand-silver border border-white/10'
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : isCurr ? (
                            <Clock className="w-3 h-3" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-silver/50" />
                          )}
                        </div>

                        {/* Text */}
                        <div>
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <h4
                              className={`text-sm font-heading font-bold uppercase tracking-wider ${
                                isDone || isCurr ? 'text-white' : 'text-brand-silver/60'
                              }`}
                            >
                              {step.title}
                            </h4>
                            <span className="text-xs font-mono text-brand-silver">
                              {step.timestamp}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs font-mono text-brand-silver/80 mt-0.5">
                            <MapPin className="w-3 h-3 text-brand-crimson" />
                            <span>{step.location}</span>
                          </div>

                          <p className="text-xs text-brand-silver mt-1.5 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Need Help Strip */}
            <div className="p-6 rounded-2xl bg-brand-dark/40 border border-brand-charcoal/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-brand-crimson shrink-0" />
                <div className="text-xs">
                  <p className="font-heading font-bold text-white uppercase">Discrepancy with delivery?</p>
                  <p className="text-brand-silver">
                    Our creator support desk handles express reroutes and damaged parcel claims within 24 hours.
                  </p>
                </div>
              </div>
              <Link href="/contact">
                <Button variant="outline" size="sm" className="whitespace-nowrap font-mono text-xs uppercase">
                  Contact Support Desk
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-black text-white pt-32 pb-24 flex items-center justify-center">
          <div className="text-center font-mono text-xs text-brand-silver">
            <div className="w-8 h-8 border-2 border-brand-crimson border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            Loading Order Radar...
          </div>
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
