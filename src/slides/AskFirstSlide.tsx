import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlideShell } from '../components/ui'
import { PERMISSION_CARDS } from '../data/scenarios'

export function AskFirstSlide() {
  const [answered, setAnswered] = useState<Record<string, boolean>>({})

  return (
    <SlideShell
      kicker="Teach · permission"
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
              className="glass p-5 text-left transition-transform hover:-translate-y-0.5"
            >
              <p className="font-display text-base font-bold md:text-lg" style={{ color: '#1b1c2a' }}>
                {c.situation}
              </p>
              <AnimatePresence>
                {shown ? (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-extrabold"
                      style={{
                        background: c.ok ? 'rgba(16,185,129,0.15)' : 'rgba(244,63,94,0.14)',
                        color: c.ok ? '#059669' : '#e11d48',
                      }}
                    >
                      {c.ok ? '👍 OK to share' : '✋ Ask first'}
                    </span>
                    <p className="mt-2 text-sm" style={{ color: '#4a4d63', lineHeight: 1.45 }}>
                      {c.because}
                    </p>
                  </motion.div>
                ) : (
                  <span className="mt-3 inline-block text-sm font-semibold" style={{ color: '#6366f1' }}>
                    Tap to check
                  </span>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </div>

      <p className="mt-5 text-center text-base font-semibold md:text-lg" style={{ color: '#4f46e5' }}>
        If someone else is in it, it is not only yours to share.
      </p>
    </SlideShell>
  )
}
