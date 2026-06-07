import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ExternalLink, MessageCircle, Link2, X, Check } from "lucide-react";

const socialPlatforms = [
  { key: "instagram", label: "Instagram", color: "text-pink-500", bg: "bg-pink-50", border: "border-pink-200", loginUrl: "https://www.instagram.com/direct/inbox/", icon: () => <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { key: "tiktok", label: "TikTok", color: "text-slate-800", bg: "bg-slate-100", border: "border-slate-200", loginUrl: "https://www.tiktok.com/messages", icon: () => <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.54V6.78a4.85 4.85 0 0 1-1.07-.09z"/></svg> },
  { key: "twitter", label: "X / Twitter", color: "text-slate-700", bg: "bg-slate-100", border: "border-slate-200", loginUrl: "https://twitter.com/messages", icon: () => <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { key: "youtube", label: "YouTube", color: "text-red-500", bg: "bg-red-50", border: "border-red-100", loginUrl: "https://www.youtube.com/feed/channels", icon: () => <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
];

export default function MessagingSection({ items, onAdd, onDelete }) {
  const [connectedPlatforms, setConnectedPlatforms] = useState(() => {
    try { return JSON.parse(localStorage.getItem("connected_messaging_platforms") || "[]"); } catch { return []; }
  });
  const [customPlatforms, setCustomPlatforms] = useState(() => {
    try { return JSON.parse(localStorage.getItem("custom_messaging_platforms") || "[]"); } catch { return []; }
  });
  const [addingCustom, setAddingCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customUrl, setCustomUrl] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");

  const toggleConnect = (key) => {
    const updated = connectedPlatforms.includes(key)
      ? connectedPlatforms.filter((k) => k !== key)
      : [...connectedPlatforms, key];
    setConnectedPlatforms(updated);
    localStorage.setItem("connected_messaging_platforms", JSON.stringify(updated));
  };

  const addCustomPlatform = () => {
    if (!customName.trim()) return;
    const entry = { name: customName.trim(), url: customUrl.trim() };
    const updated = [...customPlatforms, entry];
    setCustomPlatforms(updated);
    localStorage.setItem("custom_messaging_platforms", JSON.stringify(updated));
    setCustomName(""); setCustomUrl(""); setAddingCustom(false);
  };

  const handleAddItem = async () => {
    if (!newTitle.trim()) return;
    const item = await base44.entities.ContentItem.create({ title: newTitle, body: newBody, type: "messaging", status: "draft" });
    onAdd(item);
    setNewTitle(""); setNewBody(""); setAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Connected accounts */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">Connected Accounts</h3>
        <div className="space-y-3">
          {socialPlatforms.map((p) => {
            const Icon = p.icon;
            const connected = connectedPlatforms.includes(p.key);
            return (
              <div key={p.key} className={`flex items-center gap-3 p-3 rounded-2xl border ${p.border} bg-white`}>
                <div className={`w-8 h-8 rounded-xl ${p.bg} ${p.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon />
                </div>
                <span className="font-semibold text-sm flex-1">{p.label}</span>
                {connected ? (
                  <div className="flex items-center gap-2">
                    <a href={p.loginUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="rounded-xl gap-1.5 text-xs h-7">
                        <MessageCircle className="w-3 h-3" /> Open Messages
                      </Button>
                    </a>
                    <Button size="sm" variant="ghost" className="rounded-xl text-xs h-7 text-muted-foreground" onClick={() => toggleConnect(p.key)}>
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button size="sm" className="rounded-xl text-xs h-7 gap-1.5" onClick={() => toggleConnect(p.key)}>
                    <Link2 className="w-3 h-3" /> Connect
                  </Button>
                )}
              </div>
            );
          })}

          {/* Custom platforms */}
          {customPlatforms.map((p, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-border/60 bg-white">
              <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="font-semibold text-sm flex-1">{p.name}</span>
              {p.url && (
                <a href={p.url.startsWith("http") ? p.url : `https://${p.url}`} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="outline" className="rounded-xl gap-1.5 text-xs h-7">
                    <ExternalLink className="w-3 h-3" /> Open
                  </Button>
                </a>
              )}
            </div>
          ))}

          {addingCustom ? (
            <div className="space-y-2 p-3 rounded-2xl border border-dashed border-border bg-muted/20">
              <Input placeholder="Platform name…" value={customName} onChange={(e) => setCustomName(e.target.value)} className="text-sm" autoFocus />
              <Input placeholder="Messages URL (optional)" value={customUrl} onChange={(e) => setCustomUrl(e.target.value)} className="text-sm" />
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="sm" onClick={() => setAddingCustom(false)}>Cancel</Button>
                <Button size="sm" onClick={addCustomPlatform} disabled={!customName.trim()}>Add</Button>
              </div>
            </div>
          ) : (
            <Button variant="outline" className="w-full rounded-xl border-dashed gap-2" onClick={() => setAddingCustom(true)}>
              <Plus className="w-4 h-4" /> Add another platform
            </Button>
          )}
        </div>
      </div>

      {/* Messaging notes */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">Message Templates</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-2 p-3 bg-muted/30 rounded-xl group">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{item.title}</p>
                {item.body && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.body}</p>}
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:text-destructive" onClick={() => onDelete(item.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
          {addOpen ? (
            <Card className="border border-border/60">
              <CardContent className="p-4 space-y-3">
                <Input placeholder="Title…" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                <Textarea placeholder="Message template…" value={newBody} onChange={(e) => setNewBody(e.target.value)} className="resize-none min-h-20" />
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => setAddOpen(false)}>Cancel</Button>
                  <Button size="sm" onClick={handleAddItem} disabled={!newTitle.trim()}>Save</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Button variant="outline" className="w-full rounded-xl border-dashed gap-2" onClick={() => setAddOpen(true)}>
              <Plus className="w-4 h-4" /> Add message template
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
