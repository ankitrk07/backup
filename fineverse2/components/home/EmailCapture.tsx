"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address (e.g. name@domain.com)"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export const EmailCapture: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    // Simulate API registration delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSuccess(true);
    reset();
  };

  return (
    <section aria-label="Drop 05 Whitelist Sign-up" className="py-24 border-b border-white/10 bg-void relative overflow-hidden">
      {/* Cosmic Aura Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-acid/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-3xl text-center space-y-6">
        <span className="font-mono text-xs text-acid tracking-widest uppercase block">
          LIMITED RUN ACCESS
        </span>

        <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
          JOIN THE DROP 05 <span className="text-acid">WHITELIST</span>
        </h2>

        <p className="text-xs sm:text-sm font-sans text-zinc-300 max-w-xl mx-auto leading-relaxed">
          Drop 04 "Sisters Revenge" will not be restocked once sold out. Enter your email for 2-hour early password access to Drop 05 before public release.
        </p>

        {/* Form Container */}
        {isSuccess ? (
          <div className="p-6 bg-space-950 border border-acid text-center max-w-md mx-auto space-y-2 surface-card shadow-acid">
            <CheckCircle2 className="w-8 h-8 text-acid mx-auto" />
            <h3 className="font-display font-bold uppercase text-base text-white">
              ACCESS PASS CONFIRMED
            </h3>
            <p className="text-xs font-mono text-zinc-300">
              Your transmission has been logged. Early access drop codes will be sent prior to the Drop 05 launch.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto space-y-2"
            noValidate
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 text-left">
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email address"
                  className="w-full h-12 bg-space-900 border border-white/15 px-4 text-sm text-zinc-100 placeholder:text-zinc-500 font-sans focus:border-acid focus:outline-none focus:ring-1 focus:ring-acid"
                />
                {errors.email && (
                  <p className="text-xs text-cosmic-crimson font-mono mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="acid"
                size="md"
                isLoading={isSubmitting}
                className="h-12 px-6 flex-shrink-0"
              >
                <span>GET ACCESS</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-zinc-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>STRICT NO-SPAM POLICY. UNSUBSCRIBE ANYTIME.</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
