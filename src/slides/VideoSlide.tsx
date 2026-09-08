import { motion } from 'framer-motion'
import { Kicker } from '../components/ui'

const EASE = [0.22, 1, 0.36, 1] as const
const URL = 'https://www.bbc.co.uk/teach/articles/ztth9ty'

export function VideoSlide() {
  return (
    <div className="flex w-full flex-col items-center px-8 py-16 text-center md:px-20">
      <Kicker>Watch together · 3 min 39 sec</Kicker>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: EASE }}
        className="mt-5 max-w-3xl"
        style={{ color: 'var(--color-ink)', fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.12 }}
      >
        How to manage your online self-image and identity
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: EASE, delay: 0.06 }}
        className="mt-4 max-w-xl"
        style={{ color: 'var(--color-ink-soft)', fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', lineHeight: 1.5 }}
      >
        A short film from BBC Teach. Opens in a new tab — play it, then come back.
      </motion.p>
      <motion.a
        href={URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: EASE, delay: 0.12 }}
        className="press mt-10 inline-flex items-center gap-3 rounded-full px-9 py-4 text-lg font-bold"
        style={{ background: 'var(--color-accent)', color: 'var(--color-accent-ink)' }}
      >
        ▶ Watch on BBC Teach
      </motion.a>
      <p className="mt-4 text-sm" style={{ color: 'var(--color-ink-faint)' }}>
        bbc.co.uk/teach/articles/ztth9ty
      </p>
    </div>
  )
}
