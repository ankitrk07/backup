import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black text-white flex items-center justify-center px-4 py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] bg-brand-crimson/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20" />
      
      <div className="max-w-md w-full text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-crimson/10 border border-brand-crimson/30 text-brand-crimson text-xs font-mono uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          <span>Coordinates Not Found</span>
        </div>

        <h1 className="text-7xl sm:text-8xl font-black font-heading text-white tracking-tighter">
          4<span className="text-brand-crimson">0</span>4
        </h1>

        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black font-heading uppercase text-white">
            Lost in the Fineverse
          </h2>
          <p className="text-xs sm:text-sm text-brand-silver font-sans leading-relaxed">
            The piece or collection capsule you are searching for has either been vaulted, renamed, or never existed in this dimension.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md" className="w-full sm:w-auto gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Base
          </Button>
          <Button href="/shop" variant="outline" size="md" className="w-full sm:w-auto gap-2">
            <ShoppingBag className="w-4 h-4 text-brand-crimson" />
            Browse Catalog
          </Button>
        </div>
      </div>
    </div>
  );
}
