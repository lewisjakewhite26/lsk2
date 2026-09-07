import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlideShell } from '../components/ui'
import { MESSAGE, READINGS, WORDS_POINT } from '../data/scenarios'

const EASE = [0.22, 1, 0.36, 1] as const

export function WordsSlide() {
  const [reading, setReading] = useState<'kind' | 'unkind' | null>(null)

  return (
    <SlideShell
      kicker="Tone online"
      title="The reader guesses your tone"
      intro="This message has no face and no voice with it. Read it one way, then the other."
    >
      <div className="mx-auto max-w-2xl text-center">
        <div
          className="mx-auto inline-block rounded-2xl rounded-bl-md px-6 py-4 text-left"
          style={{ background: '#eef1fb', color: 'var(--color-ink)', fontSize: 'clamp(1.4rem,3vw,2.1rem)', fontWeight: 700 }}
        >
          {MESSAGE}
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {READINGS.map((r) => (
            <button
              key={r.tone}
              onClick={() => setReading(r.tone)}
              className="press rounded-full px-5 py-2.5 text-sm font-bold md:text-base"
              style={
                reading === r.tone
                  ? { background: r.tone === 'kind' ? 'var(--color-safe)' : 'var(--color-warn)', color: '#fff' }
                  : { background: 'var(--color-surface)', color: 'var(--color-ink-soft)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
              }
            >
              {r.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {reading && (
            <motion.p
              key={reading}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="mt-6 text-lg font-semibold md:text-xl"
              style={{ color: reading === 'kind' ? 'var(--color-safe)' : 'var(--color-warn)' }}
            >
              {READINGS.find((r) => r.tone === reading)!.meaning}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-base md:text-lg" style={{ color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>
        {WORDS_POINT}
      </p>
    </SlideShell>
  )
}
