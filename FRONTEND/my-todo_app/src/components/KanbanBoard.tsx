import type { Task, TaskStatus, Column } from "../types/task";
import { KanbanColumn } from "./KanbanColumn";
import { cn } from "../lib/utils";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  className?: string;
}

const ORDER: Array<{ id: TaskStatus; title: string; color: "sorbet" | "tangerine" | "palm" | "sunshine" | "pool" }> = [
  { id: "backlog", title: "Backlog", color: "pool" },
  { id: "today", title: "Today", color: "sunshine" },
  { id: "in-progress", title: "In Progress", color: "tangerine" },
  { id: "review", title: "Review", color: "sorbet" },
  { id: "done", title: "Done", color: "palm" },
];

export const KanbanBoard = ({ tasks, onTaskClick, className }: KanbanBoardProps) => {
  const columns: Column[] = ORDER.map(({ id, title }) => ({
    id,
    title,
    tasks: tasks.filter((t) => t.status === id),
  }));

  return (
    <div className={cn("flex gap-6 overflow-x-auto pb-6 custom-scrollbar h-[calc(100vh-180px)]", className)}>
      {columns.map((column, idx) => (
        <div
          key={column.id}
          className={cn(
            "flex-shrink-0 w-72 sm:w-80 xl:w-96 rounded-2xl backdrop-blur-sm border shadow-md p-4 transition hover:shadow-glow h-full flex flex-col",
            ORDER[idx].color === "pool" && "bg-pool-soft border-pool",
            ORDER[idx].color === "sunshine" && "bg-sunshine-soft border-sunshine",
            ORDER[idx].color === "tangerine" && "bg-tangerine-soft border-tangerine",
            ORDER[idx].color === "sorbet" && "bg-sorbet-soft border-sorbet",
            ORDER[idx].color === "palm" && "bg-palm-soft border-palm",
          )}
        >
          <KanbanColumn column={column} onTaskClick={onTaskClick} brandColor={ORDER[idx].color} />
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
