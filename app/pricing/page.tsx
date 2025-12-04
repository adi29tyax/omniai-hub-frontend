"use client";

import React from "react";
import { Check, Zap, Star, Crown } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useRouter } from "next/navigation";
import { createStripeCheckout, createRazorpayOrder } from "@/services/billing";

export default function PricingPage() {
    const router = useRouter();

    const handleUpgrade = async (planId: string, provider: "stripe" | "razorpay") => {
        try {
            if (provider === "stripe") {
                const { checkout_url } = await createStripeCheckout(planId);
                if (checkout_url) window.location.href = checkout_url;
            } else {
                const { order_id } = await createRazorpayOrder(planId);
                alert(`Razorpay Order Created: ${order_id} (Mock Integration)`);
                router.push("/billing/success");
            }
        } catch (error) {
            console.error("Upgrade failed", error);
            router.push("/billing/failure");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
            <SectionHeader title="Upgrade Your Studio" subtitle="Choose a plan that fits your creative needs." />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
                {/* Free Plan */}
                <GlassCard className="flex flex-col p-8 border-white/10">
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold">Free</h3>
                        <div className="text-4xl font-bold mt-2">$0<span className="text-lg text-white/40 font-normal">/mo</span></div>
                    </div>
                    <ul className="space-y-3 flex-1 mb-8 text-white/70">
                        <li className="flex gap-2"><Check size={18} className="text-green-400" /> 1 Episode / day</li>
                        <li className="flex gap-2"><Check size={18} className="text-green-400" /> 20 AI Calls / day</li>
                        <li className="flex gap-2"><Check size={18} className="text-green-400" /> 150MB Storage</li>
                        <li className="flex gap-2"><Check size={18} className="text-green-400" /> Standard Support</li>
                    </ul>
                    <button className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium cursor-not-allowed" disabled>Current Plan</button>
                </GlassCard>

                {/* Pro Plan */}
                <GlassCard className="flex flex-col p-8 border-purple-500/30 bg-purple-900/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-purple-600 text-xs px-3 py-1 rounded-bl-lg font-bold">POPULAR</div>
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold flex items-center gap-2"><Star className="text-purple-400" fill="currentColor" /> Pro</h3>
                        <div className="text-4xl font-bold mt-2">$29<span className="text-lg text-white/40 font-normal">/mo</span></div>
                    </div>
                    <ul className="space-y-3 flex-1 mb-8 text-white/80">
                        <li className="flex gap-2"><Check size={18} className="text-purple-400" /> 20 Episodes / month</li>
                        <li className="flex gap-2"><Check size={18} className="text-purple-400" /> Unlimited AI Calls</li>
                        <li className="flex gap-2"><Check size={18} className="text-purple-400" /> 2GB Storage</li>
                        <li className="flex gap-2"><Check size={18} className="text-purple-400" /> Priority Support</li>
                    </ul>
                    <div className="space-y-3">
                        <button onClick={() => handleUpgrade("pro", "stripe")} className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors font-medium">Upgrade with Stripe</button>
                        <button onClick={() => handleUpgrade("pro", "razorpay")} className="w-full py-3 rounded-lg bg-[#3399cc] hover:bg-[#2b88b6] transition-colors font-medium">Upgrade with Razorpay</button>
                    </div>
                </GlassCard>

                {/* Ultra Plan */}
                <GlassCard className="flex flex-col p-8 border-amber-500/30 bg-amber-900/10">
                    <div className="mb-4">
                        <h3 className="text-2xl font-bold flex items-center gap-2"><Crown className="text-amber-400" fill="currentColor" /> Ultra</h3>
                        <div className="text-4xl font-bold mt-2">$99<span className="text-lg text-white/40 font-normal">/mo</span></div>
                    </div>
                    <ul className="space-y-3 flex-1 mb-8 text-white/80">
                        <li className="flex gap-2"><Check size={18} className="text-amber-400" /> Unlimited Episodes</li>
                        <li className="flex gap-2"><Check size={18} className="text-amber-400" /> Unlimited AI Calls</li>
                        <li className="flex gap-2"><Check size={18} className="text-amber-400" /> Unlimited Storage</li>
                        <li className="flex gap-2"><Check size={18} className="text-amber-400" /> 24/7 Dedicated Support</li>
                    </ul>
                    <div className="space-y-3">
                        <button onClick={() => handleUpgrade("ultra", "stripe")} className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 transition-colors font-medium">Upgrade with Stripe</button>
                        <button onClick={() => handleUpgrade("ultra", "razorpay")} className="w-full py-3 rounded-lg bg-[#3399cc] hover:bg-[#2b88b6] transition-colors font-medium">Upgrade with Razorpay</button>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
