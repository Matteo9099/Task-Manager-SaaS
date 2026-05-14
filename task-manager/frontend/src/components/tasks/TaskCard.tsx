import { motion } from "framer-motion";
import { Trash2, CheckCircle } from "lucide-react";

type TaskCardProps = {
  title: string;
  description: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

function TaskCard({
  title,
  description,
  completed,
  onToggle,
  onDelete
}: TaskCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-zinc-400 mt-2">{description}</p>
        </div>

        <span className="text-xs bg-zinc-800 px-3 py-1 rounded-full">
          {completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onToggle}
          className="flex-1 bg-zinc-800 px-4 py-2 rounded-xl hover:bg-zinc-700 transition"
        >
          {completed ? "Mark Pending" : "Mark Complete"}
        </button>

        <button
          onClick={onDelete}
          className="bg-red-500/20 text-red-400 px-4 rounded-xl hover:bg-red-500/30 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default TaskCard;