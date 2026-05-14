function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-zinc-900 border-r border-zinc-800 p-6">
      <h2 className="text-2xl font-bold mb-10">
        TaskFlow
      </h2>

      <nav className="space-y-3">
        <button className="w-full text-left px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
          Dashboard
        </button>

        <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-800 transition">
          My Tasks
        </button>

        <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-800 transition">
          Completed
        </button>

        <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-800 transition">
          Settings
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;