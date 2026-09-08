import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TALK_CARDS } from '../data/talk'
import { useSubSteps } from '../deck'

const EASE = [0.22, 1, 0.36, 1] as const

export function TalkSlide() {
  const [i, setI] = useSubSteps(TALK_CARDS.length)
  const [showHint, setShowHint] = useState(false)
  const card = TALK_CARDS[i]

  useEffect(() => {
    setShowHint(false)
  }, [i])

  return (
    <div className="w-full px-8 md:px-20">
      <div className="mx-auto w-full max-w-3xl">
        <p className="kicker">Turn and talk · {i + 1} of {TALK_CARDS.length}</p>

        <div className="mt-8 min-h-[30vh]">
          <AnimatePresence mode="wait">
            <motion.p
              key={card.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="font-extrabold"
              style={{ color: 'var(--color-ink)', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', lineHeight: 1.2 }}
            >
              {card.prompt}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 max-w-xl text-base md:text-lg"
                style={{ color: 'var(--color-ink-soft)', lineHeight: 1.5 }}
              >
                Ideas to draw out: {card.hint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => setI(Math.max(0, i - 1))}
            disabled={i === 0}
            className="press rounded-full px-5 py-3 text-sm font-bold disabled:opacity-0"
            style={{ background: 'var(--color-surface)', color: 'var(--color-ink-soft)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
          >
            ← Back
          </button>
          <button
            onClick={() => setShowHint((s) => !s)}
            className="press rounded-full px-4 py-3 text-sm font-bold"
            style={{ color: 'var(--color-ink-soft)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', background: 'var(--color-surface)' }}
          >
            {showHint ? 'Hide ideas' : 'Teacher ideas'}
          </button>
          <button
            onClick={() => setI(Math.min(TALK_CARDS.length - 1, i + 1))}
            disabled={i === TALK_CARDS.length - 1}
            className="press rounded-full px-6 py-3 text-sm font-bold disabled:opacity-30"
            style={{ background: 'var(--color-accent)', color: 'var(--color-accent-ink)' }}
          >
            Next card →
          </button>
        </div>
      </div>
    </div>
  )
}
