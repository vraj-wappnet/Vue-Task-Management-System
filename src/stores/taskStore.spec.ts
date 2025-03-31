import { setActivePinia, createPinia } from "pinia";
import { useTaskStore } from "@/stores/taskStore";
import type { Priority, Status } from "@/models/task";
import { describe, beforeEach, it, expect } from "vitest";

describe("Task Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it("initializes with default tasks", () => {
    const store = useTaskStore();
    expect(store.tasks.length).toBeGreaterThan(0);
  });

  it("adds a new task", () => {
    const store = useTaskStore();
    const initialCount = store.tasks.length;

    store.addTask({
      title: "New Task",
      description: "Test description",
      dueDate: "01-01-2023",
      priority: "Medium" as Priority,
      status: "Pending" as Status,
    });

    expect(store.tasks.length).toBe(initialCount + 1);
    expect(store.tasks[initialCount].title).toBe("New Task");
  });

  it("updates a task", () => {
    const store = useTaskStore();
    const taskId = store.tasks[0].id;

    store.updateTask(taskId, { title: "Updated Title" });

    const updatedTask = store.tasks.find((t) => t.id === taskId);
    expect(updatedTask?.title).toBe("Updated Title");
    expect(updatedTask?.updatedAt).not.toBe(store.tasks[0].createdAt);
  });

  it("deletes a task", () => {
    const store = useTaskStore();
    const taskId = store.tasks[0].id;
    const initialCount = store.tasks.length;

    store.deleteTask(taskId);

    expect(store.tasks.length).toBe(initialCount - 1);
    expect(store.tasks.some((t) => t.id === taskId)).toBe(false);
  });

  it("filters tasks by status", () => {
    const store = useTaskStore();
    const pendingTasks = store.pendingTasks;

    expect(pendingTasks.every((t) => t.status === "Pending")).toBe(true);
  });

  it("persists tasks to localStorage", () => {
    const store = useTaskStore();
    store.addTask({
      title: "Persisted Task",
      description: "",
      dueDate: "01-01-2023",
      priority: "Low" as Priority,
      status: "Pending" as Status,
    });

    const newStore = useTaskStore();
    expect(newStore.tasks.some((t) => t.title === "Persisted Task")).toBe(true);
  });
});
