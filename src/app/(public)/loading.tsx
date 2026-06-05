function ShimmerBlock({ className }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-sheen" />
    </div>
  )
}

export default function PublicLoading() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-deep">
      <ShimmerBlock className="h-52 bg-white/5" />
      <div className="container mx-auto px-4 max-w-7xl py-10">
        <ShimmerBlock className="h-8 w-56 bg-white/15 rounded mb-4" />
        <ShimmerBlock className="h-4 w-80 bg-white/10 rounded mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ShimmerBlock className="h-72 bg-white/10 border border-white/20 rounded-2xl" />
          <ShimmerBlock className="h-72 bg-white/10 border border-white/20 rounded-2xl" />
          <ShimmerBlock className="h-72 bg-white/10 border border-white/20 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
