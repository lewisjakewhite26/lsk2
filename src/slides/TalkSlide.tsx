import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlideShell } from '../components/ui'
import { TALK_CARDS } from '../data/talk'

export function TalkSlide() {
  const [i, setI] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const card = TALK_CARDS[i]

  function go(n: number) {
    setI(n)
    setShowHint(false)
  }

  return (
    <SlideShell kicker={`Talk task · ${i + 1} of ${TALK_CARDS.length}`} title="Turn and talk">
      <div className="glass mx-auto max-w-3xl p-8 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={card.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-display font-extrabold"
            style={{ color: '#1b1c2a', fontSize: 'clamp(1.4rem,3.4vw,2.4rem)', lineHeight: 1.2 }}
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
              className="mx-auto mt-5 max-w-xl text-sm md:text-base"
              style={{ color: '#4a4d63', lineHeight: 1.5 }}
            >
              Ideas to draw out: {card.hint}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            onClick={() => go(Math.max(0, i - 1))}
            disabled={i === 0}
            className="rounded-full px-4 py-2 text-sm font-bold disabled:opacity-30"
            style={{ background: 'rgba(255,255,255,0.8)', color: '#4f46e5', border: '1px solid rgba(79,70,229,0.25)' }}
          >
            ← Back
          </button>
          <button
            onClick={() => setShowHint((s) => !s)}
            className="rounded-full px-4 py-2 text-sm font-bold"
            style={{ background: 'rgba(79,70,229,0.12)', color: '#4f46e5' }}
          >
            {showHint ? 'Hide ideas' : 'Teacher ideas'}
          </button>
          <button
            onClick={() => go(Math.min(TALK_CARDS.length - 1, i + 1))}
            disabled={i === TALK_CARDS.length - 1}
            className="rounded-full px-4 py-2 text-sm font-bold disabled:opacity-30"
            style={{ background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: '#fff' }}
          >
            Next card →
          </button>
        </div>
      </div>
    </SlideShell>
  )
}
