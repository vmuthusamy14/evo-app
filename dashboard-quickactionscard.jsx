import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Paintbrush, Type, FileImage } from "lucide-react";

const actions = [
  { label: "Upload Assets", icon: Upload, description: "Add logos, images, icons" },
  { label: "Edit Colors", icon: Paintbrush, description: "Define your palette" },
  { label: "Set Fonts", icon: Type, description: "Choose typography" },
  { label: "Export Kit", icon: FileImage, description: "Download brand kit" },
];

export default function QuickActionsCard() {
  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold font-heading">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2.5">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex flex-col items-center gap-1.5 py-4 px-3 text-center hover:bg-accent/50 hover:border-primary/20 transition-all"
            >
              <action.icon className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold">{action.label}</span>
              <span className="text-[10px] text-muted-foreground leading-tight">{action.description}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
