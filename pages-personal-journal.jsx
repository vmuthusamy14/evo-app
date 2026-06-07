import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, PenLine, Calendar, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";

const prompts = [
  "What does my ideal self look, feel, and act like?",
  "What old habits or identities am I leaving behind?",
  "What 3 words do I want people to use to describe me?",
  "What am I most excited to change about myself?",
  "What fear is holding me back right now?",
  "Describe one small win I had recently.",
];

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    base44.entities.JournalEntry.list("-created_date").then(setEntries);
  }, []);

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) return;
    setSaving(true);
    const entry = await base44.entities.JournalEntry.create({ title, body });
    setEntries([entry, ...entries]);
    setTitle("");
    setBody("");
    setSaving(false);
  };

  const handleDelete = async (id) => {
    await base44.entities.JournalEntry.delete(id);
    setEntries(entries.filter((e) => e.id !== id));
  };

  const applyPrompt = (prompt) => {
    setTitle(prompt.slice(0, 60));
    setBody("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <BookOpen className="w-5 h-5 text-violet-500" />
        <span className="text-sm font-semibold text-violet-600 uppercase tracking-wider">Personal</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground mb-1">Journal</h1>
      <p className="text-muted-foreground text-sm sm:text-base mb-8">
        Reflect on your transformation, capture thoughts, and track your inner growth.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* New Entry */}
          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <PenLine className="w-4 h-4 text-violet-500" /> New Entry
              </CardTitle>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {format(new Date(), "dd MMM yyyy")}
              </span>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Entry title…"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Start writing…"
                className="min-h-48 resize-none"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSave}
                  disabled={saving || !title.trim() || !body.trim()}
                  className="bg-violet-500 hover:bg-violet-600 text-white rounded-xl"
                >
                  {saving ? "Saving…" : "Save Entry"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Past Entries */}
          <Card className="border border-border/60 shadow-sm">
            <CardHeader><CardTitle className="text-base">Past Entries</CardTitle></CardHeader>
            <CardContent>
              {entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <BookOpen className="w-8 h-8 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-medium text-foreground">No entries yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Your journal entries will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {entries.map((entry) => (
                    <div key={entry.id} className="rounded-xl border border-border/60 bg-muted/20 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{entry.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {format(new Date(entry.created_date), "dd MMM yyyy")}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground"
                            onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                          >
                            {expandedId === entry.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDelete(entry.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                      {expandedId === entry.id && (
                        <p className="text-sm text-muted-foreground mt-3 whitespace-pre-wrap leading-relaxed">{entry.body}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Prompts */}
        <div>
          <Card className="border border-border/60 shadow-sm">
            <CardHeader><CardTitle className="text-base">Reflection Prompts</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {prompts.map((prompt, i) => (
                <div
                  key={i}
                  onClick={() => applyPrompt(prompt)}
                  className="p-3 rounded-xl bg-violet-50 border border-violet-100 cursor-pointer hover:bg-violet-100 transition-colors"
                >
                  <p className="text-sm text-violet-700 leading-snug">{prompt}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
