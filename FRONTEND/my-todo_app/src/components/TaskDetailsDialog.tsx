import type { Task, EnergyLevel, TaskStatus } from "../types/task";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
 import { Label } from "../components/ui/label";


interface TaskDetailsDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}


const statusLabels = {
  backlog: "Backlog",
  today: "Today",
  "in-progress": "In Progress",
  review: "Review",
  done: "Done",
};

export const TaskDetailsDialog = ({
  task,
  open,
  onOpenChange,
  onUpdateTask,
  onDeleteTask,
}: TaskDetailsDialogProps) => {
  if (!task) return null;

  const handleStatusChange = (newStatus: TaskStatus) => {
    onUpdateTask(task.id, { status: newStatus });
  };

  const handleEnergyChange = (newEnergy: EnergyLevel) => {
    onUpdateTask(task.id, { energyLevel: newEnergy });
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] gradient-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl pr-8">{task.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {task.description && (
            <div>
              <p className="text-muted-foreground">{task.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={task.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Energy Level</Label>
              <Select value={task.energyLevel} onValueChange={handleEnergyChange}>
                <SelectTrigger className="border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🌱 Low Effort</SelectItem>
                  <SelectItem value="medium">⚡ Medium Effort</SelectItem>
                  <SelectItem value="high">🔥 High Effort</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {task.tags && task.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap pt-2">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-border/50">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
