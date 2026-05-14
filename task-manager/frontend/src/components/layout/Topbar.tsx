type TopbarProps = {
  onAddTask: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
};

function Topbar({ onAddTask, darkMode, onToggleTheme }: TopbarProps) {
  return (
    <header className="h-20 border-b border-zinc-800 flex items-center justify-between px-8">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
      </div>

      <button
        onClick={onToggleTheme}
        className="bg-zinc-800 px-4 py-2 rounded-xl"
      >
        {darkMode ? "Light" : "Dark"}
      </button>

      <button
        onClick={onAddTask}
        className="bg-white text-black px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition"
      >
        + New Task
      </button>

    </header>
  );
}

export default Topbar;