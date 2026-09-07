import { motion } from 'framer-motion'
import { SUCCESS_CRITERIA } from '../lesson'
import { TRUSTED_ADULTS } from '../data/talk'
import { Kicker } from '../components/ui'

export function RecapSlide() {
  return (
    <div className="flex h-full w-full items-center justify-center px-6 py-10 md:px-14">
      <div className="grid w-full max-w-5xl gap-8 md:grid-cols-2 md:items-center">
        <div>
          <Kicker>Recap</Kicker>
          <h2 className="mt-3 font-black" style={{ color: '#1b1c2a', fontSize: 'clamp(1.9rem,4.6vw,3.2rem)', lineHeight: 1.1 }}>
            What we can now explain
          </h2>
          <ul className="mt-5 grid gap-3">
            {SUCCESS_CRITERIA.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-start gap-3"
                style={{ color: '#1b1c2a' }}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold"
                  style={{ background: '#10b981', color: '#fff' }}
                >
                  ✓
                </span>
                <span style={{ fontSize: 'clamp(0.95rem,1.7vw,1.15rem)', lineHeight: 1.45 }}>{s}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-7"
        >
          <p className="kicker" style={{ color: '#6366f1' }}>
            If something online worries you
          </p>
          <p className="mt-3 font-display text-xl font-bold md:text-2xl" style={{ color: '#1b1c2a', lineHeight: 1.25 }}>
            Tell a trusted adult straight away. That is the right thing to do.
          </p>
          <p className="mt-3 text-sm md:text-base" style={{ color: '#4a4d63', lineHeight: 1.5 }}>
            {TRUSTED_ADULTS}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
