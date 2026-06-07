import React, { useState, useEffect } from "react";
import { useSubscription } from "@/lib/SubscriptionContext";
import PremiumLock from "@/components/PremiumLock";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Save, LayoutGrid } from "lucide-react";
import CustomSections from "@/components/CustomSections";

export default function StyleGuide() {
  const { isPremium, loading } = useSubscription();
  const [docId, setDocId] = useState(null);
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState({ name: "", hex: "#000000" });
  const [primaryFont, setPrimaryFont] = useState("");
  const [secondaryFont, setSecondaryFont] = useState("");
  const [brandVoice, setBrandVoice] = useState("");
  const [logoUsage, setLogoUsage] = useState("");
  const [spacingNotes, setSpacingNotes] = useState("");
  const [customSections, setCustomSections] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.entities.StyleGuideDoc.list().then((list) => {
      if (list.length > 0) {
        const d = list[0];
        setDocId(d.id);
        setColors(d.colors || []);
        setPrimaryFont(d.primary_font || "");
        setSecondaryFont(d.secondary_font || "");
        setBrandVoice(d.brand_voice || "");
        setLogoUsage(d.logo_usage || "");
        setSpacingNotes(d.spacing_notes || "");
        setCustomSections(d.custom_sections || []);
      }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const data = { colors, primary_font: primaryFont, secondary_font: secondaryFont, brand_voice: brandVoice, logo_usage: logoUsage, spacing_notes: spacingNotes, custom_sections: customSections };
    if (docId) {
      await base44.entities.StyleGuideDoc.update(docId, data);
    } else {
      const created = await base44.entities.StyleGuideDoc.create(data);
      setDocId(created.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addColor = () => {
    if (!newColor.name.trim()) return;
    setColors([...colors, { ...newColor }]);
    setNewColor({ name: "", hex: "#000000" });
  };

  const removeColor = (i) => setColors(colors.filter((_, idx) => idx !== i));

  if (!loading && !isPremium) return <PremiumLock feature="Style Guide" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground">Style Guide</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Define your visual language and design standards.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gap-2 rounded-xl">
          <Save className="w-4 h-4" />
          {saved ? "Saved!" : saving ? "Saving…" : "Save Guide"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Colors */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader><CardTitle className="text-base font-semibold">Color Palette</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 items-end">
              <div className="space-y-1 flex-1">
                <Label className="text-xs">Name</Label>
                <Input placeholder="e.g. Primary Blue" value={newColor.name} onChange={(e) => setNewColor({ ...newColor, name: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Color</Label>
                <input type="color" value={newColor.hex} onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })} className="w-10 h-9 rounded-xl border border-border/60 cursor-pointer block" />
              </div>
              <Button size="icon" onClick={addColor} className="rounded-xl flex-shrink-0"><Plus className="w-4 h-4" /></Button>
            </div>
            {colors.length > 0 ? (
              <div className="grid grid-cols-5 gap-3">
                {colors.map((c, i) => (
                  <div key={i} className="space-y-1.5 group relative">
                    <div className="aspect-square rounded-xl border border-border/40 shadow-sm" style={{ backgroundColor: c.hex }} />
                    <p className="text-[10px] text-muted-foreground text-center truncate">{c.name}</p>
                    <button onClick={() => removeColor(i)} className="absolute top-0.5 right-0.5 bg-white/80 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-2.5 h-2.5 text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-4">Add colors above to build your palette.</p>
            )}
          </CardContent>
        </Card>

        {/* Typography */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader><CardTitle className="text-base font-semibold">Typography</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Primary Font</Label>
              <Input placeholder="e.g. Playfair Display" value={primaryFont} onChange={(e) => setPrimaryFont(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Secondary Font</Label>
              <Input placeholder="e.g. Nunito" value={secondaryFont} onChange={(e) => setSecondaryFont(e.target.value)} />
            </div>
            <Separator />
            {primaryFont && (
              <div className="space-y-1.5">
                <p className="text-2xl font-bold" style={{ fontFamily: primaryFont }}>Heading Style</p>
                <p className="text-base" style={{ fontFamily: secondaryFont || primaryFont }}>Body copy looks like this. Clear, readable, consistent.</p>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: secondaryFont || primaryFont }}>Caption / supporting text in a smaller size.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Brand Voice */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader><CardTitle className="text-base font-semibold">Brand Voice</CardTitle></CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe your brand's tone, language style, and communication principles…"
              className="resize-none min-h-36"
              value={brandVoice}
              onChange={(e) => setBrandVoice(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Logo Usage & Spacing */}
        <Card className="border border-border/60 shadow-sm">
          <CardHeader><CardTitle className="text-base font-semibold">Logo Usage & Spacing</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Logo Usage Rules</Label>
              <Textarea
                placeholder="When and how to use your logo, clearspace requirements…"
                className="resize-none min-h-20"
                value={logoUsage}
                onChange={(e) => setLogoUsage(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Spacing & Layout Notes</Label>
              <Textarea
                placeholder="Grid system, padding, margin guidelines…"
                className="resize-none min-h-20"
                value={spacingNotes}
                onChange={(e) => setSpacingNotes(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom Categories */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-1">
          <LayoutGrid className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-base font-semibold">Custom Categories</h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Add any brand guideline category that fits your needs — photography style, motion, packaging, etc.</p>
        <CustomSections
          sections={customSections}
          accentColor="blue"
          onChange={(updated) => {
            setCustomSections(updated);
          }}
        />
      </div>
    </div>
  );
}
