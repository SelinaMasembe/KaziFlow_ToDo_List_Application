import type { Task } from "../types/task";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";

interface TaskCardProps {
  task: Task;
  onTaskClick: (task: Task) => void;
}

const energyConfig = {
  low: { color: "bg-energy-low", label: "Low Effort", icon: "🌱" },
  medium: { color: "bg-energy-medium", label: "Medium Effort", icon: "⚡" },
  high: { color: "bg-energy-high", label: "High Effort", icon: "🔥" },
};

export const TaskCard = ({ task, onTaskClick }: TaskCardProps) => {
  const energy = energyConfig[task.energyLevel];

  return (
    <Card
      className={cn(
  "relative bg-card-sunshine border-card-sunshine rounded-xl p-4 border shadow-sm",
        "note-tape animate-fade-in hover:shadow-glow hover:scale-[1.02] transition-smooth cursor-pointer",
        // slight tilt that straightens on hover for a playful feel
        "note-tilt-left",
      )}
      onClick={() => onTaskClick(task)}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="type-h3 text-on-sunshine transition-smooth line-clamp-2">
          {task.title}
        </h3>
        <span className="text-xl ml-2 flex-shrink-0">{energy.icon}</span>
      </div>

      {task.description && (
        <p className="type-body text-on-sunshine-muted mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <Badge
          variant="secondary"
          className={cn("text-xs font-medium", energy.color, "text-energy-foreground")}
        >
          {energy.label}
        </Badge>
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className="flex gap-1 mt-3 flex-wrap">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
};
