import { produce } from "immer";
import { StateCreator } from "zustand";

export enum TaskType {
  VIDEO_GENERATION = "VIDEO_GENERATION",
}

// Task interface with an additional type property
export interface Task {
  id: string;
  payload: unknown; // Use unknown instead of any for better type safety
  timestamp: number;
  type: TaskType;
}

export interface TaskStore {
  tasks: Task[];
  addTask: (payload: unknown, type: TaskType) => void;
  deleteTask: (id: string) => void;
  clearTasks: () => void;
  clearTasksByType: (type: TaskType) => void;
  getTasksByType: (type: TaskType) => Task[]; // New method
}

// Implementation of the getTasksByType method
export const createTaskSlice: StateCreator<TaskStore, [], [], TaskStore> = (
  set,
  get
) => ({
  tasks: [],
  addTask: (payload: unknown, type: TaskType) => {
    set(
      produce((draft) => {
        const newTask: Task = {
          id: Math.random().toString(36).substr(2, 9),
          payload,
          timestamp: Date.now(),
          type,
        };
        draft.tasks.push(newTask);
      })
    );
  },
  deleteTask: (id: string) => {
    set(
      produce((draft) => {
        draft.tasks = draft.tasks.filter(
          (task: { id: string }) => task.id !== id
        );
      })
    );
  },
  clearTasks: () => {
    set(
      produce((draft) => {
        draft.tasks = [];
      })
    );
  },
  clearTasksByType: (type: TaskType) => {
    set(
      produce((draft) => {
        draft.tasks = draft.tasks.filter(
          (task: { type: TaskType }) => task.type !== type
        );
      })
    );
  },
  getTasksByType: (type: TaskType) => {
    const { tasks } = get(); // Access current tasks state
    return tasks.filter((task) => task.type === type); // Return filtered tasks by type
  },
});
