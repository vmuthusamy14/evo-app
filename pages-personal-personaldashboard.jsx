import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Palette, Target, Globe, BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/AuthContext";

const sections = [
  {
    title: "Aesthetic",
    description: "Define your personal style, wardrobe, colour palette, and visual identity.",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
    text: "text-pink-600",
    path: "/personal/aesthetic",
  },
  {
    title: "Goals",
    description: "Set personal growth milestones, habits, and create your vision board.",
    icon: Target,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-600",
    path: "/personal/goals",
  },
  {
    title: "Social Presence",
    description: "Shape your online bio, profiles, and digital image across platforms.",
    icon: Globe,
    color: "from-teal-500 to-cyan-500",
    bg: "bg-teal-50",
    text: "text-teal-600",
    path: "/personal/social",
  },
  {
    title: "Journal",
    description: "Reflect on your transformation, log thoughts, and track your progress.",
    icon: BookOpen,
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-50",
    text: "text-violet-600",
    path: "/personal/journal",
  },
];

export default function PersonalDashboard() {
  const { user } = useAuth();
  const firstName = user?.full_name?.split(" ")[0] || "there";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm font-semibold text-violet-600 uppercase tracking-wider">
          Personal Rebranding
        </span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground mb-1">
        Your Journey, {firstName}
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base mb-8">
        Explore each section of your personal rebrand below.
      </p>

      {/* Section cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {sections.map((s) => (
          <Link key={s.title} to={s.path} className="group">
            <Card className="h-full border border-border/60 shadow-sm hover:shadow-md transition-all duration-200 hover:border-violet-200">
              <CardContent className="p-6">
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow`}
                >
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold font-heading text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{s.description}</p>
                <div className={`flex items-center gap-1 mt-4 text-sm font-medium ${s.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
