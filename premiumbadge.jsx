import React from "react";
import { Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useSubscription } from "@/lib/SubscriptionContext";

export default function PremiumBadge() {
  const { isPremium } = useSubscription();
  if (!isPremium) return null;
  return (
    <Link to="/checkout" className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 text-white text-xs font-bold shadow-sm shadow-amber-100 hover:shadow-md transition-shadow">
      <Crown className="w-3 h-3" /> Premium
    </Link>
  );
}
