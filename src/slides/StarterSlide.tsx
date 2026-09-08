import { motion, AnimatePresence } from 'framer-motion'
import { useSubSteps } from '../deck'

const EASE = [0.16, 1, 0.3, 1] as const

/* The three BBC pre-video starters. One question, alone, on white.
 * Teacher takes discussion on each, then moves on. */
const QUESTIONS: { before: string; word: string; after: string }[] = [
  { before: 'What do we mean by ', word: 'identity', after: '?' },
  { before: 'How might someone show their identity when they are ', word: 'online', after: '?' },
  { before: 'Why might someone not be their ', word: 'true self', after: ' online?' },
]

export function StarterSlide() {
  const [i, setI] = useSubSteps(QUESTIONS.length)
  const q = QUESTIONS[i]

  return (
    <div className="w-full px-8 md:px-20">
      <div className="mx-auto w-full max-w-4xl">
        <p className="kicker">Big question · {i + 1} of {QUESTIONS.length}</p>

        <div className="mt-8 min-h-[34vh]">
          <AnimatePresence mode="wait">
            <motion.h2
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="focus-in"
              style={{ color: 'var(--color-ink)', fontSize: 'clamp(2.2rem, 6.2vw, 5rem)', lineHeight: 1.1 }}
            >
              {q.before}
              <span style={{ color: 'var(--color-accent)' }}>
                {q.word}
                {q.after}
              </span>
            </motion.h2>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => setI(Math.max(0, i - 1))}
            disabled={i === 0}
            className="press rounded-full px-5 py-3 text-base font-bold disabled:opacity-0"
            style={{ background: 'var(--color-surface)', color: 'var(--color-ink-soft)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
          >
            ← Back
          </button>
          <button
            onClick={() => setI(Math.min(QUESTIONS.length - 1, i + 1))}
            disabled={i === QUESTIONS.length - 1}
            className="press rounded-full px-7 py-3 text-base font-bold disabled:opacity-30"
            style={{ background: 'var(--color-accent)', color: 'var(--color-accent-ink)' }}
          >
            Next question →
          </button>
        </div>
      </div>
    </div>
  )
}
