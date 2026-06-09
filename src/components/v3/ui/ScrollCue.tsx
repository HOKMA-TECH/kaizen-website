'use client'

export function ScrollCue() {
  return (
    <div className="flex flex-col items-center gap-3 text-white/50">
      <span className="text-[11px] uppercase tracking-[0.34em]">Role para explorar</span>
      <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
        <span className="h-2 w-1 animate-bounce rounded-full bg-[var(--v3-cyan)]" />
      </span>
    </div>
  )
}
