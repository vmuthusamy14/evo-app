import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp, Edit2, Check } from "lucide-react";

/**
 * CustomSections
 * sections: [{ id, title, content }]
 * onChange: (updatedSections) => void  — caller is responsible for saving
 * accentColor: tailwind color name e.g. "pink" | "blue" (default "primary")
 */
export default function CustomSections({ sections = [], onChange, accentColor = "pink" }) {
  const [newTitle, setNewTitle] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [editingTitleId, setEditingTitleId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const accentClasses = {
    pink: { badge: "bg-pink-50 text-pink-600 border-pink-100", btn: "border-pink-200 text-pink-600 hover:bg-pink-50" },
    blue: { badge: "bg-blue-50 text-blue-600 border-blue-100", btn: "border-blue-200 text-blue-600 hover:bg-blue-50" },
  };
  const ac = accentClasses[accentColor] || accentClasses.pink;

  const addSection = () => {
    if (!newTitle.trim()) return;
    const newSection = { id: Date.now().toString(), title: newTitle.trim(), content: "" };
    const updated = [...sections, newSection];
    onChange(updated);
    setNewTitle("");
    setExpandedId(newSection.id);
  };

  const updateContent = (id, content) => {
    onChange(sections.map((s) => (s.id === id ? { ...s, content } : s)));
  };

  const deleteSection = (id) => {
    onChange(sections.filter((s) => s.id !== id));
  };

  const commitTitleEdit = (id) => {
    if (!editingTitle.trim()) return;
    onChange(sections.map((s) => (s.id === id ? { ...s, title: editingTitle.trim() } : s)));
    setEditingTitleId(null);
  };

  return (
    <div className="space-y-3">
      {/* Existing sections */}
      {sections.map((section) => (
        <Card key={section.id} className="border border-border/60 shadow-sm">
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <GripVertical className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
              {editingTitleId === section.id ? (
                <div className="flex gap-2 flex-1">
                  <Input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") commitTitleEdit(section.id); if (e.key === "Escape") setEditingTitleId(null); }}
                    className="h-7 text-sm"
                    autoFocus
                  />
                  <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0" onClick={() => commitTitleEdit(section.id)}>
                    <Check className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ) : (
                <CardTitle
                  className="text-sm font-semibold cursor-pointer hover:text-primary transition-colors truncate"
                  onClick={() => { setEditingTitleId(section.id); setEditingTitle(section.title); }}
                >
                  {section.title}
                </CardTitle>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              {editingTitleId !== section.id && (
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"
                  onClick={() => { setEditingTitleId(section.id); setEditingTitle(section.title); }}>
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive"
                onClick={() => deleteSection(section.id)}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground"
                onClick={() => setExpandedId(expandedId === section.id ? null : section.id)}>
                {expandedId === section.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </CardHeader>
          {expandedId === section.id && (
            <CardContent className="pt-0 px-4 pb-4">
              <Textarea
                placeholder={`Add notes, details, or content for "${section.title}"…`}
                className="resize-none min-h-28"
                value={section.content}
                onChange={(e) => updateContent(section.id, e.target.value)}
              />
            </CardContent>
          )}
        </Card>
      ))}

      {/* Add new section */}
      <div className="flex gap-2">
        <Input
          placeholder="New category name…"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSection()}
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={addSection}
          disabled={!newTitle.trim()}
          className={`gap-2 rounded-xl border ${ac.btn} flex-shrink-0`}
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>
    </div>
  );
}
