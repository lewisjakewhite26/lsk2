import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlideShell } from '../components/ui'
import { MESSAGE, READINGS, WORDS_POINT } from '../data/scenarios'

export function WordsSlide() {
  const [reading, setReading] = useState<'kind' | 'unkind' | null>(null)

  return (
    <SlideShell
      kicker="Teach · tone online"
      title="The reader guesses your tone"
      intro="This message has no face and no voice with it. Read it one way, then the other."
    >
      <div className="glass mx-auto max-w-2xl p-6 text-center">
        <div
          className="mx-auto inline-block rounded-2xl rounded-bl-md px-6 py-4 text-left"
          style={{ background: '#eef2ff', color: '#1b1c2a', fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 700 }}
        >
          {MESSAGE}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {READINGS.map((r) => (
            <button
              key={r.tone}
              onClick={() => setReading(r.tone)}
              className="rounded-full px-5 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5 md:text-base"
              style={
                reading === r.tone
                  ? {
                      background: r.tone === 'kind' ? 'linear-gradient(135deg,#34d399,#059669)' : 'linear-gradient(135deg,#fb7185,#e11d48)',
                      color: '#fff',
                    }
                  : { background: 'rgba(255,255,255,0.8)', color: '#4a4d63', border: '1px solid rgba(79,70,229,0.2)' }
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
              className="mt-5 text-lg font-semibold md:text-xl"
              style={{ color: reading === 'kind' ? '#059669' : '#e11d48' }}
            >
              {READINGS.find((r) => r.tone === reading)!.meaning}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-base md:text-lg" style={{ color: '#4a4d63', lineHeight: 1.5 }}>
        {WORDS_POINT}
      </p>
    </SlideShell>
  )
}
