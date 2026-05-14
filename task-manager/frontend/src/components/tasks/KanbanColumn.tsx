import type { ReactNode } from "react";

type KanbanColumnProps = {
  title: string;
  children: ReactNode;
};

function KanbanColumn({
  title,
  children,
}: KanbanColumnProps) {

  return (
    <div className="bg-zinc-900 rounded-3xl p-5 min-h-[500px]">

      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      <div className="space-y-4">
        {children}
      </div>

    </div>
  );
}

export default KanbanColumn;