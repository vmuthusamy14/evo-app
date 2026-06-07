import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Briefcase, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMode } from "@/lib/ModeContext";

const tracks = [
  {
    key: "personal",
    title: "Personal Rebranding",
    desc: "Redefine your aesthetic, goals, and online presence.",
    icon: Sparkles,
    gradient: "from-pink-300 via-fuchsia-200 to-purple-300",
    color: "text-pink-500",
    bg: "bg-pink-50",
    border: "border-pink-300",
    path: "/personal",
  },
  {
    key: "business",
    title: "Business Rebranding",
    desc: "Manage brand assets, style guide, content, and analytics.",
    icon: Briefcase,
    gradient: "from-blue-200 via-sky-200 to-cyan-200",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-300",
    path: "/brand-assets",
  },
];

export default function NewProject() {
  const navigate = useNavigate();
  const { setActiveMode } = useMode();
  const [step, setStep] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

  const handleStart = () => {
    if (!selectedTrack) return;
    setActiveMode(selectedTrack.key === "personal" ? "personal" : "business");
    navigate(selectedTrack.path);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-2xl"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">New Project</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Start your transformation journey.</p>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
              {step > s ? <Check className="w-3.5 h-3.5" /> : s}
            </div>
            {s < 2 && <div className={`h-0.5 w-12 rounded-full ${step > s ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-bold font-heading text-lg mb-4">Choose a track</h2>
          <div className="space-y-4 mb-8">
            {tracks.map((track) => (
              <button
                key={track.key}
                onClick={() => setSelectedTrack(track)}
                className={`w-full text-left rounded-3xl border-2 p-5 transition-all bg-white hover:shadow-md ${selectedTrack?.key === track.key ? track.border + " shadow-md" : "border-border"}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${track.gradient} flex items-center justify-center`}>
                    <track.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold font-heading">{track.title}</p>
                    <p className="text-sm text-muted-foreground">{track.desc}</p>
                  </div>
                  {selectedTrack?.key === track.key && (
                    <div className={`ml-auto w-6 h-6 rounded-full ${track.bg} ${track.color} flex items-center justify-center`}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          <Button
            onClick={() => setStep(2)}
            disabled={!selectedTrack}
            className="w-full rounded-2xl bg-gradient-to-r from-pink-400 to-fuchsia-400 hover:from-pink-500 hover:to-fuchsia-500 border-0 gap-2"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <h2 className="font-bold font-heading text-lg">Name your project</h2>
          <div className="space-y-3">
            <Input
              placeholder="Project name (e.g. 2025 Rebrand)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-2xl"
            />
            <Textarea
              placeholder="What's your main goal for this project? (optional)"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="rounded-2xl resize-none min-h-24"
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)} className="rounded-2xl flex-1">Back</Button>
            <Button
              onClick={handleStart}
              className="rounded-2xl flex-1 bg-gradient-to-r from-pink-400 to-fuchsia-400 hover:from-pink-500 hover:to-fuchsia-500 border-0"
            >
              Start Project
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
