import { motion } from 'framer-motion'
import { YEAR_GROUP, STRANDS } from '../lesson'

const EASE = [0.16, 1, 0.3, 1] as const

export function EntryGate({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="flex flex-1 flex-col justify-between px-10 py-12 md:px-24 md:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <span className="kicker">{YEAR_GROUP} · Online Safety</span>
          <span className="text-xs font-semibold" style={{ color: 'var(--color-ink-faint)' }}>
            Lesson 1
          </span>
        </motion.div>

        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            style={{ color: 'var(--color-ink)', fontSize: 'clamp(3rem, 12vw, 8.5rem)', lineHeight: 1, letterSpacing: '-0.035em' }}
          >
            Me online
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.5 }}
            className="mt-6 max-w-xl"
            style={{ color: 'var(--color-ink-soft)', fontSize: 'clamp(1.1rem, 2.3vw, 1.45rem)', lineHeight: 1.45 }}
          >
            The things that make you <span style={{ color: 'var(--color-ink)', fontWeight: 700 }}>you</span> — and how you show them online.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.62 }}
            onClick={onEnter}
            className="press mt-10 inline-flex items-center gap-3 rounded-full px-9 py-4 text-lg font-bold"
            style={{ background: 'var(--color-accent)', color: 'var(--color-accent-ink)' }}
          >
            Start the lesson
            <span aria-hidden>→</span>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs"
          style={{ color: 'var(--color-ink-faint)' }}
        >
          <span>{STRANDS}</span>
          <span style={{ width: 1, height: 10, background: 'var(--color-hair-strong)' }} />
          <span>Arrow keys to move</span>
          <span style={{ width: 1, height: 10, background: 'var(--color-hair-strong)' }} />
          <span>F for full screen</span>
        </motion.div>
      </div>
    </motion.div>
  )
}
