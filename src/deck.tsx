import { createContext, useContext, useEffect, useRef, useState } from 'react'

/* Lets a slide with internal steps (questions, examples, people…) capture the
 * deck's next/prev so arrow keys and edge taps walk the sub-steps first and
 * only move to the next slide once the section is finished. */

export interface SubNavHandler {
  /** returns true if it handled the move, false if the section is exhausted */
  next: () => boolean
  prev: () => boolean
}

interface DeckNav {
  register: (h: SubNavHandler | null) => void
}

export const DeckNavContext = createContext<DeckNav>({ register: () => {} })

/**
 * Drive a linear set of sub-steps. Arrow keys / edge taps advance through them;
 * once past the last one the deck moves on. `onExhausted` is optional and only
 * needed if a slide wants custom end behaviour.
 */
export function useSubSteps(count: number) {
  const [i, setI] = useState(0)
  const iRef = useRef(0)
  iRef.current = i
  const { register } = useContext(DeckNavContext)

  useEffect(() => {
    register({
      next: () => {
        if (iRef.current < count - 1) {
          setI(iRef.current + 1)
          return true
        }
        return false
      },
      prev: () => {
        if (iRef.current > 0) {
          setI(iRef.current - 1)
          return true
        }
        return false
      },
    })
    return () => register(null)
  }, [count, register])

  return [i, setI] as const
}

/**
 * For slides that manage their own phases (the quiz) and want full control of
 * arrow-key behaviour. Return true to consume the key, false to let the deck move.
 */
export function useSubNav(handler: SubNavHandler) {
  const ref = useRef(handler)
  ref.current = handler
  const { register } = useContext(DeckNavContext)
  useEffect(() => {
    register({
      next: () => ref.current.next(),
      prev: () => ref.current.prev(),
    })
    return () => register(null)
  }, [register])
}
