import React from "react";
import { Crown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PremiumLock({ feature = "This feature" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-yellow-400 flex items-center justify-center mb-5 shadow-lg shadow-amber-100">
        <Lock className="w-7 h-7 text-white" />
      </div>
      <h2 className="text-xl font-bold font-heading mb-2">{feature} is Premium</h2>
      <p className="text-muted-foreground text-sm max-w-xs mb-6">
        Upgrade to Evo Premium to unlock the full Business Rebranding track, including all brand tools.
      </p>
      <Link to="/checkout">
        <Button className="rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 border-0 text-white gap-2 shadow-md shadow-amber-100">
          <Crown className="w-4 h-4" /> Upgrade to Premium
        </Button>
      </Link>
    </div>
  );
}
