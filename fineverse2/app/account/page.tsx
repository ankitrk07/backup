'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  MapPin,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
} from 'lucide-react';
import { formatINR } from '@/lib/formatters';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';

interface MockOrder {
  id: string;
  date: string;
  status: 'DELIVERED' | 'IN_TRANSIT' | 'PROCESSING';
  total: number;
  itemsCount: number;
  items: {
    name: string;
    size: string;
    qty: number;
    price: number;
  }[];
  trackingNumber: string;
}

const mockOrdersList: MockOrder[] = [
  {
    id: 'FV-2026-8849',
    date: '2026-10-18',
    status: 'IN_TRANSIT',
    total: 3998,
    itemsCount: 2,
    items: [
      {
        name: 'Sisters Revenge Heavyweight Hoodie',
        size: 'L',
        qty: 1,
        price: 2499,
      },
      {
        name: 'Sisters Revenge Oversized Tee',
        size: 'XL',
        qty: 1,
        price: 1499,
      },
    ],
    trackingNumber: 'DLV89124401IN',
  },
  {
    id: 'FV-2026-7210',
    date: '2026-09-02',
    status: 'DELIVERED',
    total: 1499,
    itemsCount: 1,
    items: [
      {
        name: 'Cyber Samurai Oversized Acid-Wash Tee',
        size: 'L',
        qty: 1,
        price: 1499,
      },
    ],
    trackingNumber: 'BLU77310920IN',
  },
];

