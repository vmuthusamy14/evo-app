import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Sparkles, ArrowRight, Crown, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useMode } from "@/lib/ModeContext";
import { useSubscription } from "@/lib/SubscriptionContext";

const modes = [
  {
    key: "personal",
    title: "Personal Rebranding",
    subtitle: "Redesign yourself",
    description: "Redefine your aesthetic, clarify your goals, shape your online presence, and reflect on your journey.",
    icon: Sparkles,
    gradient: "from-pink-300 via-fuchsia-200 to-purple-300",
    lightBg: "bg-pink-50",
    lightText: "text-pink-500",
    hoverBorder: "hover:border-pink-300",
    hoverShadow: "hover:shadow-pink-100",
    path: "/personal",
    tags: ["Aesthetic", "Goals", "Social Presence", "Journal"],
    tagStyle: "bg-pink-50 text-pink-500",
  },
  {
    key: "business",
    title: "Business Rebranding",
    subtitle: "Evolve your brand",
    description: "Manage brand assets, define your visual language, organise content, and track performance.",
    icon: Briefcase,
    gradient: "from-blue-200 via-sky-200 to-cyan-200",
    lightBg: "bg-blue-50",
    lightText: "text-blue-500",
    hoverBorder: "hover:border-blue-200",
    hoverShadow: "hover:shadow-blue-100",
    path: "/brand-assets",
    tags: ["Brand Assets", "Style Guide", "Content", "Analytics"],
    tagStyle: "bg-blue-50 text-blue-500",
  },
];

export default function ModeSelector() {
  const navigate = useNavigate();
  const { setActiveMode } = useMode();
  const { isPremium } = useSubscription();

  const handleSelect = (mode) => {
    if (mode.key === "business" && !isPremium) {
      navigate("/checkout");
      return;
    }
    setActiveMode(mode.key === "personal" ? "personal" : "business");
    navigate(mode.path);
  };

  return (
    <div className="mb-10">
      <div className="mb-6">
        <h2 className="text-xl font-bold font-heading text-foreground">Choose your rebranding track</h2>
        <p className="text-sm text-muted-foreground mt-0.5 font-body">
          Select a mode to get started — you can switch anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {modes.map((mode, i) => (
          <motion.button
            key={mode.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35 }}
            onClick={() => handleSelect(mode)}
            className={`group relative text-left rounded-3xl border-2 border-border bg-white p-6 transition-all duration-200 shadow-sm hover:shadow-lg ${mode.hoverBorder} ${mode.hoverShadow} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${mode.gradient} opacity-25 blur-2xl -translate-y-4 translate-x-4 pointer-events-none`} />

            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center mb-5 shadow-md`}>
              <mode.icon className="w-6 h-6 text-white drop-shadow" />
            </div>

            <p className={`text-xs font-bold uppercase tracking-wider ${mode.lightText} mb-1 font-body`}>
              {mode.subtitle}
            </p>
            <h3 className="text-xl font-bold font-heading text-foreground">{mode.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed font-body">{mode.description}</p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {mode.tags.map((tag) => (
                <span key={tag} className={`text-[11px] font-semibold px-3 py-1 rounded-full ${mode.tagStyle}`}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={`absolute top-5 right-5 transition-opacity ${mode.lightText}`}>
              {mode.key === "business" && !isPremium ? (
                <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-full text-xs font-bold">
                  <Crown className="w-3.5 h-3.5" /> Premium
                </div>
              ) : (
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100" />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
