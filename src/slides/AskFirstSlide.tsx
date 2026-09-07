import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlideShell } from '../components/ui'
import { PERMISSION_CARDS } from '../data/scenarios'

const EASE = [0.22, 1, 0.36, 1] as const

export function AskFirstSlide() {
  const [answered, setAnswered] = useState<Record<string, boolean>>({})

  return (
    <SlideShell
      kicker="Permission"
      title="Ask before you share"
      intro="Thumbs up if it is fine to share. Thumbs down if you should ask permission first. Then tap to check."
      wide
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PERMISSION_CARDS.map((c) => {
          const shown = c.id in answered
          return (
            <button
              key={c.id}
              onClick={() => setAnswered((a) => ({ ...a, [c.id]: c.ok }))}
              className="press card p-5 text-left"
            >
              <p className="text-base font-bold md:text-lg" style={{ color: 'var(--color-ink)' }}>
                {c.situation}
              </p>
              <AnimatePresence>
                {shown ? (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="mt-3"
                  >
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-extrabold"
                      style={{
                        background: c.ok ? 'rgba(31,169,113,0.14)' : 'rgba(229,72,77,0.12)',
                        color: c.ok ? 'var(--color-safe)' : 'var(--color-warn)',
                      }}
                    >
                      {c.ok ? '👍 OK to share' : '✋ Ask first'}
                    </span>
                    <p className="mt-2 text-sm" style={{ color: 'var(--color-ink-soft)', lineHeight: 1.45 }}>
                      {c.because}
                    </p>
                  </motion.div>
                ) : (
                  <span className="mt-3 inline-block text-sm font-semibold" style={{ color: 'var(--color-ink-faint)' }}>
                    Tap to check
                  </span>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </div>

      <p className="mt-6 text-center text-base font-semibold md:text-lg" style={{ color: 'var(--color-ink)' }}>
        If someone else is in it, it is not only yours to share.
      </p>
    </SlideShell>
  )
}
