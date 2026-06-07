import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, ExternalLink, Trash2, Edit2, Check, X, Link2 } from "lucide-react";

const templateCategories = [
  { key: "slideshow", label: "Slideshow" },
  { key: "infographic", label: "Infographic" },
  { key: "newspaper", label: "Newspaper" },
  { key: "poster", label: "Poster" },
  { key: "social_post", label: "Social Post" },
  { key: "newsletter", label: "Newsletter" },
];

// Built-in downloadable templates
const builtInTemplates = [
  { category: "slideshow", name: "Brand Pitch Deck", url: "https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/template/preview" },
  { category: "infographic", name: "Stats Overview", url: "https://www.canva.com/infographics/templates/" },
  { category: "newspaper", name: "Brand Newsletter", url: "https://www.canva.com/newspapers/templates/" },
  { category: "poster", name: "Event Poster", url: "https://www.canva.com/posters/templates/" },
  { category: "social_post", name: "Instagram Grid", url: "https://www.canva.com/instagram-posts/templates/" },
  { category: "newsletter", name: "Weekly Update", url: "https://www.canva.com/email-newsletters/templates/" },
];

function CanvaEmbed({ embeds, onAdd, onRemove }) {
  const [adding, setAdding] = useState(false);
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("");

  const handleAdd = () => {
    if (!url.trim()) return;
    onAdd({ id: Date.now().toString(), label: label || "Canva Design", url: url.trim() });
    setUrl(""); setLabel(""); setAdding(false);
  };

  return (
    <div className="rounded-2xl border border-border/60 p-4 space-y-3 bg-gradient-to-br from-violet-50 to-fuchsia-50">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
          <span className="text-white text-xs font-bold">C</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-violet-700">Canva Portfolios</p>
          <p className="text-[11px] text-violet-500/70">Embed your Canva designs directly</p>
        </div>
      </div>
      {embeds.map((e) => (
        <div key={e.id} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-violet-100 group">
          <Link2 className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
          <a href={e.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-sm font-medium text-violet-600 hover:underline truncate flex items-center gap-1">
            {e.label} <ExternalLink className="w-3 h-3 opacity-50 flex-shrink-0" />
          </a>
          <button onClick={() => onRemove(e.id)} className="opacity-0 group-hover:opacity-100 text-violet-400 hover:text-violet-600 transition-opacity">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      {adding ? (
        <div className="space-y-2">
          <Input placeholder="Design name (optional)" value={label} onChange={(e) => setLabel(e.target.value)} className="bg-white border-violet-200 text-sm" />
          <Input placeholder="Canva link (canva.com/design/...)" value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} className="bg-white border-violet-200 text-sm" autoFocus />
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setAdding(false)} className="text-xs">Cancel</Button>
            <Button size="sm" onClick={handleAdd} disabled={!url.trim()} className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs rounded-xl gap-1.5 border-0">
              <Link2 className="w-3 h-3" /> Embed
            </Button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} className="w-full text-xs text-violet-600/70 hover:text-violet-600 border border-dashed border-violet-200 rounded-xl py-2 transition-colors hover:bg-white">
          + Embed a Canva design
        </button>
      )}
    </div>
  );
}

export default function TemplatesSection({ items, onAdd, onDelete, onUpdate }) {
  const [canvaEmbeds, setCanvaEmbeds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("canva_embeds") || "[]"); } catch { return []; }
  });
  const [activeCategory, setActiveCategory] = useState("all");

  const saveCanva = (updated) => {
    setCanvaEmbeds(updated);
    localStorage.setItem("canva_embeds", JSON.stringify(updated));
  };

  const addCanva = (embed) => saveCanva([...canvaEmbeds, embed]);
  const removeCanva = (id) => saveCanva(canvaEmbeds.filter((e) => e.id !== id));

  const [addOpen, setAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newCategory, setNewCategory] = useState("slideshow");

  const handleAddItem = async () => {
    if (!newTitle.trim()) return;
    const item = await base44.entities.ContentItem.create({
      title: newTitle, body: newBody, type: "template", status: "draft", tags: [newCategory],
    });
    onAdd(item);
    setNewTitle(""); setNewBody(""); setAddOpen(false);
  };

  const filtered = activeCategory === "all" ? items : items.filter((i) => i.tags?.includes(activeCategory));

  return (
    <div className="space-y-6">
      {/* Canva embed */}
      <CanvaEmbed embeds={canvaEmbeds} onAdd={addCanva} onRemove={removeCanva} />

      {/* Built-in templates */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">Browse Templates</h3>
        <div className="flex gap-2 flex-wrap mb-4">
          <button onClick={() => setActiveCategory("all")} className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${activeCategory === "all" ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>All</button>
          {templateCategories.map((c) => (
            <button key={c.key} onClick={() => setActiveCategory(c.key)} className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors ${activeCategory === c.key ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {c.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {builtInTemplates.filter((t) => activeCategory === "all" || t.category === activeCategory).map((t) => {
            const cat = templateCategories.find((c) => c.key === t.category);
            return (
              <a key={t.name} href={t.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl border border-border/60 bg-white hover:shadow-md transition-all group">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground">{cat?.label}</p>
                </div>
                <Download className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </a>
            );
          })}
        </div>
      </div>

      {/* User templates */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide">My Templates</h3>
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item.id} className="flex items-start gap-2 p-3 bg-muted/30 rounded-xl group">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{item.title}</p>
                {item.body && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{item.body}</p>}
                {item.tags?.[0] && <Badge variant="secondary" className="text-[10px] mt-1">{item.tags[0]}</Badge>}
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:text-destructive" onClick={() => onDelete(item.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
          {addOpen ? (
            <Card className="border border-border/60">
              <CardContent className="p-4 space-y-3">
                <Input placeholder="Template name…" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                <Textarea placeholder="Content…" value={newBody} onChange={(e) => setNewBody(e.target.value)} className="resize-none min-h-20" />
                <div className="flex gap-2 flex-wrap">
                  {templateCategories.map((c) => (
                    <button key={c.key} onClick={() => setNewCategory(c.key)} className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${newCategory === c.key ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                      {c.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => setAddOpen(false)}>Cancel</Button>
                  <Button size="sm" onClick={handleAddItem} disabled={!newTitle.trim()}>Save</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Button variant="outline" className="w-full rounded-xl border-dashed gap-2" onClick={() => setAddOpen(true)}>
              <Plus className="w-4 h-4" /> Add template
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
