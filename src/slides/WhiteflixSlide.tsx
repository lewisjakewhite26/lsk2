import mrwhiteflix from '../assets/mrwhiteflix.png'

/* Full-bleed image of Mr White's "Netflix". Teacher-led starter —
 * "What can you tell about me from just this?" — spoken, not on screen.
 * Fixed to the viewport so the deck's top padding doesn't box it in. */
export function WhiteflixSlide() {
  return (
    <div className="fixed inset-0 z-20 overflow-hidden bg-black">
      <img
        src={mrwhiteflix}
        alt="Mr White’s streaming profile, full of coffee documentaries"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}
