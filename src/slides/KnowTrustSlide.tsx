import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSubSteps } from '../deck'
import { PEOPLE, KNOW_TRUST_POINT } from '../data/scenarios'

const EASE = [0.22, 1, 0.36, 1] as const

function bucket(v: number) {
  if (v < 20) return 'only just met them'
  if (v < 45) return 'barely know them'
  if (v < 70) return 'know them a bit'
  return 'know them well'
}

export function KnowTrustSlide() {
  const [pi, setPi] = useSubSteps(PEOPLE.length)
  const [votes, setVotes] = useState<number[][]>(() => PEOPLE.map(() => []))
  const [revealed, setRevealed] = useState<boolean[]>(() => PEOPLE.map(() => false))
  const barRef = useRef<HTMLButtonElement>(null)

  const person = PEOPLE[pi]
  const myVotes = votes[pi]
  const avg = myVotes.length ? myVotes.reduce((a, b) => a + b, 0) / myVotes.length : null
  const isRevealed = revealed[pi]
  const allDone = revealed.every(Boolean)

  function addVote(e: React.MouseEvent) {
    const el = barRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    setVotes((v) => v.map((arr, n) => (n === pi ? [...arr, pct] : arr)))
  }
  function clearVotes() {
    setVotes((v) => v.map((arr, n) => (n === pi ? [] : arr)))
  }
  function reveal() {
    setRevealed((r) => r.map((b, n) => (n === pi ? true : b)))
  }

  return (
    <div className="w-full px-8 md:px-20">
      <div className="mx-auto w-full max-w-4xl">
        <p className="kicker">Know vs trust · person {pi + 1} of {PEOPLE.length}</p>
        <h2 className="mt-4" style={{ color: 'var(--color-ink)', fontSize: 'clamp(2rem, 4.6vw, 3.2rem)', lineHeight: 1.1 }}>
          Do you really know them?
        </h2>
        <p className="mt-3 text-base md:text-lg" style={{ color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>
          Tap the bar to add each vote. Where does the class think this person sits?
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={pi}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mt-8"
          >
            <p className="font-bold" style={{ color: 'var(--color-ink)', fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
              {person.who}
            </p>
            <p className="mt-1.5 text-base md:text-lg" style={{ color: 'var(--color-ink-soft)' }}>
              {person.detail}
            </p>

            <div className="mt-9 select-none">
              <button
                ref={barRef}
                onClick={addVote}
                aria-label="Add a vote on the scale"
                className="relative block h-5 w-full cursor-pointer rounded-full"
                style={{ background: 'linear-gradient(90deg, #fecdd3, #fde68a, #bbf7d0)' }}
              >
                {myVotes.map((v, n) => (
                  <span
                    key={n}
                    className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
                    style={{ left: `${v}%`, background: 'var(--color-ink)', opacity: 0.6 }}
                  />
                ))}
                {avg !== null && (
                  <span
                    className="absolute -top-2 bottom-[-8px] w-[3px] -translate-x-1/2 rounded-full"
                    style={{ left: `${avg}%`, background: 'var(--color-accent)' }}
                  />
                )}
                {isRevealed && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-3 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white"
                    style={{ left: `${person.suggested}%`, background: 'var(--color-safe)' }}
                    title="A sensible spot"
                  >
                    ✓
                  </motion.span>
                )}
              </button>
              <div
                className="mt-2.5 flex justify-between text-sm font-semibold md:text-base"
                style={{ color: 'var(--color-ink-soft)' }}
              >
                <span>Just met online</span>
                <span>Know them in real life</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-base md:text-lg">
              <span style={{ color: 'var(--color-ink-soft)' }}>
                <strong style={{ color: 'var(--color-ink)' }}>{myVotes.length}</strong> vote
                {myVotes.length === 1 ? '' : 's'}
              </span>
              {avg !== null && (
                <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>class average: {bucket(avg)}</span>
              )}
              {myVotes.length > 0 && (
                <button onClick={clearVotes} className="font-semibold underline" style={{ color: 'var(--color-ink-soft)' }}>
                  Clear
                </button>
              )}
            </div>

            {!isRevealed ? (
              <button
                onClick={reveal}
                className="press mt-6 rounded-full px-6 py-3 text-base font-bold"
                style={{ background: 'var(--color-surface)', color: 'var(--color-accent)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
              >
                Reveal a sensible spot
              </button>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 max-w-2xl text-base md:text-lg"
                style={{ color: 'var(--color-ink-soft)', lineHeight: 1.5 }}
              >
                {person.teacherNote}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-9 flex gap-3">
          <button
            onClick={() => setPi(Math.max(0, pi - 1))}
            disabled={pi === 0}
            className="press rounded-full px-5 py-3 text-sm font-bold disabled:opacity-0"
            style={{ background: 'var(--color-surface)', color: 'var(--color-ink-soft)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
          >
            ← Back
          </button>
          <button
            onClick={() => setPi(Math.min(PEOPLE.length - 1, pi + 1))}
            disabled={pi === PEOPLE.length - 1}
            className="press rounded-full px-6 py-3 text-sm font-bold disabled:opacity-30"
            style={{ background: 'var(--color-accent)', color: 'var(--color-accent-ink)' }}
          >
            Next person →
          </button>
        </div>

        <AnimatePresence>
          {allDone && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 font-bold"
              style={{ color: 'var(--color-ink)', fontSize: 'clamp(1.2rem, 2.6vw, 1.7rem)', lineHeight: 1.35 }}
            >
              {KNOW_TRUST_POINT}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