export default function AccountPage() {
  // Simulated authenticated user state (defaults to true for high-touch portfolio demo, can toggle to preview auth screen)
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);

  // Form states for login/signup
  const [email, setEmail] = useState('collector@fineverse.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleSimulateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-silver mb-4">
          <Link href="/" className="hover:text-brand-crimson transition-colors">Home</Link>
          <span>/</span>
          <span className="text-brand-crimson font-semibold">Account Portal</span>
        </div>

        {isAuthenticated ? (
          <div>
            {/* User Profile Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-brand-dark/70 border border-brand-charcoal/80 p-6 md:p-8 mb-8 backdrop-blur-md">
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-crimson/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-crimson to-brand-charcoal flex items-center justify-center text-white text-xl font-heading font-black shadow-lg shadow-brand-crimson/20 border border-white/10">
                    AK
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h1 className="text-2xl font-black font-heading tracking-tight uppercase">
                        Aarav Kumar
                      </h1>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-brand-crimson/20 text-brand-crimson border border-brand-crimson/30">
                        Drop 04 Pioneer
                      </span>
                    </div>
                    <p className="text-brand-silver text-xs font-mono mt-0.5">
                      collector@fineverse.in • +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link href="/track-order">
                    <Button variant="outline" size="sm" className="gap-2 text-xs uppercase tracking-wider">
                      <Truck className="w-3.5 h-3.5 text-brand-crimson" />
                      Live Order Tracker
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-xs uppercase tracking-wider text-brand-silver hover:text-brand-crimson gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </Button>
                </div>
              </div>

              {/* VIP Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-brand-charcoal/60">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block">Vault Member Since</span>
                  <span className="text-sm font-bold font-mono text-white mt-1 block">July 2025</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block">Drops Claimed</span>
                  <span className="text-sm font-bold font-mono text-brand-crimson mt-1 block">3 Releases</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block">Early Access Pass</span>
                  <span className="text-sm font-bold font-mono text-emerald-400 mt-1 block">Active (Tier 1)</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-silver block">Authentication NFCs</span>
                  <span className="text-sm font-bold font-mono text-white mt-1 block">3 Certified</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-brand-charcoal/80 mb-8 gap-8">
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`flex items-center gap-2 pb-4 text-sm font-mono uppercase tracking-wider font-bold transition-all relative ${
                  activeTab === 'orders'
                    ? 'text-brand-crimson border-b-2 border-brand-crimson'
                    : 'text-brand-silver hover:text-white'
                }`}
              >
                <Package className="w-4 h-4" />
                Orders & Shipments ({mockOrdersList.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('addresses')}
                className={`flex items-center gap-2 pb-4 text-sm font-mono uppercase tracking-wider font-bold transition-all relative ${
                  activeTab === 'addresses'
                    ? 'text-brand-crimson border-b-2 border-brand-crimson'
                    : 'text-brand-silver hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4" />
                Saved Delivery Addresses
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 pb-4 text-sm font-mono uppercase tracking-wider font-bold transition-all relative ${
                  activeTab === 'profile'
                    ? 'text-brand-crimson border-b-2 border-brand-crimson'
                    : 'text-brand-silver hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                Profile & Security
              </button>
            </div>

            {/* TAB: Orders */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {mockOrdersList.map((order) => {
                  const isInTransit = order.status === 'IN_TRANSIT';
                  const isDelivered = order.status === 'DELIVERED';

                  return (
                    <div
                      key={order.id}
                      className="rounded-xl border border-brand-charcoal/80 bg-brand-dark/50 overflow-hidden hover:border-brand-charcoal transition-colors"
                    >
                      {/* Order summary bar */}
                      <div className="p-4 sm:p-5 bg-brand-charcoal/30 border-b border-brand-charcoal/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                          <div>
                            <span className="text-brand-silver block text-[10px] uppercase tracking-wider">Order ID</span>
                            <span className="text-white font-bold">{order.id}</span>
                          </div>
                          <div>
                            <span className="text-brand-silver block text-[10px] uppercase tracking-wider">Date Placed</span>
                            <span className="text-white">{order.date}</span>
                          </div>
                          <div>
                            <span className="text-brand-silver block text-[10px] uppercase tracking-wider">Total</span>
                            <span className="text-white font-bold">{formatINR(order.total)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider border ${
                              isInTransit
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : isDelivered
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-brand-charcoal text-brand-silver border-white/10'
                            }`}
                          >
                            {isInTransit && <Clock className="w-3 h-3 animate-pulse" />}
                            {isDelivered && <CheckCircle2 className="w-3 h-3" />}
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      {/* Items list */}
                      <div className="p-5 divide-y divide-brand-charcoal/50">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-brand-charcoal/60 flex items-center justify-center font-mono text-xs text-brand-silver">
                                {item.size}
                              </div>
                              <div>
                                <p className="font-heading font-bold text-white">{item.name}</p>
                                <p className="text-xs text-brand-silver font-mono">
                                  Size: {item.size} • Qty: {item.qty}
                                </p>
                              </div>
                            </div>
                            <span className="font-mono text-sm font-semibold text-white">
                              {formatINR(item.price * item.qty)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom action row */}
                      <div className="px-5 py-3.5 bg-brand-charcoal/20 border-t border-brand-charcoal/40 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                        <div className="text-brand-silver">
                          AWB Airway Bill: <span className="text-white font-mono">{order.trackingNumber}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/track-order?orderId=${order.id}`}
                            className="inline-flex items-center gap-1.5 text-brand-crimson hover:underline font-bold"
                          >
                            Track Live Coordinates
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB: Saved Addresses */}
            {activeTab === 'addresses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-brand-crimson/50 bg-brand-dark/60 relative">
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-brand-crimson/20 text-brand-crimson border border-brand-crimson/30">
                      Default Shipping
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-white text-base">Aarav Kumar</h3>
                  <p className="text-xs font-mono text-brand-silver mt-1">+91 98765 43210</p>
                  <p className="text-sm text-brand-silver mt-3 leading-relaxed">
                    Flat 402, Skyline Residency, 12th Main Road<br />
                    Indiranagar Stage 2<br />
                    Bengaluru, Karnataka - 560038
                  </p>
                  <div className="mt-6 pt-4 border-t border-brand-charcoal flex items-center gap-4 text-xs font-mono">
                    <button type="button" className="text-brand-silver hover:text-white transition-colors">Edit</button>
                    <span className="text-brand-charcoal">•</span>
                    <button type="button" className="text-brand-silver hover:text-red-400 transition-colors">Delete</button>
                  </div>
                </div>

                <div className="border border-dashed border-brand-charcoal/80 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-brand-dark/20 hover:border-brand-crimson/50 transition-colors cursor-pointer">
                  <MapPin className="w-8 h-8 text-brand-silver/50 mb-3" />
                  <p className="font-heading font-bold text-sm text-white uppercase">Add New Address</p>
                  <p className="text-xs text-brand-silver mt-1">Save a secondary work or home delivery pin code</p>
                </div>
              </div>
            )}

            {/* TAB: Profile & Security */}
            {activeTab === 'profile' && (
              <div className="max-w-2xl bg-brand-dark/50 border border-brand-charcoal/80 rounded-xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-heading font-bold uppercase text-white mb-1">
                    Personal Information
                  </h3>
                  <p className="text-xs text-brand-silver">
                    Manage your identity details connected to your Fineverse orders and VIP access.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Aarav"
                      className="w-full bg-brand-charcoal/60 border border-brand-charcoal rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-crimson font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Kumar"
                      className="w-full bg-brand-charcoal/60 border border-brand-charcoal rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-crimson font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="collector@fineverse.in"
                    className="w-full bg-brand-charcoal/60 border border-brand-charcoal rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-crimson font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-1.5">
                    Phone Number (WhatsApp Delivery Updates)
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="w-full bg-brand-charcoal/60 border border-brand-charcoal rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-brand-crimson font-mono"
                  />
                </div>

                <div className="pt-4 border-t border-brand-charcoal/60 flex justify-end">
                  <Button variant="primary" size="sm">
                    Save Profile Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Authentication Screen (Sign In / Register) */
          <div className="max-w-md mx-auto my-12 bg-brand-dark/70 border border-brand-charcoal/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black font-heading uppercase tracking-tight text-white">
                {authMode === 'signin' ? 'Access Your Vault' : 'Create Fineverse Pass'}
              </h2>
              <p className="text-xs text-brand-silver mt-2">
                {authMode === 'signin'
                  ? 'Sign in to access order history, reserved drops, and VIP tracking.'
                  : 'Register for Drop 04 priority queues and exclusive creator releases.'}
              </p>
            </div>

            <form onSubmit={handleSimulateLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-brand-silver absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-brand-charcoal/60 border border-brand-charcoal rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-crimson font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-brand-silver mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-brand-silver absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-brand-charcoal/60 border border-brand-charcoal rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-brand-silver/50 focus:outline-none focus:border-brand-crimson font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-silver hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-brand-silver">
                  <input type="checkbox" defaultChecked className="rounded border-brand-charcoal text-brand-crimson focus:ring-0 bg-brand-charcoal" />
                  Remember device
                </label>
                <button type="button" className="text-brand-crimson hover:underline">
                  Forgot?
                </button>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-4 font-bold uppercase tracking-wider">
                {authMode === 'signin' ? 'Authenticate' : 'Create Account'}
              </Button>

              {/* Demo quick toggle button */}
              <button
                type="button"
                onClick={() => setIsAuthenticated(true)}
                className="w-full text-center text-xs font-mono text-brand-silver hover:text-brand-crimson py-2 border border-brand-charcoal/60 rounded-lg hover:border-brand-crimson/40 transition-colors"
              >
                ⚡ Instant Demo Login (Preview Portal)
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-brand-charcoal/60 text-center text-xs font-mono text-brand-silver">
              {authMode === 'signin' ? (
                <p>
                  Don't have a Fineverse account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className="text-brand-crimson font-bold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    className="text-brand-crimson font-bold hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
