import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlideShell } from '../components/ui'
import { PEOPLE, KNOW_TRUST_POINT } from '../data/scenarios'

function Track({
  value,
  suggested,
  onChange,
  revealed,
}: {
  value: number
  suggested: number
  onChange: (n: number) => void
  revealed: boolean
}) {
  return (
    <div className="relative py-3">
      <div className="relative h-2.5 rounded-full" style={{ background: 'linear-gradient(90deg,#fda4af,#fcd34d,#6ee7b7)' }}>
        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white"
            style={{ left: `${suggested}%`, background: '#4f46e5' }}
            title="A sensible spot"
          />
        )}
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-x-0 top-1 h-6 w-full cursor-pointer appearance-none bg-transparent"
        aria-label="Place this person"
      />
      <div className="mt-1 flex justify-between text-xs font-semibold" style={{ color: '#6b7280' }}>
        <span>Just met online</span>
        <span>Know them in real life</span>
      </div>
    </div>
  )
}

export function KnowTrustSlide() {
  const [pos, setPos] = useState<Record<string, number>>(() =>
    Object.fromEntries(PEOPLE.map((p) => [p.id, 50])),
  )
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const allRevealed = revealed.size === PEOPLE.length

  return (
    <SlideShell
      kicker="Teach · know vs trust"
      title="Do you really know them?"
      intro="Drag each person along the line. Then reveal a sensible place for them and talk about why."
      wide
    >
      <div className="grid gap-4 md:grid-cols-2">
        {PEOPLE.map((p) => {
          const isRev = revealed.has(p.id)
          return (
            <div key={p.id} className="glass p-5">
              <p className="font-display text-lg font-bold" style={{ color: '#1b1c2a' }}>
                {p.who}
              </p>
              <p className="mt-1 text-sm" style={{ color: '#4a4d63' }}>
                {p.detail}
              </p>
              <Track
                value={pos[p.id]}
                suggested={p.suggested}
                revealed={isRev}
                onChange={(n) => setPos((s) => ({ ...s, [p.id]: n }))}
              />
              {!isRev ? (
                <button
                  onClick={() => setRevealed((s) => new Set(s).add(p.id))}
                  className="mt-2 rounded-full px-4 py-1.5 text-sm font-bold"
                  style={{ background: 'rgba(79,70,229,0.12)', color: '#4f46e5' }}
                >
                  Reveal
                </button>
              ) : (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 rounded-xl px-3 py-2 text-sm"
                  style={{ background: 'rgba(16,185,129,0.1)', color: '#065f46', lineHeight: 1.4 }}
                >
                  {p.teacherNote}
                </motion.p>
              )}
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 rounded-2xl px-6 py-5"
            style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.16),rgba(14,165,233,0.12))', border: '1px solid rgba(99,102,241,0.3)' }}
          >
            <p className="font-display text-lg font-bold md:text-xl" style={{ color: '#1b1c2a' }}>
              {KNOW_TRUST_POINT}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </SlideShell>
  )
}
