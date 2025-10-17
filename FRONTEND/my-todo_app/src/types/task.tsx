export type TaskStatus = 'backlog' | 'today' | 'in-progress' | 'review' | 'done';
export type EnergyLevel = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  energyLevel: EnergyLevel;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}
