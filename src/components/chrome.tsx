import { useCallback, useEffect, useState } from 'react'

/* ---- Background: calm near-white. No texture, no frame. ---- */

export function Background() {
  return <div className="pointer-events-none fixed inset-0 -z-10" style={{ background: 'var(--color-bg)' }} />
}

/* ---- Fullscreen toggle ---- */

export function FullscreenButton() {
  const [fs, setFs] = useState(false)
  useEffect(() => {
    const on = () => setFs(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', on)
    return () => document.removeEventListener('fullscreenchange', on)
  }, [])
  const toggle = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen().catch(() => {})
  }, [])
  return (
    <button
      onClick={toggle}
      aria-label={fs ? 'Exit full screen' : 'Full screen'}
      className="press fixed right-7 top-7 z-40 flex h-9 w-9 items-center justify-center rounded-full text-base"
      style={{ color: 'var(--color-ink-soft)', background: 'var(--color-surface)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
    >
      {fs ? '✕' : '⛶'}
    </button>
  )
}

/* ---- Progress rail: thin ticks along the bottom ---- */

export function ProgressRail({
  labels,
  index,
  onJump,
}: {
  labels: string[]
  index: number
  onJump: (i: number) => void
}) {
  return (
    <div className="fixed inset-x-0 bottom-7 z-40 flex justify-center">
      <div className="flex items-center gap-2">
        {labels.map((l, i) => (
          <button
            key={i}
            onClick={() => onJump(i)}
            title={`${i + 1}. ${l}`}
            aria-label={`Go to ${l}`}
            className="h-1.5 rounded-full transition-[width,background-color] duration-300"
            style={{
              width: i === index ? 24 : 7,
              background: i === index ? 'var(--color-accent)' : 'var(--color-hair-strong)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ---- Step counter (top-left) ---- */

export function StepBadge({ n, total, label }: { n: number; total: number; label: string }) {
  return (
    <div
      className="fixed left-7 top-7 z-40 flex items-center gap-2.5 text-xs font-semibold"
      style={{ color: 'var(--color-ink-faint)' }}
    >
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>
        {n} / {total}
      </span>
      <span style={{ width: 1, height: 11, background: 'var(--color-hair-strong)' }} />
      <span style={{ color: 'var(--color-ink-soft)' }}>{label}</span>
    </div>
  )
}
