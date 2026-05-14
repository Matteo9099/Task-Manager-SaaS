import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import TaskCard from "./components/tasks/TaskCard";
import CreateTaskModal from "./components/tasks/CreateTaskModal";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import KanbanColumn from "./components/tasks/KanbanColumn";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
} from "./services/taskService";

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");


  const handleCreateTask = (title: string, description: string) => {
    toast.success("Task created!");
    createTaskMutation.mutate({
      title,
      description,
     })
  };

  const handleToggleTask = (id: number) => {
    toast.success("Task updated!");
    toggleTaskMutation.mutate(id);
  };

  const handleDeleteTask = (id: number) => {
    toast.success("Task deleted!");
    deleteTaskMutation.mutate(id);
  };

// Query tasks
  const queryClient = useQueryClient();
  const {
    data: tasks = [],
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });


  const filteredTasks = tasks.filter((task: { title: string; completed: boolean; }) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filter === "completed") {
      return task.completed;
    }

    if (filter === "pending") {
      return !task.completed;
    }

    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "oldest") {
      return a.id - b.id;
    }
    return b.id - a.id;
  });

  // COLONNA DEL TASK DIVISA
  const pendingTasks = sortedTasks.filter((task) => !task.completed);
  const completedTasks = sortedTasks.filter((task) => task.completed);


  // Mutation create
  const createTaskMutation = useMutation({
  mutationFn: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) =>
    createTask(title, description),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
  },
});

// Mutation Delete
const deleteTaskMutation = useMutation({
  mutationFn: deleteTask,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
  },
});

// Mutation Toggle
const toggleTaskMutation = useMutation({
  mutationFn: toggleTask,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });
  },
});

// Loading UI
if (isLoading) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      Loading tasks...
    </div>
  );
}

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${darkMode ? "bg-zinc-950 text-white" : "bg-zinc-100 text-black"}`}>

      <Sidebar />

      <main className="flex-1">

        <Topbar 
          onAddTask={() => setIsModalOpen(true)} 
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />

        <div className="px-8 pt-6 flex gap-3">
            <button
              onClick={() => setFilter("all")}
              className="bg-zinc-800 px-4 py-2 rounded-xl"
            >
              All
            </button>

            <button
              onClick={() => setFilter("pending")}
              className="bg-zinc-800 px-4 py-2 rounded-xl"
            >
              Pending
            </button>

            <button
              onClick={() => setFilter("completed")}
              className="bg-zinc-800 px-4 py-2 rounded-xl"
            >
              Completed
            </button>
        </div>

        <Toaster position="top-right" />

        <div className="px-8 pt-6 flex flex-col gap-4 max-w-md">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-3 outline-none focus:border-white"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>

        <section className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <KanbanColumn title="Pending">
            {pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                completed={task.completed}
                onToggle={() => handleToggleTask(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
          </KanbanColumn>

          <KanbanColumn title="Completed">

            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                completed={task.completed}
                onToggle={() => handleToggleTask(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}

          </KanbanColumn>

        </section>

        {isModalOpen && (
          <CreateTaskModal
            onClose={() => setIsModalOpen(false)}
            onCreateTask={handleCreateTask}
          />
        )}

      </main>
    </div>
  );

  

}

export default App;