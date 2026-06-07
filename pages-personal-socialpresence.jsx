import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Globe, User, AtSign, Link2, Save } from "lucide-react";

const platforms = [
  { key: "instagram", name: "Instagram", icon: AtSign, color: "bg-pink-50 text-pink-600" },
  { key: "linkedin", name: "LinkedIn", icon: Link2, color: "bg-blue-50 text-blue-600" },
  { key: "twitter", name: "X / Twitter", icon: AtSign, color: "bg-slate-100 text-slate-600" },
  { key: "website", name: "Personal Site", icon: Globe, color: "bg-teal-50 text-teal-600" },
];

export default function SocialPresence() {
  const [profileId, setProfileId] = useState(null);
  const [form, setForm] = useState({ name: "", tagline: "", bio: "", instagram: "", linkedin: "", twitter: "", website: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.entities.SocialProfile.list().then((list) => {
      if (list.length > 0) {
        const p = list[0];
        setProfileId(p.id);
        setForm({
          name: p.name || "",
          tagline: p.tagline || "",
          bio: p.bio || "",
          instagram: p.instagram || "",
          linkedin: p.linkedin || "",
          twitter: p.twitter || "",
          website: p.website || "",
        });
      }
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    if (profileId) {
      await base44.entities.SocialProfile.update(profileId, form);
    } else {
      const created = await base44.entities.SocialProfile.create(form);
      setProfileId(created.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Globe className="w-5 h-5 text-teal-500" />
        <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">Personal</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground mb-1">Social Presence</h1>
      <p className="text-muted-foreground text-sm sm:text-base mb-8">
        Craft your digital identity and align your profiles with your new self.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Bio Builder */}
          <Card className="border border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Bio Builder</CardTitle>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={saving}
                className="gap-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white"
              >
                <Save className="w-3.5 h-3.5" />
                {saved ? "Saved!" : saving ? "Saving…" : "Save"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Display Name</Label>
                  <Input placeholder="Your name" value={form.name} onChange={(e) => set("name", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Tagline</Label>
                  <Input placeholder="One-line summary" value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Bio</Label>
                <Textarea
                  placeholder="Write a short bio that represents your new identity…"
                  className="min-h-32 resize-none"
                  value={form.bio}
                  onChange={(e) => set("bio", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Profile Photo & Banner */}
          <Card className="border border-border/60 shadow-sm">
            <CardHeader><CardTitle className="text-base">Profile Photo & Banner</CardTitle></CardHeader>
            <CardContent className="flex gap-4">
              <div className="w-24 h-24 rounded-full bg-muted border-2 border-dashed border-border/60 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {form.profile_photo_url ? (
                  <img src={form.profile_photo_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-muted-foreground/40" />
                )}
              </div>
              <div className="flex-1 rounded-xl bg-muted border-2 border-dashed border-border/60 flex flex-col items-center justify-center p-4 text-center">
                <p className="text-sm text-muted-foreground">Upload banner</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Image upload coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platforms */}
        <div>
          <Card className="border border-border/60 shadow-sm">
            <CardHeader><CardTitle className="text-base">Platform Handles</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {platforms.map((p) => (
                <div key={p.key} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg ${p.color} flex items-center justify-center flex-shrink-0`}>
                      <p.icon className="w-3.5 h-3.5" />
                    </div>
                    <Label className="text-xs">{p.name}</Label>
                  </div>
                  <Input
                    placeholder={p.key === "website" ? "https://yoursite.com" : "@handle"}
                    value={form[p.key]}
                    onChange={(e) => set(p.key, e.target.value)}
                    className="text-sm"
                  />
                </div>
              ))}
              <Button size="sm" onClick={handleSave} disabled={saving} className="w-full rounded-xl mt-2">
                {saved ? "Saved!" : "Save Handles"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
