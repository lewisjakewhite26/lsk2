import { motion } from 'framer-motion'
import { SUCCESS_CRITERIA } from '../lesson'
import { TRUSTED_ADULTS } from '../data/talk'
import { Kicker } from '../components/ui'

const EASE = [0.22, 1, 0.36, 1] as const

const TAKEAWAYS = [
  'Be true to the real you online.',
  'Try not to compare yourself to other people online.',
  'If something online makes you feel worried or unsure, tell a trusted adult.',
]

export function RecapSlide() {
  return (
    <div className="w-full px-8 py-16 md:px-20">
      <div className="mx-auto grid w-full max-w-5xl gap-12 md:grid-cols-2 md:items-start">
        <div>
          <Kicker>Recap</Kicker>
          <h2 className="mt-4" style={{ color: 'var(--color-ink)', fontSize: 'clamp(2rem, 4.6vw, 3.2rem)', lineHeight: 1.1 }}>
            What we can now explain
          </h2>
          <ul className="mt-6 grid gap-3.5">
            {SUCCESS_CRITERIA.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07, ease: EASE }}
                className="flex items-start gap-3"
                style={{ color: 'var(--color-ink)' }}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white"
                  style={{ background: 'var(--color-safe)' }}
                >
                  ✓
                </span>
                <span style={{ fontSize: 'clamp(1rem, 1.7vw, 1.15rem)', lineHeight: 1.45 }}>{s}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: EASE }}
          className="card p-7 md:p-8"
        >
          <Kicker>Remember</Kicker>
          <ul className="mt-4 grid gap-3">
            {TAKEAWAYS.map((t, i) => (
              <li key={i} className="text-lg font-bold md:text-xl" style={{ color: 'var(--color-ink)', lineHeight: 1.3 }}>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm md:text-base" style={{ color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>
            {TRUSTED_ADULTS}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
