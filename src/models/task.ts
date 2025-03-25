export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export type Priority = "Low" | "Medium" | "High";
export type Status = "Pending" | "In Progress" | "Completed";
