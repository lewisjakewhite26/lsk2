import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Kicker } from '../components/ui'
import { useSubSteps } from '../deck'
import { TONE_EXAMPLES, WORDS_POINT } from '../data/scenarios'

const EASE = [0.22, 1, 0.36, 1] as const

function TypingDots() {
  return (
    <div className="imsg-in inline-flex items-center gap-1.5 py-3">
      {[0, 1, 2].map((n) => (
        <motion.span
          key={n}
          className="block h-2 w-2 rounded-full"
          style={{ background: '#9a9aa2' }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: n * 0.2 }}
        />
      ))}
    </div>
  )
}

function Phone({ revealed, text, onTap }: { revealed: boolean; text: string; onTap: () => void }) {
  return (
    <button
      onClick={onTap}
      aria-label="Show the message"
      className="imsg block w-[340px] max-w-full overflow-hidden rounded-[38px] text-left"
      style={{ background: '#fff', border: '1px solid var(--color-hair)', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}
    >
      {/* header */}
      <div className="flex flex-col items-center gap-1.5 px-4 pb-3 pt-4" style={{ background: '#f6f6f6', borderBottom: '1px solid #e5e5e5' }}>
        <div className="flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold text-white" style={{ background: '#c7c7cc' }}>
          S
        </div>
        <span className="text-xs font-semibold" style={{ color: '#000' }}>
          Sam
        </span>
      </div>

      {/* thread */}
      <div className="min-h-[180px] px-4 py-5" style={{ background: '#fff' }}>
        <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-wide" style={{ color: '#8e8e93' }}>
          Today 9:41
        </p>
        <div className="flex">
          <AnimatePresence mode="wait">
            {revealed ? (
              <motion.div
                key="msg"
                initial={{ scale: 0.4, opacity: 0, originX: 0, originY: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 520, damping: 30 }}
                className="imsg-in max-w-[75%] text-[17px] leading-snug"
              >
                {text}
              </motion.div>
            ) : (
              <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <TypingDots />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </button>
  )
}

export function WordsSlide() {
  const [ei, setEi] = useSubSteps(TONE_EXAMPLES.length)
  const [revealed, setRevealed] = useState(false)
  const [pick, setPick] = useState<number | null>(null)

  const ex = TONE_EXAMPLES[ei]
  const last = ei === TONE_EXAMPLES.length - 1
  const done = last && pick !== null

  useEffect(() => {
    setRevealed(false)
    setPick(null)
  }, [ei])

  function goto(n: number) {
    setEi(n)
  }

  return (
    <div className="w-full flex flex-col px-8 py-12 md:px-20 md:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <Kicker>Tone online · {ei + 1} of {TONE_EXAMPLES.length}</Kicker>
        <h2 className="mt-4" style={{ color: 'var(--color-ink)', fontSize: 'clamp(1.9rem, 4.4vw, 3rem)', lineHeight: 1.12 }}>
          The reader guesses your tone
        </h2>
        <p className="mt-3 text-base md:text-lg" style={{ color: 'var(--color-ink-soft)' }}>
          Sam sent you this. There is no face and no voice. How did they mean it?
        </p>
      </div>

      <div className="mx-auto mt-9 flex w-full max-w-3xl flex-col items-center gap-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="flex flex-col items-center gap-6"
          >
            <Phone revealed={revealed} text={ex.text} onTap={() => setRevealed(true)} />

            {!revealed ? (
              <p className="text-base font-semibold md:text-lg" style={{ color: 'var(--color-ink-soft)' }}>
                Tap the phone to see the message
              </p>
            ) : (
              <div className="flex flex-wrap justify-center gap-3">
                {ex.readings.map((r, idx) => {
                  const active = pick === idx
                  return (
                    <button
                      key={idx}
                      onClick={() => setPick(idx)}
                      className="press rounded-full px-5 py-2.5 text-sm font-bold md:text-base"
                      style={
                        active
                          ? { background: r.tone === 'warm' ? 'var(--color-safe)' : 'var(--color-warn)', color: '#fff' }
                          : { background: 'var(--color-surface)', color: 'var(--color-ink-soft)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
                      }
                    >
                      {r.label}
                    </button>
                  )
                })}
              </div>
            )}

            <AnimatePresence mode="wait">
              {pick !== null && (
                <motion.p
                  key={pick}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  className="max-w-xl text-center text-lg font-semibold md:text-xl"
                  style={{ color: ex.readings[pick].tone === 'warm' ? 'var(--color-safe)' : 'var(--color-warn)' }}
                >
                  {ex.readings[pick].meaning}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {done && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl text-center font-bold"
              style={{ color: 'var(--color-ink)', fontSize: 'clamp(1.15rem, 2.5vw, 1.6rem)', lineHeight: 1.35 }}
            >
              {WORDS_POINT}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-3xl items-center justify-between">
        <button
          onClick={() => goto(Math.max(0, ei - 1))}
          disabled={ei === 0}
          className="press rounded-full px-5 py-3 text-sm font-bold disabled:opacity-0"
          style={{ background: 'var(--color-surface)', color: 'var(--color-ink-soft)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
        >
          ← Back
        </button>
        <div className="flex gap-2">
          {TONE_EXAMPLES.map((_, n) => (
            <span
              key={n}
              className="h-1.5 rounded-full transition-all"
              style={{ width: n === ei ? 22 : 7, background: n === ei ? 'var(--color-accent)' : 'var(--color-hair-strong)' }}
            />
          ))}
        </div>
        <button
          onClick={() => goto(Math.min(TONE_EXAMPLES.length - 1, ei + 1))}
          disabled={last}
          className="press rounded-full px-6 py-3 text-sm font-bold disabled:opacity-30"
          style={{ background: 'var(--color-accent)', color: 'var(--color-accent-ink)' }}
        >
          Next message →
        </button>
      </div>
    </div>
  )
}
