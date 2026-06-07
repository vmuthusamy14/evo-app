import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, FileText, BarChart3, CheckCircle2 } from "lucide-react";

const stats = [
  {
    label: "Brand Assets",
    value: "—",
    change: "Not started",
    icon: Palette,
    color: "bg-violet-100 text-violet-600",
  },
  {
    label: "Content Items",
    value: "—",
    change: "Not started",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Consistency Score",
    value: "—",
    change: "Not started",
    icon: BarChart3,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Tasks Complete",
    value: "—",
    change: "Not started",
    icon: CheckCircle2,
    color: "bg-amber-100 text-amber-600",
  },
];

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="border border-border/60 shadow-sm hover:shadow-md transition-shadow"
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold font-heading mt-1 text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
