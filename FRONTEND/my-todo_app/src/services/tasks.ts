import type { Task } from "../types/task";
import { http } from "./http";

export type CreateTaskInput = Pick<Task, "title" | "description" | "status" | "energyLevel"> & { tags?: string[] };
export type UpdateTaskInput = Partial<Pick<Task, "title" | "description" | "status" | "energyLevel" | "tags" >>;

export const tasksService = {
  list: () => http.get<Task[]>("/tasks"),
  get: (id: string) => http.get<Task>(`/tasks/${id}`),
  create: (data: CreateTaskInput) => http.post<Task>("/tasks", data),
  update: (id: string, data: UpdateTaskInput) => http.patch<Task>(`/tasks/${id}` , data),
  remove: (id: string) => http.delete<void>(`/tasks/${id}`),
};
