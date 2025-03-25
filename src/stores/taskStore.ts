import { defineStore } from "pinia";
import type { Task, Priority } from "@/models/task";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";

interface TaskState {
  tasks: Task[];
}

export const useTaskStore = defineStore("task", {
  state: (): TaskState => ({
    tasks: [
      {
        id: uuidv4(),
        title: "Setup Vue Project",
        description: "Create new Vue 3 project with TypeScript",
        dueDate: "15-06-2023",
        priority: "High",
        status: "Completed",
        createdAt: "10-06-2023",
        updatedAt: "12-06-2023",
      },
      {
        id: uuidv4(),
        title: "Implement Task Form",
        description: "Create form for adding and editing tasks",
        dueDate: "20-06-2023",
        priority: "Medium",
        status: "In Progress",
        createdAt: "10-06-2023",
        updatedAt: "11-06-2023",
      },
      {
        id: uuidv4(),
        title: "Write Documentation",
        description: "Document all features and components",
        dueDate: "25-06-2023",
        priority: "Low",
        status: "Pending",
        createdAt: "10-06-2023",
        updatedAt: "10-06-2023",
      },
    ],
  }),
  actions: {
    addTask(task: Omit<Task, "id" | "createdAt" | "updatedAt">) {
      const newTask: Task = {
        ...task,
        id: uuidv4(),
        createdAt: format(new Date(), "dd-MM-yyyy"),
        updatedAt: format(new Date(), "dd-MM-yyyy"),
      };
      this.tasks.push(newTask);
    },
    updateTask(id: string, updatedTask: Partial<Omit<Task, "id" | "createdAt">>) {
      const index = this.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        this.tasks[index] = {
          ...this.tasks[index],
          ...updatedTask,
          updatedAt: format(new Date(), "dd-MM-yyyy"),
        };
      }
    },
    deleteTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    getTaskById(id: string): Task | undefined {
      return this.tasks.find((task) => task.id === id);
    },
  },
  getters: {
    allTasks: (state) => state.tasks,
    pendingTasks: (state) => state.tasks.filter((task) => task.status === "Pending"),
    inProgressTasks: (state) => state.tasks.filter((task) => task.status === "In Progress"),
    completedTasks: (state) => state.tasks.filter((task) => task.status === "Completed"),
    tasksByPriority: (state) => {
      return (priority: Priority) => state.tasks.filter((task) => task.priority === priority);
    },
  },
});
