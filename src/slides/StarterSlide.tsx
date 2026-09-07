import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/* The three BBC pre-video starters. One question, alone, on white.
 * Teacher takes discussion on each, then moves on. */
const QUESTIONS: { lead: string; before: string; word: string; after: string }[] = [
  { lead: 'Big question', before: 'What do we mean by ', word: 'identity', after: '?' },
  { lead: 'Big question', before: 'How might someone show their identity when they are ', word: 'online', after: '?' },
  { lead: 'Big question', before: 'Why might someone not be their ', word: 'true self', after: ' online?' },
]

export function StarterSlide() {
  const [i, setI] = useState(0)
  const q = QUESTIONS[i]
  const last = i === QUESTIONS.length - 1

  return (
    <div className="m-auto flex min-h-full w-full flex-col px-8 py-12 md:px-20 md:py-16">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex flex-col items-center gap-8"
          >
            <p className="kicker">{q.lead}</p>
            <h2
              className="focus-in mx-auto max-w-4xl"
              style={{ color: 'var(--color-ink)', fontSize: 'clamp(2.4rem, 7vw, 5.5rem)', lineHeight: 1.08 }}
            >
              {q.before}
              <span style={{ color: 'var(--color-accent)' }}>
                {q.word}
                {q.after}
              </span>
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => setI((n) => Math.max(0, n - 1))}
          disabled={i === 0}
          className="press rounded-full px-5 py-3 text-base font-bold disabled:opacity-0"
          style={{ background: 'var(--color-surface)', color: 'var(--color-ink-soft)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
        >
          ← Back
        </button>
        <div className="flex gap-2">
          {QUESTIONS.map((_, n) => (
            <span
              key={n}
              className="h-1.5 rounded-full transition-all"
              style={{ width: n === i ? 22 : 7, background: n === i ? 'var(--color-accent)' : 'var(--color-hair-strong)' }}
            />
          ))}
        </div>
        <button
          onClick={() => setI((n) => Math.min(QUESTIONS.length - 1, n + 1))}
          disabled={last}
          className="press rounded-full px-7 py-3 text-base font-bold disabled:opacity-30"
          style={{ background: 'var(--color-accent)', color: 'var(--color-accent-ink)' }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
