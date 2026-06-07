import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, Briefcase, Target, Palette, Globe, FileText, BarChart2, ChevronDown, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const sections = [
  {
    icon: Sparkles,
    color: "text-pink-500",
    bg: "bg-pink-50",
    title: "Personal Rebranding Track",
    items: [
      { label: "Aesthetic Profile", desc: "Define your visual style, color palette, mood board, and wardrobe goals." },
      { label: "Goals", desc: "Set milestones and habits that keep you moving toward who you want to become." },
      { label: "Social Presence", desc: "Craft your bio, tagline, and social media handles across platforms." },
      { label: "Journal", desc: "Reflect on your journey with guided prompts and personal entries." },
    ],
  },
  {
    icon: Briefcase,
    color: "text-blue-500",
    bg: "bg-blue-50",
    title: "Business Rebranding Track",
    items: [
      { label: "Brand Assets", desc: "Upload and organize logos, images, and documents — all in one place." },
      { label: "Style Guide", desc: "Define your brand's colors, typography, voice, and layout rules." },
      { label: "Content Library", desc: "Manage templates, messaging, and social content across platforms." },
      { label: "Analytics", desc: "Track brand reach, engagement, and growth over time." },
    ],
  },
];

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/60 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-muted/30 transition-colors"
      >
        <span className="font-semibold text-sm">{item.label}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="px-4 py-3 text-sm text-muted-foreground border-t border-border/40">{item.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ViewGuide() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-2xl"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Platform Guide</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Everything you need to know to get started with Evo.</p>
        </div>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-2xl ${section.bg} flex items-center justify-center`}>
                <section.icon className={`w-5 h-5 ${section.color}`} />
              </div>
              <h2 className="text-lg font-bold font-heading">{section.title}</h2>
            </div>
            <div className="space-y-2">
              {section.items.map((item) => (
                <AccordionItem key={item.label} item={item} />
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-blue-50 border border-border/60 p-6 text-center">
          <BookOpen className="w-8 h-8 text-pink-400 mx-auto mb-3" />
          <h3 className="font-bold font-heading text-lg">Ready to begin?</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">Pick your rebranding track and start your transformation journey.</p>
          <Link to="/"><Button className="rounded-2xl bg-gradient-to-r from-pink-400 to-fuchsia-400 hover:from-pink-500 hover:to-fuchsia-500 border-0">Go to Dashboard</Button></Link>
        </div>
      </div>
    </div>
  );
}
