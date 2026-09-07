import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

/* ---------------------------------------------------------------- */

export function Kicker({ children }: { children: ReactNode }) {
  return <span className="kicker inline-block">{children}</span>
}

/* ---------------------------------------------------------------- */

export function SlideShell({
  kicker,
  title,
  intro,
  children,
  wide = false,
}: {
  kicker?: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
  wide?: boolean
}) {
  return (
    <div className="m-auto w-full px-8 py-14 md:px-20">
      <div className={`mx-auto w-full ${wide ? 'max-w-5xl' : 'max-w-3xl'}`}>
        {kicker && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="mb-5"
          >
            <Kicker>{kicker}</Kicker>
          </motion.div>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: EASE, delay: 0.04 }}
          className="leading-[1.08]"
          style={{ color: 'var(--color-ink)', fontSize: 'clamp(2.1rem, 5.4vw, 3.8rem)' }}
        >
          {title}
        </motion.h2>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: EASE, delay: 0.1 }}
            className="mt-5 max-w-2xl"
            style={{ color: 'var(--color-ink-soft)', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', lineHeight: 1.5 }}
          >
            {intro}
          </motion.p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- */

export function RevealList({ items }: { items: { head: string; body?: string }[] }) {
  const [open, setOpen] = useState(0)
  return (
    <div className="grid gap-3">
      {items.map((it, i) => {
        const shown = i < open
        return (
          <button
            key={i}
            onClick={() => setOpen((o) => (i < o ? i : i + 1))}
            className="press w-full rounded-2xl px-6 py-5 text-left"
            style={{
              background: shown ? 'var(--color-surface)' : 'transparent',
              boxShadow: shown ? '0 1px 3px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.04)' : 'none',
              opacity: shown ? 1 : 0.5,
            }}
          >
            <div className="flex items-start gap-4">
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  background: shown ? 'var(--color-accent)' : 'transparent',
                  color: shown ? '#fff' : 'var(--color-ink-faint)',
                  border: shown ? 'none' : '1.5px solid var(--color-hair-strong)',
                }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-lg font-bold md:text-xl" style={{ color: 'var(--color-ink)' }}>
                  {it.head}
                </p>
                {shown && it.body && (
                  <p className="fade-rise mt-1.5 text-base md:text-lg" style={{ color: 'var(--color-ink-soft)' }}>
                    {it.body}
                  </p>
                )}
              </div>
            </div>
          </button>
        )
      })}
      {open < items.length && (
        <p className="mt-1 text-sm" style={{ color: 'var(--color-ink-faint)' }}>
          Click to reveal the next point
        </p>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- */

export function PillButton({
  children,
  onClick,
  tone = 'accent',
  disabled = false,
}: {
  children: ReactNode
  onClick?: () => void
  tone?: 'accent' | 'ghost'
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="press rounded-full px-7 py-3.5 text-base font-bold disabled:opacity-40 md:text-lg"
      style={
        tone === 'accent'
          ? { background: 'var(--color-accent)', color: 'var(--color-accent-ink)' }
          : { background: 'var(--color-surface)', color: 'var(--color-ink)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
      }
    >
      {children}
    </button>
  )
}
