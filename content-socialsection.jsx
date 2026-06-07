import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ChevronDown, ChevronUp, Globe } from "lucide-react";

// Platform SVG icons
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.54V6.78a4.85 4.85 0 0 1-1.07-.09z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const defaultPlatforms = [
  { key: "tiktok", label: "TikTok", icon: TikTokIcon, color: "text-slate-800", bg: "bg-slate-100" },
  { key: "instagram", label: "Instagram", icon: InstagramIcon, color: "text-pink-500", bg: "bg-pink-50" },
  { key: "twitter", label: "X / Twitter", icon: TwitterIcon, color: "text-slate-700", bg: "bg-slate-100" },
  { key: "youtube", label: "YouTube", icon: YouTubeIcon, color: "text-red-500", bg: "bg-red-50" },
];

function PlatformSection({ platform, items, onAdd, onDelete }) {
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const Icon = platform.icon;
  const platformItems = items.filter((i) => i.tags?.includes(platform.key));

  const handleAdd = async () => {
    if (!title.trim()) return;
    const item = await base44.entities.ContentItem.create({
      title, body, type: "social", status: "draft", tags: [platform.key],
    });
    onAdd(item);
    setTitle(""); setBody(""); setAddOpen(false);
  };

  return (
    <Card className="border border-border/60 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-xl ${platform.bg} ${platform.color} flex items-center justify-center`}>
            <Icon />
          </div>
          <span className="font-semibold text-sm">{platform.label}</span>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{platformItems.length}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && (
        <CardContent className="pt-0 pb-4 space-y-3">
          {platformItems.map((item) => (
            <div key={item.id} className="flex items-start gap-2 p-3 bg-muted/30 rounded-xl group">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{item.title}</p>
                {item.body && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.body}</p>}
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:text-destructive flex-shrink-0" onClick={() => onDelete(item.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
          {addOpen ? (
            <div className="space-y-2">
              <Input placeholder="Title…" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Textarea placeholder="Content…" value={body} onChange={(e) => setBody(e.target.value)} className="resize-none min-h-20" />
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="sm" onClick={() => setAddOpen(false)}>Cancel</Button>
                <Button size="sm" onClick={handleAdd} disabled={!title.trim()}>Save</Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" className="w-full rounded-xl border-dashed gap-2 text-xs" onClick={() => setAddOpen(true)}>
              <Plus className="w-3.5 h-3.5" /> Add content
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default function SocialSection({ items, onAdd, onDelete }) {
  const [customPlatforms, setCustomPlatforms] = useState(() => {
    try { return JSON.parse(localStorage.getItem("custom_social_platforms") || "[]"); } catch { return []; }
  });
  const [addingPlatform, setAddingPlatform] = useState(false);
  const [newPlatformName, setNewPlatformName] = useState("");

  const allPlatforms = [
    ...defaultPlatforms,
    ...customPlatforms.map((name) => ({
      key: name.toLowerCase().replace(/\s+/g, "_"),
      label: name,
      icon: () => <Globe className="w-4 h-4" />,
      color: "text-muted-foreground",
      bg: "bg-muted",
    })),
  ];

  const addPlatform = () => {
    if (!newPlatformName.trim()) return;
    const updated = [...customPlatforms, newPlatformName.trim()];
    setCustomPlatforms(updated);
    localStorage.setItem("custom_social_platforms", JSON.stringify(updated));
    setNewPlatformName(""); setAddingPlatform(false);
  };

  return (
    <div className="space-y-4">
      {allPlatforms.map((p) => (
        <PlatformSection key={p.key} platform={p} items={items} onAdd={onAdd} onDelete={onDelete} />
      ))}
      {addingPlatform ? (
        <div className="flex gap-2">
          <Input placeholder="Platform name…" value={newPlatformName} onChange={(e) => setNewPlatformName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addPlatform()} autoFocus className="rounded-xl" />
          <Button variant="ghost" size="sm" onClick={() => setAddingPlatform(false)}>Cancel</Button>
          <Button size="sm" onClick={addPlatform} disabled={!newPlatformName.trim()}>Add</Button>
        </div>
      ) : (
        <Button variant="outline" className="w-full rounded-xl border-dashed gap-2" onClick={() => setAddingPlatform(true)}>
          <Plus className="w-4 h-4" /> Add platform
        </Button>
      )}
    </div>
  );
}
