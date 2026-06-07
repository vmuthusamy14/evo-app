import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, ArrowUpRight } from "lucide-react";

export default function BrandOverviewCard() {
  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold font-heading">Brand Overview</CardTitle>
          <Badge variant="secondary" className="text-xs font-medium">
            Setup Required
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Color palette placeholder */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3">Color Palette</p>
          <div className="flex gap-2">
            {["bg-muted", "bg-muted", "bg-muted", "bg-muted", "bg-muted"].map((c, i) => (
              <div
                key={i}
                className={`h-10 flex-1 rounded-lg ${c} border border-border/40 border-dashed flex items-center justify-center`}
              >
                <Palette className="w-3.5 h-3.5 text-muted-foreground/40" />
              </div>
            ))}
          </div>
        </div>

        {/* Typography placeholder */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3">Typography</p>
          <div className="space-y-2">
            <div className="h-8 bg-muted rounded-lg border border-border/40 border-dashed" />
            <div className="h-6 bg-muted rounded-lg border border-border/40 border-dashed w-3/4" />
          </div>
        </div>

        {/* Logo placeholder */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3">Logo</p>
          <div className="h-24 bg-muted rounded-xl border-2 border-dashed border-border/60 flex flex-col items-center justify-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-muted-foreground/40" />
            <span className="text-xs text-muted-foreground">Upload your logo</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
