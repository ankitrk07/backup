"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FineverseImage } from "@/components/ui/FineverseImage";
import { formatPrice } from "@/lib/formatters";
import { siteConfig } from "@/config/site";
import { ShieldCheck, ArrowRight, Lock, Check, CreditCard, Banknote } from "lucide-react";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email for order updates"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  addressLine: z.string().min(5, "Please enter your complete street address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit Indian Postal PIN code"),
  paymentMethod: z.enum(["upi", "card", "cod"]),
  shippingMethod: z.enum(["standard", "express"]),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotals, clearCart } = useCartStore();
  const totals = getTotals();

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "upi",
      shippingMethod: "standard",
    },
  });

  const indianStates = [
    "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi NCR", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh",
    "West Bengal"
  ];

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    // Simulate order submission API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const orderId = `FV-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    // Clear cart after checkout
    clearCart();

    // Redirect to confirmation receipt
    router.push(`/order/confirmation?orderId=${orderId}&email=${encodeURIComponent(data.email)}`);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-md space-y-4">
        <h1 className="font-display font-black text-2xl uppercase text-white">
          NO ITEMS IN CHECKOUT
        </h1>
        <p className="text-xs font-mono text-zinc-400">
          Your cart is empty. Please select garments before visiting the checkout terminal.
        </p>
        <Button variant="acid" size="md" onClick={() => router.push("/shop")}>
          RETURN TO SHOP
        </Button>
      </div>
    );
  }

  const shippingCost =
    shippingMethod === "express" ? 149 : totals.hasFreeShipping ? 0 : siteConfig.shipping.standardShippingFee;
  const codFee = paymentMethod === "cod" ? siteConfig.shipping.codFee : 0;
  const finalTotal = totals.subtotal + shippingCost + codFee;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-8 border-b border-white/10 pb-4 flex items-center justify-between">
        <div>
          <span className="font-mono text-xs text-acid tracking-widest uppercase">
            SECURE CHECKOUT TERMINAL
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mt-1">
            DISPATCH ORDER
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
          <Lock className="w-4 h-4 text-acid" />
          <span className="hidden sm:inline">256-BIT ENCRYPTED</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Forms */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact & Address */}
            <div className="surface-card p-6 border border-white/10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="font-display font-bold uppercase text-base text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-acid text-void text-xs font-mono flex items-center justify-center font-black">
                    1
                  </span>
                  <span>SHIPPING & CONTACT DETAILS</span>
                </h2>
                <span className="text-[11px] font-mono text-zinc-500">DOMESTIC (INDIA)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="FULL NAME"
                  placeholder="e.g. Aarav Sharma"
                  {...register("fullName")}
                  error={errors.fullName?.message}
                />
                <Input
                  label="MOBILE NUMBER (FOR DISPATCH SMS)"
                  placeholder="10-digit number (e.g. 9876543210)"
                  {...register("phone")}
                  error={errors.phone?.message}
                />
              </div>

              <Input
                label="EMAIL ADDRESS (FOR ORDER RECEIPT)"
                type="email"
                placeholder="you@domain.com"
                {...register("email")}
                error={errors.email?.message}
              />

              <Input
                label="STREET ADDRESS (HOUSE / FLAT NO., STREET, LOCALITY)"
                placeholder="Flat 402, Astral Heights, 12th Main..."
                {...register("addressLine")}
                error={errors.addressLine?.message}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label="CITY"
                  placeholder="e.g. Bengaluru"
                  {...register("city")}
                  error={errors.city?.message}
                />
                <Select
                  label="STATE"
                  {...register("state")}
                  error={errors.state?.message}
                >
                  <option value="">Select State</option>
                  {indianStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </Select>
                <Input
                  label="PINCODE"
                  maxLength={6}
                  placeholder="6 digits"
                  {...register("pincode")}
                  error={errors.pincode?.message}
                />
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div className="surface-card p-6 border border-white/10 space-y-4">
              <div className="border-b border-white/10 pb-3">
                <h2 className="font-display font-bold uppercase text-base text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-acid text-void text-xs font-mono flex items-center justify-center font-black">
                    2
                  </span>
                  <span>DELIVERY SPEED</span>
                </h2>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod("standard")}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                    shippingMethod === "standard"
                      ? "border-acid bg-acid/5"
                      : "border-white/10 bg-space-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="standard"
                      checked={shippingMethod === "standard"}
                      {...register("shippingMethod")}
                      className="accent-acid"
                    />
                    <div>
                      <span className="font-display font-bold uppercase text-sm text-white block">
                        STANDARD EXPRESS LOGISTICS
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {siteConfig.shipping.metroEstimatedDays} (Metro) / {siteConfig.shipping.restOfIndiaEstimatedDays} (Rest of India)
                      </span>
                    </div>
                  </div>
                  <strong className="font-mono text-xs text-acid">
                    {totals.hasFreeShipping ? "FREE" : formatPrice(siteConfig.shipping.standardShippingFee)}
                  </strong>
                </label>

                <label
                  onClick={() => setShippingMethod("express")}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                    shippingMethod === "express"
                      ? "border-acid bg-acid/5"
                      : "border-white/10 bg-space-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      value="express"
                      checked={shippingMethod === "express"}
                      {...register("shippingMethod")}
                      className="accent-acid"
                    />
                    <div>
                      <span className="font-display font-bold uppercase text-sm text-white block">
                        PRIORITY AIR DISPATCH
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        Guaranteed 2-3 business day air transit
                      </span>
                    </div>
                  </div>
                  <strong className="font-mono text-xs text-zinc-200">
                    {formatPrice(149)}
                  </strong>
                </label>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="surface-card p-6 border border-white/10 space-y-4">
              <div className="border-b border-white/10 pb-3">
                <h2 className="font-display font-bold uppercase text-base text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-acid text-void text-xs font-mono flex items-center justify-center font-black">
                    3
                  </span>
                  <span>PAYMENT METHOD</span>
                </h2>
              </div>

              <div className="space-y-3">
                {/* UPI Option */}
                <label
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                    paymentMethod === "upi" ? "border-acid bg-acid/5" : "border-white/10 bg-space-900"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      {...register("paymentMethod")}
                      className="accent-acid mt-1"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold uppercase text-sm text-white">
                          INSTANT UPI TRANSFER
                        </span>
                        <span className="px-1.5 py-0.5 bg-acid/20 text-acid font-mono text-[9px]">
                          FASTEST
                        </span>
                      </div>
                      <p className="text-xs font-mono text-zinc-400">
                        GPay, PhonePe, Paytm, CRED UPI via Secure QR / VPA.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Cards / NetBanking */}
                <label
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                    paymentMethod === "card" ? "border-acid bg-acid/5" : "border-white/10 bg-space-900"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === "card"}
                      {...register("paymentMethod")}
                      className="accent-acid mt-1"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-purple-400" />
                        <span className="font-display font-bold uppercase text-sm text-white">
                          DEBIT / CREDIT CARD & NETBANKING
                        </span>
                      </div>
                      <p className="text-xs font-mono text-zinc-400">
                        Visa, MasterCard, RuPay & all major Indian banks.
                      </p>
                    </div>
                  </div>
                </label>

                {/* COD Option */}
                {siteConfig.shipping.codAvailable && (
                  <label
                    onClick={() => setPaymentMethod("cod")}
                    className={`flex items-start justify-between p-4 border cursor-pointer transition-all ${
                      paymentMethod === "cod" ? "border-acid bg-acid/5" : "border-white/10 bg-space-900"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        {...register("paymentMethod")}
                        className="accent-acid mt-1"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-acid" />
                          <span className="font-display font-bold uppercase text-sm text-white">
                            CASH ON DELIVERY (COD)
                          </span>
                        </div>
                        <p className="text-xs font-mono text-zinc-400">
                          {siteConfig.payment.codTerms} (+₹{siteConfig.shipping.codFee} handling).
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-zinc-400">+₹{siteConfig.shipping.codFee}</span>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="surface-card p-6 border border-white/15 space-y-6 sticky top-28">
              <h2 className="font-display font-black text-xl uppercase tracking-wider text-white border-b border-white/10 pb-4">
                ORDER BREAKDOWN
              </h2>

              {/* Items List Preview */}
              <div className="divide-y divide-white/10 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    <div className="w-12 h-14 bg-space-900 border border-white/10 flex-shrink-0 overflow-hidden">
                      <FineverseImage slotKey={item.imageSlotKey} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold uppercase text-xs text-white truncate">
                        {item.name}
                      </h4>
                      <div className="text-[10px] font-mono text-zinc-400">
                        {item.size} • {item.color.name} • Qty {item.quantity}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-xs text-zinc-200">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>SUBTOTAL</span>
                  <span className="text-zinc-100">{formatPrice(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>SHIPPING</span>
                  <span>
                    {shippingCost === 0 ? (
                      <strong className="text-acid">FREE</strong>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>
                {paymentMethod === "cod" && (
                  <div className="flex justify-between text-zinc-400">
                    <span>COD HANDLING FEE</span>
                    <span>{formatPrice(siteConfig.shipping.codFee)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-sm">
                  <span className="font-display font-black uppercase text-white tracking-wider">
                    TOTAL AMOUNT
                  </span>
                  <span className="font-mono font-bold text-xl text-acid">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Complete Order Button */}
              <Button
                type="submit"
                variant="acid"
                size="lg"
                isLoading={isSubmitting}
                className="w-full justify-between shadow-acid font-black min-h-[48px]"
              >
                <span>PLACE ORDER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              {/* Guarantee text */}
              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/5">
                <ShieldCheck className="w-4 h-4 text-acid" />
                <span>7-DAY REPLACEMENTS • VERIFIED NOCTURNAL MERCH</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
