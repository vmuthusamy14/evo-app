import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MessageSquare, Globe } from "lucide-react";
import { useSubscription } from "@/lib/SubscriptionContext";
import PremiumLock from "@/components/PremiumLock";
import TemplatesSection from "@/components/content/TemplatesSection";
import MessagingSection from "@/components/content/MessagingSection";
import SocialSection from "@/components/content/SocialSection";

export default function Content() {
  const { isPremium, loading } = useSubscription();
  const [items, setItems] = useState([]);

  useEffect(() => {
    base44.entities.ContentItem.list("-created_date").then(setItems);
  }, []);

  const byType = (type) => items.filter((i) => i.type === type);
  const handleAdd = (item) => setItems([item, ...items]);
  const handleDelete = async (id) => {
    await base44.entities.ContentItem.delete(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };
  const handleUpdate = (updated) => setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));

  if (!loading && !isPremium) return <PremiumLock feature="Content Library" />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground">Content Library</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">Manage your brand messaging, templates, and social content.</p>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="templates" className="gap-1.5"><FileText className="w-4 h-4" /> Templates</TabsTrigger>
          <TabsTrigger value="messaging" className="gap-1.5"><MessageSquare className="w-4 h-4" /> Messaging</TabsTrigger>
          <TabsTrigger value="social" className="gap-1.5"><Globe className="w-4 h-4" /> Social</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <TemplatesSection items={byType("template")} onAdd={handleAdd} onDelete={handleDelete} onUpdate={handleUpdate} />
        </TabsContent>
        <TabsContent value="messaging">
          <MessagingSection items={byType("messaging")} onAdd={handleAdd} onDelete={handleDelete} />
        </TabsContent>
        <TabsContent value="social">
          <SocialSection items={byType("social")} onAdd={handleAdd} onDelete={handleDelete} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
