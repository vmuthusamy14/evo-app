import React, { useState } from "react";
import { Crown, Check, ArrowLeft, Sparkles, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSubscription } from "@/lib/SubscriptionContext";

const perks = [
  "Full Business Rebranding Track",
  "Brand Assets manager",
  "Style Guide builder",
  "Advanced Content Library",
  "Analytics dashboard",
  "Priority support",
];

export default function Checkout() {
  const { isPremium, subscribe } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    await subscribe();
    setLoading(false);
    setDone(true);
  };

  if (isPremium || done) {
    return (
      <div className="max-w-md mx-auto text-center py-16">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 to-yellow-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-100">
          <Crown className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold font-heading mb-2">You're Premium!</h1>
        <p className="text-muted-foreground mb-6">All business track features are now unlocked for you.</p>
        <Link to="/brand-assets">
          <Button className="rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 border-0 text-white gap-2">
            <Sparkles className="w-4 h-4" /> Go to Business Track
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-2xl"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Upgrade to Premium</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Unlock the full Business Rebranding experience.</p>
        </div>
      </div>

      <Card className="rounded-3xl border-2 border-amber-200 shadow-xl shadow-amber-50 overflow-hidden mb-6">
        <div className="h-2 bg-gradient-to-r from-amber-300 to-yellow-400" />
        <CardContent className="p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-400 flex items-center justify-center shadow-md">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-500">Evo Premium</p>
              <h2 className="text-xl font-bold font-heading">Business Track</h2>
            </div>
          </div>

          <div className="flex items-end gap-1.5 mb-6">
            <span className="text-4xl font-bold font-heading">$12</span>
            <span className="text-muted-foreground mb-1">/ month</span>
          </div>

          <ul className="space-y-3 mb-8">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm">
                <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-amber-500" />
                </div>
                {p}
              </li>
            ))}
          </ul>

          <Button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full rounded-2xl h-12 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 border-0 text-white font-bold text-base gap-2 shadow-lg shadow-amber-100"
          >
            <Zap className="w-4 h-4" />
            {loading ? "Processing…" : "Subscribe Now"}
          </Button>

          <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground">
            <Shield className="w-3 h-3" /> Secure payment · Cancel anytime
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        By subscribing you agree to Evo's Terms of Service. Payments processed securely via Stripe.
      </p>
    </div>
  );
}
