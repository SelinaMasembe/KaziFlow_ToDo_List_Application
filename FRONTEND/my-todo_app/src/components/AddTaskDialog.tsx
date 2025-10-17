import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { EnergyLevel } from "../types/task";
import type { TaskStatus } from "../types/task";

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: {
    title: string;
    description: string;
    status: TaskStatus;
    energyLevel: EnergyLevel;
  }) => void;
}

export const AddTaskDialog = ({ open, onOpenChange, onAddTask }: AddTaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("backlog");
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>("medium");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      status,
      energyLevel,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setStatus("backlog");
    setEnergyLevel("medium");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="sm:max-w-[560px] dialog-surface rounded-2xl animate-dialog-in">
        <DialogHeader>
          <DialogTitle className="type-h2">
            Create New Task
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-border/50 focus:border-primary focus:ring-2 focus:ring-[hsl(var(--color-ring))] focus:ring-offset-1 focus:ring-offset-background focus-brand"
            />
            <p className="field-help">Tip: Start with a verb, e.g., “Design hero section”.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add more details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[110px] border-border/50 focus:border-primary focus:ring-2 focus:ring-[hsl(var(--color-ring))] focus:ring-offset-1 focus:ring-offset-background focus-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Starting Column</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as TaskStatus)}>
                <SelectTrigger className="border-border/50 focus:border-primary focus:ring-2 focus:ring-[hsl(var(--color-ring))] focus:ring-offset-1 focus:ring-offset-background focus-brand">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="select-content-brand">
                  <SelectItem value="backlog">Backlog</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Energy Level</Label>
              <Select value={energyLevel} onValueChange={(value) => setEnergyLevel(value as EnergyLevel)}>
                <SelectTrigger className="border-border/50 focus:border-primary focus:ring-2 focus:ring-[hsl(var(--color-ring))] focus:ring-offset-1 focus:ring-offset-background focus-brand">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="select-content-brand">
                  <SelectItem value="low">🌱 Low Effort</SelectItem>
                  <SelectItem value="medium">⚡ Medium Effort</SelectItem>
                  <SelectItem value="high">🔥 High Effort</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border hover:bg-muted">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title.trim()} className="gradient-primary shadow-glow hover:scale-105 transition-smooth">
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
