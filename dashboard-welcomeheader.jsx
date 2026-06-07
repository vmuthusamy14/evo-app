import React from "react";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import PremiumBadge from "@/components/PremiumBadge";

export default function WelcomeHeader() {
  const { user } = useAuth();
  const firstName = user?.full_name?.split(" ")[0] || "there";

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-bold text-pink-400 tracking-wide uppercase font-body">Welcome back</p>
          <PremiumBadge />
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-heading text-foreground">
          Hello, {firstName}!
        </h1>
        <p className="text-muted-foreground mt-1.5 text-sm sm:text-base font-body">
          Your personal & brand transformation journey starts here.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Link to="/guide">
          <Button variant="outline" className="gap-2 rounded-2xl border-blue-200 text-blue-500 hover:bg-blue-50">
            <BookOpen className="w-4 h-4" />
            View Guide
          </Button>
        </Link>
        <Link to="/new-project">
          <Button className="gap-2 rounded-2xl bg-gradient-to-r from-pink-400 to-fuchsia-400 hover:from-pink-500 hover:to-fuchsia-500 border-0 shadow-md shadow-pink-100">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </Link>
      </div>
    </div>
  );
}
