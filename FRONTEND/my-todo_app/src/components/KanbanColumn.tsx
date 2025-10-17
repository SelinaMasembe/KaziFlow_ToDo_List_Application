import type { Column } from "../types/task";
import { TaskCard } from "./TaskCard";
import type { Task } from "../types/task";
import { cn } from "../lib/utils";

interface KanbanColumnProps {
  column: Column;
  onTaskClick: (task: Task) => void;
  brandColor: "sorbet" | "tangerine" | "palm" | "sunshine" | "pool";
}

export const KanbanColumn = ({ column, onTaskClick, brandColor }: KanbanColumnProps) => {
  const countPillClass = cn(
    "px-2 py-1 rounded-full text-xs font-medium",
    brandColor === "pool" && "bg-pool text-primary-foreground",
    brandColor === "tangerine" && "bg-tangerine text-primary-foreground",
    brandColor === "sorbet" && "bg-sorbet text-primary-foreground",
    brandColor === "palm" && "bg-palm text-primary-foreground",
    brandColor === "sunshine" && "bg-sunshine text-primary-foreground"
  );

  return (
    <div className="w-full h-full flex flex-col animate-fade-in">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h2 className="type-h2">{column.title}</h2>
        <span className={countPillClass}>
          {column.tasks.length}
        </span>
      </div>

      <div className="space-y-3 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-1">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} onTaskClick={onTaskClick} />
        ))}

        {column.tasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-sm">No tasks yet</div>
        )}
      </div>
    </div>
  );
};
