import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Target, Zap, Star, Plus, Trash2, CalendarDays } from "lucide-react";
import { format } from "date-fns";

function AddGoalForm({ type, onAdd }) {
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [open, setOpen] = useState(false);

  const handleAdd = async () => {
    if (!title.trim()) return;
    const goal = await base44.entities.Goal.create({ title, type, due_date: due || undefined, completed: false });
    onAdd(goal);
    setTitle(""); setDue(""); setOpen(false);
  };

  if (!open) return (
    <Button variant="outline" className="w-full rounded-xl border-dashed gap-2 mt-3" onClick={() => setOpen(true)}>
      <Plus className="w-4 h-4" /> Add {type === "milestone" ? "Milestone" : "Habit"}
    </Button>
  );

  return (
    <div className="mt-3 p-4 rounded-xl border border-border/60 bg-muted/20 space-y-2">
      <Input placeholder="Title…" value={title} onChange={(e) => setTitle(e.target.value)} />
      {type === "milestone" && (
        <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
      )}
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
        <Button size="sm" onClick={handleAdd} disabled={!title.trim()}>Save</Button>
      </div>
    </div>
  );
}

export default function Goals() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    base44.entities.Goal.list("-created_date").then(setGoals);
  }, []);

  const milestones = goals.filter((g) => g.type === "milestone");
  const habits = goals.filter((g) => g.type === "habit");

  const handleAdd = (goal) => setGoals([goal, ...goals]);

  const toggleComplete = async (goal) => {
    const updated = await base44.entities.Goal.update(goal.id, { completed: !goal.completed });
    setGoals(goals.map((g) => (g.id === goal.id ? updated : g)));
  };

  const handleDelete = async (id) => {
    await base44.entities.Goal.delete(id);
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Target className="w-5 h-5 text-amber-500" />
        <span className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Personal</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground mb-1">Goals</h1>
      <p className="text-muted-foreground text-sm sm:text-base mb-8">
        Set milestones, build habits, and visualise what you're working towards.
      </p>

      <Tabs defaultValue="milestones" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="milestones" className="gap-1.5"><Target className="w-4 h-4" />Milestones</TabsTrigger>
          <TabsTrigger value="habits" className="gap-1.5"><Zap className="w-4 h-4" />Habits</TabsTrigger>
          <TabsTrigger value="vision" className="gap-1.5"><Star className="w-4 h-4" />Vision Board</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones">
          <Card className="border border-border/60 shadow-sm">
            <CardHeader><CardTitle className="text-base">Personal Milestones</CardTitle></CardHeader>
            <CardContent>
              {milestones.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-6">No milestones yet. Add one below.</p>
              )}
              <div className="space-y-2">
                {milestones.map((goal) => (
                  <div key={goal.id} className={`flex items-center gap-3 p-3 rounded-xl border ${goal.completed ? "bg-muted/30 border-border/40 opacity-60" : "bg-white border-border/60"}`}>
                    <Checkbox
                      checked={goal.completed}
                      onCheckedChange={() => toggleComplete(goal)}
                      className="rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${goal.completed ? "line-through text-muted-foreground" : ""}`}>{goal.title}</p>
                      {goal.due_date && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <CalendarDays className="w-3 h-3" /> {format(new Date(goal.due_date), "dd MMM yyyy")}
                        </p>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(goal.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
              <AddGoalForm type="milestone" onAdd={handleAdd} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="habits">
          <div className="space-y-4">
            {habits.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">No habits yet. Add one below.</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {habits.map((habit) => (
                <Card key={habit.id} className="border border-border/60 shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm font-semibold">{habit.title}</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(habit.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 7 }).map((_, d) => (
                        <div key={d} className="flex-1 aspect-square rounded bg-amber-100 border border-amber-200" />
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2">Streak tracker — coming soon</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border border-border/60 shadow-sm">
              <CardContent className="pt-6">
                <AddGoalForm type="habit" onAdd={handleAdd} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vision">
          <Card className="border-2 border-dashed border-border/60">
            <CardContent className="py-16 flex flex-col items-center justify-center text-center">
              <Star className="w-10 h-10 text-muted-foreground/30 mb-3" />
              <p className="font-medium text-foreground">Create your vision board</p>
              <p className="text-sm text-muted-foreground mt-1">Visualise the life you're building towards.</p>
              <p className="text-xs text-muted-foreground mt-3 opacity-60">Coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
