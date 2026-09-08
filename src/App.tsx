import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Background, FullscreenButton, ProgressRail, StepBadge } from './components/chrome'
import { EntryGate } from './components/EntryGate'
import { TitleSlide } from './slides/TitleSlide'
import { WhiteflixSlide } from './slides/WhiteflixSlide'
import { StarterSlide } from './slides/StarterSlide'
import { VideoSlide } from './slides/VideoSlide'
import { IdentitySlide } from './slides/IdentitySlide'
import { AvatarBuilderSlide } from './slides/AvatarBuilderSlide'
import { KnowTrustSlide } from './slides/KnowTrustSlide'
import { WordsSlide } from './slides/WordsSlide'
import { AskFirstSlide } from './slides/AskFirstSlide'
import { TalkSlide } from './slides/TalkSlide'
import { QuizSlide } from './slides/QuizSlide'
import { RecapSlide } from './slides/RecapSlide'

interface Step {
  label: string
  render: () => ReactNode
}

const STEPS: Step[] = [
  { label: 'Learning', render: () => <TitleSlide /> },
  { label: 'Mr Whiteflix', render: () => <WhiteflixSlide /> },
  { label: 'Big questions', render: () => <StarterSlide /> },
  { label: 'Watch', render: () => <VideoSlide /> },
  { label: 'Identity', render: () => <IdentitySlide /> },
  { label: 'Know vs trust', render: () => <KnowTrustSlide /> },
  { label: 'Tone online', render: () => <WordsSlide /> },
  { label: 'Ask before sharing', render: () => <AskFirstSlide /> },
  { label: 'Turn and talk', render: () => <TalkSlide /> },
  { label: 'Design your avatar', render: () => <AvatarBuilderSlide /> },
  { label: 'Quiz round', render: () => <QuizSlide /> },
  { label: 'Recap', render: () => <RecapSlide /> },
]

const EASE = [0.22, 1, 0.36, 1] as const

function initialFromUrl() {
  const p = new URLSearchParams(window.location.search)
  const raw = p.get('step')
  if (raw === null) return { entered: false, i: 0 }
  const n = Number(raw)
  if (!Number.isFinite(n)) return { entered: false, i: 0 }
  return { entered: true, i: Math.max(0, Math.min(STEPS.length - 1, Math.round(n))) }
}

export default function App() {
  const start = initialFromUrl()
  const [entered, setEntered] = useState(start.entered)
  const [i, setI] = useState(start.i)

  const go = useCallback((n: number) => setI(Math.max(0, Math.min(STEPS.length - 1, n))), [])

  useEffect(() => {
    if (!entered) return
    const url = new URL(window.location.href)
    url.searchParams.set('step', String(i))
    window.history.replaceState(null, '', url)
  }, [entered, i])

  useEffect(() => {
    if (!entered) return
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        setI((c) => Math.min(STEPS.length - 1, c + 1))
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        setI((c) => Math.max(0, c - 1))
      } else if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) document.exitFullscreen()
        else document.documentElement.requestFullscreen().catch(() => {})
      } else if (e.key === 'Home') {
        setI(0)
      } else if (e.key === 'End') {
        setI(STEPS.length - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [entered])

  const step = STEPS[i]

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Background />

      <AnimatePresence>
        {!entered && <EntryGate key="gate" onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      {entered && (
        <>
          <StepBadge n={i + 1} total={STEPS.length} label={step.label} />
          <FullscreenButton />

          <div className="h-full w-full overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: EASE }}
                className="flex min-h-[100dvh] w-full flex-col items-center justify-start pt-[13vh] pb-28"
              >
                {step.render()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* edge tap zones for smartboard */}
          <button
            aria-label="Previous"
            onClick={() => go(i - 1)}
            className="fixed left-0 top-1/2 z-30 h-32 w-10 -translate-y-1/2 opacity-0"
          />
          <button
            aria-label="Next"
            onClick={() => go(i + 1)}
            className="fixed right-0 top-1/2 z-30 h-32 w-10 -translate-y-1/2 opacity-0"
          />

          <ProgressRail labels={STEPS.map((s) => s.label)} index={i} onJump={go} />
        </>
      )}
    </div>
  )
}
