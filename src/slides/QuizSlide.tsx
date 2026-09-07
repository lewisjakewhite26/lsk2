import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QUIZ } from '../data/quiz'

const EASE = [0.22, 1, 0.36, 1] as const
const LETTERS = ['A', 'B', 'C', 'D']

type Phase = 'question' | 'answering' | 'checked' | 'score'

function Particles() {
  const bits = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        dur: 2.6 + Math.random() * 1.6,
        colour: ['#3b6df6', '#1fa971', '#1c1c1e'][i % 3],
        size: 6 + Math.random() * 7,
      })),
    [],
  )
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {bits.map((b) => (
        <motion.span
          key={b.id}
          initial={{ y: '-8vh', opacity: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 1, 0.15] }}
          transition={{ duration: b.dur, delay: b.delay, ease: 'linear' }}
          className="absolute block rounded-sm"
          style={{ left: `${b.left}%`, width: b.size, height: b.size, background: b.colour }}
        />
      ))}
    </div>
  )
}

export function QuizSlide() {
  const [qi, setQi] = useState(0)
  const [phase, setPhase] = useState<Phase>('question')
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)

  const q = QUIZ[qi]
  const last = qi === QUIZ.length - 1

  function reset() {
    setQi(0)
    setPhase('question')
    setPicked(null)
    setScore(0)
  }
  function check() {
    if (picked === null) return
    if (picked === q.answer) setScore((s) => s + 1)
    setPhase('checked')
  }
  function next() {
    if (last) return setPhase('score')
    setQi((n) => n + 1)
    setPicked(null)
    setPhase('question')
  }

  if (phase === 'score') {
    const pct = score / QUIZ.length
    const msg =
      pct === 1 ? 'Every question right.' : pct >= 0.66 ? 'Well done.' : 'Good try. We will keep talking about this.'
    return (
      <div className="m-auto flex w-full flex-col items-center px-8 py-16 text-center">
        {pct >= 0.66 && <Particles />}
        <p className="kicker">Quiz round</p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, ease: EASE }}
          className="mt-5 font-extrabold"
          style={{ color: 'var(--color-ink)', fontSize: 'clamp(4rem, 14vw, 8.5rem)', lineHeight: 1 }}
        >
          {score}
          <span style={{ color: 'var(--color-ink-faint)' }}> / {QUIZ.length}</span>
        </motion.p>
        <p className="mt-2 font-bold" style={{ color: 'var(--color-ink)', fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
          {msg}
        </p>
        <button
          onClick={reset}
          className="press mt-9 rounded-full px-6 py-3 text-base font-bold"
          style={{ background: 'var(--color-surface)', color: 'var(--color-ink-soft)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
        >
          Play again
        </button>
      </div>
    )
  }

  const showAnswers = phase !== 'question'

  return (
    <div className="w-full flex flex-col px-8 py-10 md:px-20 md:py-14">
      {/* progress */}
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--color-ink-faint)' }}>
          <span className="kicker">Quiz round</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>
            Question {qi + 1} of {QUIZ.length}
          </span>
        </div>
        <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full" style={{ background: 'var(--color-hair)' }}>
          <motion.div
            className="h-full"
            style={{ background: 'var(--color-accent)' }}
            animate={{ width: `${((qi + (phase === 'checked' ? 1 : 0)) / QUIZ.length) * 100}%` }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </div>
      </div>

      {/* question + answers, on a calm surface so it isn't floating */}
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center py-8">
        <div className="card px-8 py-10 md:px-12 md:py-14">
          <AnimatePresence mode="wait">
            <motion.h2
              key={`q-${qi}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
              style={{ color: 'var(--color-ink)', fontSize: 'clamp(1.7rem, 4vw, 2.8rem)', lineHeight: 1.2 }}
            >
              {q.question}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {showAnswers && (
              <motion.div
                key={`a-${qi}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="mt-8 grid gap-3"
              >
                {q.options.map((opt, idx) => {
                  const isAnswer = idx === q.answer
                  const isPicked = idx === picked
                  let s: React.CSSProperties = {
                    color: 'var(--color-ink)',
                    background: 'var(--color-bg)',
                    boxShadow: 'inset 0 0 0 1px var(--color-hair)',
                  }
                  if (phase === 'answering' && isPicked)
                    s = { color: '#fff', background: 'var(--color-accent)', boxShadow: 'none' }
                  if (phase === 'checked' && isAnswer)
                    s = { color: '#fff', background: 'var(--color-safe)', boxShadow: 'none' }
                  if (phase === 'checked' && isPicked && !isAnswer)
                    s = { color: '#fff', background: 'var(--color-warn)', boxShadow: 'none' }
                  return (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: EASE, delay: idx * 0.05 }}
                      disabled={phase === 'checked'}
                      onClick={() => {
                        setPicked(idx)
                        setPhase('answering')
                      }}
                      className="press flex items-center gap-4 rounded-2xl px-5 py-4 text-left font-semibold"
                      style={{ ...s, fontSize: 'clamp(1.05rem, 2.1vw, 1.4rem)' }}
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                        style={{ background: 'rgba(0,0,0,0.1)' }}
                      >
                        {LETTERS[idx]}
                      </span>
                      {opt}
                    </motion.button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase === 'checked' && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="mt-6 text-base md:text-xl"
                style={{ color: 'var(--color-ink-soft)', lineHeight: 1.45 }}
              >
                {q.teach}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* one action, right */}
      <div className="mx-auto flex w-full max-w-3xl justify-end">
        {phase === 'question' && (
          <button
            onClick={() => setPhase('answering')}
            className="press rounded-full px-8 py-4 text-lg font-bold"
            style={{ background: 'var(--color-accent)', color: '#fff' }}
          >
            Show the answers
          </button>
        )}
        {phase === 'answering' && (
          <button
            onClick={check}
            disabled={picked === null}
            className="press rounded-full px-8 py-4 text-lg font-bold disabled:opacity-40"
            style={{ background: 'var(--color-accent)', color: '#fff' }}
          >
            Check answer
          </button>
        )}
        {phase === 'checked' && (
          <button
            onClick={next}
            className="press rounded-full px-8 py-4 text-lg font-bold"
            style={{ background: 'var(--color-accent)', color: '#fff' }}
          >
            {last ? 'See the score' : 'Next question →'}
          </button>
        )}
      </div>
    </div>
  )
}
