import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TALK_CARDS } from '../data/talk'
import { Kicker } from '../components/ui'

const EASE = [0.22, 1, 0.36, 1] as const

export function TalkSlide() {
  const [i, setI] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const card = TALK_CARDS[i]
  const last = i === TALK_CARDS.length - 1

  function go(n: number) {
    setI(n)
    setShowHint(false)
  }

  return (
    <div className="w-full flex flex-col px-8 py-12 md:px-20 md:py-16">
      <Kicker>Turn and talk · {i + 1} of {TALK_CARDS.length}</Kicker>

      <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={card.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mx-auto max-w-3xl font-extrabold"
            style={{ color: 'var(--color-ink)', fontSize: 'clamp(1.6rem, 4vw, 2.9rem)', lineHeight: 1.2 }}
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
              className="mx-auto mt-6 max-w-xl text-sm md:text-base"
              style={{ color: 'var(--color-ink-soft)', lineHeight: 1.5 }}
            >
              Ideas to draw out: {card.hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => go(Math.max(0, i - 1))}
          disabled={i === 0}
          className="press rounded-full px-5 py-3 text-sm font-bold disabled:opacity-0"
          style={{ background: 'var(--color-surface)', color: 'var(--color-ink-soft)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
        >
          ← Back
        </button>
        <button
          onClick={() => setShowHint((s) => !s)}
          className="press rounded-full px-4 py-2.5 text-sm font-bold"
          style={{ color: 'var(--color-ink-soft)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', background: 'var(--color-surface)' }}
        >
          {showHint ? 'Hide ideas' : 'Teacher ideas'}
        </button>
        <button
          onClick={() => go(Math.min(TALK_CARDS.length - 1, i + 1))}
          disabled={last}
          className="press rounded-full px-6 py-3 text-sm font-bold disabled:opacity-30"
          style={{ background: 'var(--color-accent)', color: 'var(--color-accent-ink)' }}
        >
          Next card →
        </button>
      </div>
    </div>
  )
}
