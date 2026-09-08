import { motion } from 'framer-motion'
import { Kicker } from '../components/ui'

const EASE = [0.16, 1, 0.3, 1] as const

/* One-line pivot between the two halves of the lesson:
 * "how you show yourself"  ->  "the people on the other side". */
export function LinkSlide() {
  return (
    <div className="w-full px-8 md:px-20">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-start">
        <Kicker>So far · now</Kicker>
        <motion.h2
          initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-6"
          style={{ color: 'var(--color-ink)', fontSize: 'clamp(2.2rem, 6vw, 4.4rem)', lineHeight: 1.1 }}
        >
          You choose what to show online.{' '}
          <span style={{ color: 'var(--color-accent)' }}>So does everyone else.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.35 }}
          className="mt-6 max-w-2xl"
          style={{ color: 'var(--color-ink-soft)', fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', lineHeight: 1.5 }}
        >
          So when you meet people online, how well can you really know them?
        </motion.p>
      </div>
    </div>
  )
}
