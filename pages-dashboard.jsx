import React from "react";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import ModeSelector from "@/components/dashboard/ModeSelector";

export default function Dashboard() {
  return (
    <div>
      <WelcomeHeader />
      <ModeSelector />
    </div>
  );
}
