import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Shirt, Palette, ImageIcon, Plus, X, Check, LayoutGrid, Save } from "lucide-react";
import CustomSections from "@/components/CustomSections";
import PinterestBoardLink from "@/components/PinterestBoardLink";

const PRESET_COLORS = [
  "#F9A8D4","#FBCFE8","#A5F3FC","#BAE6FD","#FDE68A",
  "#D9F99D","#C4B5FD","#FDBA74","#6EE7B7","#FECACA",
];

export default function Aesthetic() {
  const [profile, setProfile] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [wardrobe, setWardrobe] = useState("");
  const [colors, setColors] = useState([]);
  const [customColor, setCustomColor] = useState("#000000");
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [customSections, setCustomSections] = useState([]);
  const [pinterestBoards, setPinterestBoards] = useState([]);

  useEffect(() => {
    base44.entities.AestheticProfile.list().then((list) => {
      if (list.length > 0) {
        const p = list[0];
        setProfile(p);
        setProfileId(p.id);
        setWardrobe(p.wardrobe_goals || "");
        setColors(p.colors || []);
        setCustomSections(p.custom_sections || []);
        setPinterestBoards(p.pinterest_boards || []);
      }
    });
  }, []);

  const save = async (patch) => {
    setSaving(true);
    const data = { wardrobe_goals: wardrobe, colors, style_keywords: profile?.style_keywords || [], custom_sections: customSections, pinterest_boards: pinterestBoards, ...patch };
    if (profileId) {
      const updated = await base44.entities.AestheticProfile.update(profileId, data);
      setProfile(updated);
    } else {
      const created = await base44.entities.AestheticProfile.create(data);
      setProfile(created);
      setProfileId(created.id);
    }
    setSaving(false);
  };

  const addKeyword = async () => {
    if (!keyword.trim()) return;
    const updated = [...(profile?.style_keywords || []), keyword.trim()];
    await save({ style_keywords: updated });
    setProfile((p) => ({ ...p, style_keywords: updated }));
    setKeyword("");
  };

  const removeKeyword = async (kw) => {
    const updated = (profile?.style_keywords || []).filter((k) => k !== kw);
    await save({ style_keywords: updated });
    setProfile((p) => ({ ...p, style_keywords: updated }));
  };

  const toggleColor = async (hex) => {
    const updated = colors.includes(hex) ? colors.filter((c) => c !== hex) : [...colors, hex];
    setColors(updated);
    await save({ colors: updated });
  };

  const addCustomColor = async () => {
    if (colors.includes(customColor)) return;
    const updated = [...colors, customColor];
    setColors(updated);
    await save({ colors: updated });
  };

  const addMoodImage = async () => {
    if (!imageUrl.trim()) return;
    const updated = [...(profile?.moodboard_images || []), imageUrl.trim()];
    await save({ moodboard_images: updated });
    setProfile((p) => ({ ...p, moodboard_images: updated }));
    setImageUrl("");
  };

  const removeMoodImage = async (url) => {
    const updated = (profile?.moodboard_images || []).filter((u) => u !== url);
    await save({ moodboard_images: updated });
    setProfile((p) => ({ ...p, moodboard_images: updated }));
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Palette className="w-5 h-5 text-pink-500" />
        <span className="text-sm font-semibold text-pink-600 uppercase tracking-wider">Personal</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground mb-1">Aesthetic</h1>
      <p className="text-muted-foreground text-sm sm:text-base mb-8">
        Define your personal style and build your visual identity.
      </p>

      <Tabs defaultValue="style" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="style" className="gap-1.5"><Shirt className="w-4 h-4" />Style</TabsTrigger>
          <TabsTrigger value="palette" className="gap-1.5"><Palette className="w-4 h-4" />Colour Palette</TabsTrigger>
          <TabsTrigger value="moodboard" className="gap-1.5"><ImageIcon className="w-4 h-4" />Mood Board</TabsTrigger>
          <TabsTrigger value="custom" className="gap-1.5"><LayoutGrid className="w-4 h-4" />My Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="style">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="border border-border/60 shadow-sm">
              <CardHeader><CardTitle className="text-base">Style Keywords</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. minimalist, bold, soft…"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                  />
                  <Button size="icon" onClick={addKeyword} className="rounded-xl flex-shrink-0"><Plus className="w-4 h-4" /></Button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-12">
                  {(profile?.style_keywords || []).map((kw) => (
                    <span key={kw} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 text-pink-600 text-sm border border-pink-100">
                      {kw}
                      <button onClick={() => removeKeyword(kw)} className="hover:text-pink-800"><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border border-border/60 shadow-sm">
              <CardHeader><CardTitle className="text-base">Wardrobe Goals</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Describe your wardrobe direction…"
                  className="min-h-32 resize-none"
                  value={wardrobe}
                  onChange={(e) => setWardrobe(e.target.value)}
                />
                <Button size="sm" onClick={() => save({})} disabled={saving} className="rounded-xl">
                  {saving ? "Saving…" : "Save"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="palette">
          <Card className="border border-border/60 shadow-sm">
            <CardHeader><CardTitle className="text-base">Your Colour Palette</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-xs text-muted-foreground mb-3">Quick picks</p>
                <div className="flex flex-wrap gap-3">
                  {PRESET_COLORS.map((hex) => (
                    <button
                      key={hex}
                      onClick={() => toggleColor(hex)}
                      className="relative w-10 h-10 rounded-xl border-2 transition-all shadow-sm"
                      style={{ backgroundColor: hex, borderColor: colors.includes(hex) ? "#6d28d9" : "transparent" }}
                    >
                      {colors.includes(hex) && <Check className="w-4 h-4 absolute inset-0 m-auto text-violet-700" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="w-10 h-10 rounded-xl border border-border/60 cursor-pointer" />
                <Button size="sm" variant="outline" onClick={addCustomColor} className="rounded-xl">Add custom</Button>
              </div>
              {colors.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-3">Your palette</p>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((hex) => (
                      <button key={hex} onClick={() => toggleColor(hex)} className="relative w-12 h-12 rounded-xl border-2 border-violet-400 shadow-sm group" style={{ backgroundColor: hex }}>
                        <X className="w-4 h-4 absolute inset-0 m-auto text-white opacity-0 group-hover:opacity-100 drop-shadow" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moodboard">
          <div className="space-y-4">
          <PinterestBoardLink
            boards={pinterestBoards}
            onChange={(updated) => {
              setPinterestBoards(updated);
              save({ pinterest_boards: updated });
            }}
          />
          <Card className="border border-border/60 shadow-sm">
            <CardHeader><CardTitle className="text-base">Mood Board</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Paste an image URL…"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addMoodImage()}
                />
                <Button size="icon" onClick={addMoodImage} className="rounded-xl flex-shrink-0"><Plus className="w-4 h-4" /></Button>
              </div>
              {(profile?.moodboard_images || []).length === 0 ? (
                <div className="py-12 border-2 border-dashed border-border/60 rounded-xl flex flex-col items-center justify-center text-center">
                  <ImageIcon className="w-8 h-8 text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">Paste image URLs above to build your mood board.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(profile?.moodboard_images || []).map((url, i) => (
                    <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-border/60">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeMoodImage(url)}
                        className="absolute top-1.5 right-1.5 bg-black/60 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm">Custom Categories</p>
                <p className="text-xs text-muted-foreground mt-0.5">Add any aesthetic category that matters to you — fragrance, hair, skincare, etc.</p>
              </div>
              {customSections.length > 0 && (
                <Button size="sm" onClick={() => save({ custom_sections: customSections })} disabled={saving} className="rounded-xl gap-2">
                  <Save className="w-3.5 h-3.5" />
                  {saving ? "Saving…" : "Save"}
                </Button>
              )}
            </div>
            <CustomSections
              sections={customSections}
              accentColor="pink"
              onChange={(updated) => {
                setCustomSections(updated);
                save({ custom_sections: updated });
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
