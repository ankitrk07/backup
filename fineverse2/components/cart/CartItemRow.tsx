"use client";

import React from "react";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/types/cart";
import { FineverseImage } from "@/components/ui/FineverseImage";
import { formatPrice } from "@/lib/formatters";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex gap-4 py-4 border-b border-white/10 group">
      {/* Thumbnail */}
      <Link
        href={`/shop/${item.slug}`}
        className="relative w-20 h-24 bg-space-900 border border-white/10 flex-shrink-0 overflow-hidden block"
      >
        <FineverseImage slotKey={item.imageSlotKey} className="w-full h-full object-cover" />
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <Link
              href={`/shop/${item.slug}`}
              className="font-display font-bold uppercase text-sm text-zinc-100 hover:text-acid transition-colors line-clamp-1"
            >
              {item.name}
            </Link>
            <button
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${item.name}`}
              className="text-zinc-500 hover:text-cosmic-crimson transition-colors p-1 -mr-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-mono text-zinc-400">
            <span>SIZE: <strong className="text-zinc-200">{item.size}</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block border border-white/20"
                style={{ backgroundColor: item.color.hex }}
              />
              {item.color.name}
            </span>
          </div>

          {item.gsm > 0 && (
            <span className="inline-block mt-1 text-[10px] font-mono text-acid bg-acid/10 px-1.5 py-0.5 border border-acid/20">
              {item.gsm} GSM
            </span>
          )}
        </div>

        {/* Quantity Controls & Price */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-white/15 bg-space-900">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-xs font-mono font-bold text-zinc-200">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.maxStock}
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-right">
            <span className="font-mono font-bold text-sm text-zinc-100">
              {formatPrice(item.price * item.quantity)}
            </span>
            {item.quantity > 1 && (
              <span className="block text-[10px] font-mono text-zinc-500">
                {formatPrice(item.price)} each
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
