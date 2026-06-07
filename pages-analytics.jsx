import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Eye, Users } from "lucide-react";
import { useSubscription } from "@/lib/SubscriptionContext";
import PremiumLock from "@/components/PremiumLock";

const metrics = [
  { label: "Brand Reach", icon: Eye, value: "—" },
  { label: "Engagement", icon: TrendingUp, value: "—" },
  { label: "Audience", icon: Users, value: "—" },
  { label: "Performance", icon: BarChart3, value: "—" },
];

export default function Analytics() {
  const { isPremium, loading } = useSubscription();
  if (!loading && !isPremium) return <PremiumLock feature="Analytics" />;
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground">
          Analytics
        </h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          Track how your brand is performing across all channels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m) => (
          <Card key={m.label} className="border border-border/60 shadow-sm">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-accent">
                <m.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="text-xl font-bold font-heading">{m.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Brand Consistency Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/50 rounded-xl border border-dashed border-border/60 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Chart placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Channel Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/50 rounded-xl border border-dashed border-border/60 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Chart placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
