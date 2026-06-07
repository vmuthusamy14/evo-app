import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function RecentActivityCard() {
  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold font-heading">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">No activity yet</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
            Your recent brand updates and changes will appear here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
