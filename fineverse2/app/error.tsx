'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring console
    console.error('Fineverse App Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-black text-white flex items-center justify-center px-4 py-24 relative">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-brand-crimson/10 border border-brand-crimson/30 text-brand-crimson flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-crimson font-bold">
            System Anomaly Encountered
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-heading uppercase text-white">
            Something went off-grid
          </h1>
          <p className="text-xs text-brand-silver font-sans leading-relaxed">
            We encountered an unexpected rendering interrupt. Don't worry, your cart and vault selections are safely preserved.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-brand-silver/60 pt-1">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button onClick={() => reset()} variant="primary" size="md" className="w-full sm:w-auto gap-2">
            <RotateCcw className="w-4 h-4" />
            Retry Connection
          </Button>
          <Button href="/" variant="outline" size="md" className="w-full sm:w-auto gap-2">
            <Home className="w-4 h-4" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
