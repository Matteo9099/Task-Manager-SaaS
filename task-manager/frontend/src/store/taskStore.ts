import { create } from "zustand";
import type { Task } from "../types/task";
import { persist } from "zustand/middleware";

type TaskStore = {
  tasks: Task[];

  addTask: (
    title: string,
    description: string
  ) => void;

  deleteTask: (id: number) => void;

  toggleTask: (id: number) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({

      tasks: [],

      addTask: (title, description) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now(),
              title,
              description,
              completed: false,
            },
          ],
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter(
            (task) => task.id !== id
          ),
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: !task.completed,
                }
              : task
          ),
        })),
    }),
    {
      name: "task-store",
    }
  )
);