import React, { useState, useEffect, useRef } from "react";
import { useSubscription } from "@/lib/SubscriptionContext";
import PremiumLock from "@/components/PremiumLock";
import { base44 } from "@/api/base44Client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, FileIcon, Layers, Upload, Trash2, Search, ExternalLink } from "lucide-react";
import PinterestBoardLink from "@/components/PinterestBoardLink";

const CATEGORIES = ["logo", "image", "document"];
const CATEGORY_META = {
  logo: { label: "Logos", icon: Layers, color: "bg-violet-50 text-violet-600" },
  image: { label: "Images", icon: ImageIcon, color: "bg-blue-50 text-blue-600" },
  document: { label: "Documents", icon: FileIcon, color: "bg-amber-50 text-amber-600" },
};

export default function BrandAssets() {
  const { isPremium, loading } = useSubscription();
  const [assets, setAssets] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("image");
  const [pinterestBoards, setPinterestBoards] = useState(() => {
    try { return JSON.parse(localStorage.getItem("brand_pinterest_boards") || "[]"); } catch { return []; }
  });
  const fileInputRef = useRef();

  const savePinterestBoards = (updated) => {
    setPinterestBoards(updated);
    localStorage.setItem("brand_pinterest_boards", JSON.stringify(updated));
  };

  useEffect(() => {
    base44.entities.BrandAsset.list("-created_date").then(setAssets);
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    const asset = await base44.entities.BrandAsset.create({
      name: file.name,
      category: uploadCategory,
      file_url,
      file_type: file.type,
    });
    setAssets([asset, ...assets]);
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (id) => {
    await base44.entities.BrandAsset.delete(id);
    setAssets(assets.filter((a) => a.id !== id));
  };

  const filtered = assets.filter((a) => {
    const matchCat = filter === "all" || a.category === filter;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = assets.filter((a) => a.category === cat).length;
    return acc;
  }, {});

  if (!loading && !isPremium) return <PremiumLock feature="Brand Assets" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground">Brand Assets</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">Upload and organize all your brand assets in one place.</p>
      </div>

      {/* Category overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {CATEGORIES.map((cat) => {
          const meta = CATEGORY_META[cat];
          return (
            <Card
              key={cat}
              onClick={() => setFilter(filter === cat ? "all" : cat)}
              className={`border border-border/60 shadow-sm cursor-pointer transition-all ${filter === cat ? "ring-2 ring-primary" : "hover:shadow-md"}`}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-2xl ${meta.color} flex items-center justify-center mb-4`}>
                  <meta.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold font-heading">{meta.label}</h3>
                <span className="mt-2 text-sm font-medium text-muted-foreground">{counts[cat]} items</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pinterest */}
      <div className="mb-5">
        <PinterestBoardLink boards={pinterestBoards} onChange={savePinterestBoards} />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search assets…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex gap-2">
          <select
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value)}
            className="text-sm rounded-xl border border-border/60 px-3 bg-white"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_META[c].label}</option>)}
          </select>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="gap-2 rounded-xl"
          >
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading…" : "Upload"}
          </Button>
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload} />
        </div>
      </div>

      {/* Asset grid */}
      {filtered.length === 0 ? (
        <Card className="border-2 border-dashed border-border/60">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ImageIcon className="w-7 h-7 text-muted-foreground/50" />
            </div>
            <p className="font-medium text-foreground">No assets yet</p>
            <p className="text-sm text-muted-foreground mt-1">Upload files to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((asset) => {
            const meta = CATEGORY_META[asset.category];
            const isImage = asset.file_type?.startsWith("image/");
            return (
              <Card key={asset.id} className="border border-border/60 shadow-sm group overflow-hidden">
                <div className="aspect-square bg-muted/30 flex items-center justify-center overflow-hidden">
                  {isImage ? (
                    <img src={asset.file_url} alt={asset.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-14 h-14 rounded-2xl ${meta.color} flex items-center justify-center`}>
                      <meta.icon className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <p className="text-xs font-semibold truncate">{asset.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5">{asset.category}</Badge>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={asset.file_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon" className="h-6 w-6"><ExternalLink className="w-3 h-3" /></Button>
                      </a>
                      <Button variant="ghost" size="icon" className="h-6 w-6 hover:text-destructive" onClick={() => handleDelete(asset.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
