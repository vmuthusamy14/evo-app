import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

const tasks = [
  { label: "Define brand colors", complete: false },
  { label: "Upload logo files", complete: false },
  { label: "Set typography", complete: false },
  { label: "Create style guide", complete: false },
  { label: "Update brand assets", complete: false },
];

export default function ProgressCard() {
  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold font-heading">Rebranding Progress</CardTitle>
          <span className="text-sm font-semibold text-muted-foreground">0%</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={0} className="h-2" />
        <div className="space-y-2.5">
          {tasks.map((task, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-border flex items-center justify-center flex-shrink-0">
                {task.complete && <Target className="w-3 h-3 text-primary" />}
              </div>
              <span className="text-sm text-muted-foreground">{task.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
