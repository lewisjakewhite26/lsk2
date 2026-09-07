import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, PRIYA } from '../components/Avatar'

const EASE = [0.16, 1, 0.3, 1] as const

function Placeholder({ label }: { label: string }) {
  return (
    <div
      className="flex h-[46vh] max-h-[440px] w-full max-w-2xl flex-col items-center justify-center gap-2 rounded-2xl"
      style={{ border: '1.5px dashed var(--color-hair-strong)', color: 'var(--color-ink-faint)' }}
    >
      <span className="text-sm font-bold uppercase tracking-wider">{label}</span>
      <span className="text-xs">image goes here</span>
    </div>
  )
}

type Beat =
  | { kind: 'question'; text: string; lead: string }
  | { kind: 'persona'; visual: React.ReactNode; prompt?: string }

const BEATS: Beat[] = [
  {
    kind: 'question',
    lead: 'Big question',
    text: 'What do we mean by identity?',
  },
  {
    kind: 'persona',
    visual: <Avatar spec={PRIYA} size={260} />,
  },
  {
    kind: 'persona',
    visual: <Avatar spec={PRIYA} size={150} />,
    prompt: 'What can we guess about this person? What do we assume?',
  },
  {
    kind: 'persona',
    visual: <Placeholder label="Priya’s Netflix screen" />,
    prompt: 'Now what do we think?',
  },
  {
    kind: 'persona',
    visual: <Placeholder label="Priya’s post about her bookshelf" />,
    prompt: 'And now — what is she like? How old is she?',
  },
  {
    kind: 'persona',
    visual: null,
    prompt:
      'We have built a whole person in our heads. We have never met her. How much do we actually know — and how much did we just assume?',
  },
]

export function StarterSlide() {
  const [i, setI] = useState(0)
  const beat = BEATS[i]
  const last = i === BEATS.length - 1
  const isFinalPrompt = last

  return (
    <div className="m-auto flex min-h-full w-full flex-col px-8 py-12 md:px-20 md:py-16">
      <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.34, ease: EASE }}
            className="flex w-full flex-col items-center gap-8"
          >
            {beat.kind === 'question' ? (
              <>
                <p className="kicker">{beat.lead}</p>
                <h2
                  className="focus-in mx-auto max-w-4xl"
                  style={{ color: 'var(--color-ink)', fontSize: 'clamp(2.6rem, 8vw, 6rem)', lineHeight: 1.05 }}
                >
                  {beat.text.split(' identity')[0]}
                  <span style={{ color: 'var(--color-accent)' }}> identity</span>?
                </h2>
              </>
            ) : (
              <>
                {beat.visual && <div className="flex items-center justify-center">{beat.visual}</div>}
                {beat.prompt && (
                  <p
                    className="mx-auto max-w-3xl font-extrabold"
                    style={{
                      color: 'var(--color-ink)',
                      fontSize: isFinalPrompt ? 'clamp(1.6rem, 4vw, 2.8rem)' : 'clamp(1.3rem, 3vw, 2rem)',
                      lineHeight: 1.25,
                    }}
                  >
                    {beat.prompt}
                  </p>
                )}
              </>
            )}
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
          {BEATS.map((_, n) => (
            <span
              key={n}
              className="h-1.5 rounded-full transition-all"
              style={{ width: n === i ? 20 : 7, background: n === i ? 'var(--color-accent)' : 'var(--color-hair-strong)' }}
            />
          ))}
        </div>
        <button
          onClick={() => setI((n) => Math.min(BEATS.length - 1, n + 1))}
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
