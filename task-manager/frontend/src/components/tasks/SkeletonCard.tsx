function SkeletonCard() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 animate-pulse">

      <div className="h-6 bg-zinc-800 rounded w-2/3 mb-4" />

      <div className="space-y-2">
        <div className="h-4 bg-zinc-800 rounded" />
        <div className="h-4 bg-zinc-800 rounded w-5/6" />
      </div>

    </div>
  );
}

export default SkeletonCard;