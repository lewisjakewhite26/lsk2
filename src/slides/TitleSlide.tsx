import { motion } from 'framer-motion'
import { OBJECTIVE, SUCCESS_CRITERIA } from '../lesson'
import { Kicker } from '../components/ui'

const EASE = [0.22, 1, 0.36, 1] as const

export function TitleSlide() {
  return (
    <div className="w-full px-8 py-16 md:px-20">
      <div className="mx-auto grid w-full max-w-5xl gap-12 md:grid-cols-[1.15fr_1fr] md:items-start">
        <div>
          <Kicker>Today’s learning</Kicker>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, ease: EASE }}
            className="mt-5 leading-[1.12]"
            style={{ color: 'var(--color-ink)', fontSize: 'clamp(2rem, 4.8vw, 3.4rem)' }}
          >
            {OBJECTIVE}
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, ease: EASE, delay: 0.08 }}
          className="card p-7 md:p-8"
        >
          <Kicker>By the end I can…</Kicker>
          <ul className="mt-5 grid gap-4">
            {SUCCESS_CRITERIA.map((s, n) => (
              <li key={n} className="flex items-start gap-3.5" style={{ color: 'var(--color-ink)' }}>
                <span
                  className="mt-0.5 shrink-0 text-base font-extrabold"
                  style={{ color: 'var(--color-accent)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {n + 1}
                </span>
                <span style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.45 }}>{s}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}
