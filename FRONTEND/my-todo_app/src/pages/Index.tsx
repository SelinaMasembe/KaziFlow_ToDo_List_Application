import { useState } from "react";
import type { Task, TaskStatus, EnergyLevel } from "../types/task";
// KanbanColumn is used inside KanbanBoard now
import KanbanBoard from "../components/KanbanBoard";
import { AddTaskDialog } from "../components/AddTaskDialog";
import { TaskDetailsDialog } from "../components/TaskDetailsDialog";
import { Button } from "../components/ui/button";
import { Plus, Moon } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from "../hooks/useTasks";

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try { return JSON.stringify(err); } catch { return "Unknown error"; }
}

const Index = () => {
  const { data: tasks = [], isLoading, isError, error } = useTasks();
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Columns are constructed inside KanbanBoard

  const handleAddTask = async (taskData: {
    title: string;
    description: string;
    status: TaskStatus;
    energyLevel: EnergyLevel;
  }) => {
    try {
      await createTask.mutateAsync({ ...taskData, tags: [] });
      toast({ title: "Task created!", description: "Your new task has been added to the board." });
    } catch (e: unknown) {
      toast({ title: "Failed to create task", description: getErrorMessage(e), variant: "destructive" });
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setDetailsDialogOpen(true);
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      await updateTask.mutateAsync({ id: taskId, data: updates });
      // reflect changes immediately in the open dialog
      setSelectedTask((prev) => (prev && prev.id === taskId ? { ...prev, ...updates } as Task : prev));
      toast({ title: "Task updated", description: "Changes saved successfully." });
    } catch (e: unknown) {
      toast({ title: "Failed to update", description: getErrorMessage(e), variant: "destructive" });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask.mutateAsync(taskId);
      toast({ title: "Task deleted", description: "The task has been removed from your board.", variant: "destructive" });
    } catch (e: unknown) {
      toast({ title: "Failed to delete", description: getErrorMessage(e), variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10">
        <div className="border-b border-border/50 bg-gradient-to-r from-[hsl(var(--brand-pool)/0.20)] via-[hsl(var(--brand-sunshine)/0.25)] to-[hsl(var(--brand-sorbet)/0.20)] backdrop-blur-md">
  <div className="w-full px-6 py-4 max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="KaziFlow Logo" 
                className="w-16 h-16 rounded-lg shadow-lg object-contain"
              />
              <div>
                <h1 className="type-h1 text-foreground font-bold">
                  KaziFlow
                </h1>
                <p className="type-subtle text-foreground/70">
                  Focus. Flow. Finish.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setAddDialogOpen(true)}
                className="gradient-primary rounded-xl px-4 py-2 font-medium shadow-glow hover:scale-105 transition-smooth"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
              <button
                onClick={() => document.documentElement.classList.toggle("dark")}
                className="border border-border rounded-full p-2 hover:bg-accent transition-smooth bg-card/60"
                title="Toggle theme"
                aria-label="Toggle theme"
              >
                <Moon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        </div>
      </header>

      {/* Kanban Board */}
      <main className="w-full px-6 py-8">
        {isLoading && (
          <div className="text-center text-muted-foreground">Loading tasks…</div>
        )}
        {isError && (
          <div className="text-center text-destructive">{getErrorMessage(error)}</div>
        )}
        {!isLoading && !isError && (
          <KanbanBoard tasks={tasks} onTaskClick={handleTaskClick} />
        )}
      </main>

      {/* Dialogs */}
      <AddTaskDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAddTask={handleAddTask}
      />

      <TaskDetailsDialog
        task={selectedTask}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />

      {/* Footer */}
      <footer className="border-t border-border/50 bg-gradient-to-r from-[hsl(var(--brand-pool)/0.10)] via-[hsl(var(--brand-sunshine)/0.15)] to-[hsl(var(--brand-sorbet)/0.10)] backdrop-blur-md">
        <div className="w-full px-6 py-4 max-w-[1400px] mx-auto">
          <div className="flex items-center justify-center">
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} KaziFlow</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
