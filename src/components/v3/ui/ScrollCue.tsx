'use client'

export function ScrollCue() {
  return (
    <div className="flex flex-col items-center gap-2 text-white/70">
      <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
      <span className="relative flex h-9 w-[22px] items-start justify-center rounded-full border border-white/40 p-1.5">
        <span className="h-2 w-1 animate-bounce rounded-full bg-white" />
      </span>
    </div>
  )
}
