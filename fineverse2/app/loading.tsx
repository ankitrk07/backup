import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-black text-white flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center mb-6">
        {/* Pulse ring */}
        <div className="w-14 h-14 rounded-full border-2 border-brand-crimson/30 animate-ping absolute" />
        {/* Spinning indicator */}
        <div className="w-12 h-12 rounded-full border-2 border-brand-crimson border-t-transparent animate-spin" />
      </div>
      <p className="text-xs font-mono uppercase tracking-widest text-brand-silver animate-pulse">
        Initializing Fineverse Grid...
      </p>
    </div>
  );
}
