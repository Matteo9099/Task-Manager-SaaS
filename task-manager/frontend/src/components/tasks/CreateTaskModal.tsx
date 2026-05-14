import { useState } from "react";

type CreateTaskModalProps = {
  onClose: () => void;
  onCreateTask: (title: string, description: string) => void;
};

function CreateTaskModal({
  onClose,
  onCreateTask,
}: CreateTaskModalProps) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {

    if (!title.trim()) return;

    onCreateTask(title, description);

    setTitle("");
    setDescription("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold">
            Create Task
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>

        </div>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-white"
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 h-32 outline-none focus:border-white resize-none"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Create Task
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateTaskModal;