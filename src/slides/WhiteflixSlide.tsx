import { useState } from 'react'

/* Full-bleed image of Mr White's "Netflix". Teacher-led starter —
 * "What can you tell about me from just this?" — spoken, not on screen.
 *
 * Drop the image at:  public/mrwhiteflix.png
 */
export function WhiteflixSlide() {
  const [failed, setFailed] = useState(false)

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black">
      {!failed ? (
        <img
          src="/mrwhiteflix.png"
          alt="Mr White’s streaming profile, full of coffee documentaries"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-3xl font-extrabold tracking-tight text-white/85">MR WHITEFLIX</p>
          <p className="text-sm text-white/45">
            save the image as <code>public/mrwhiteflix.png</code>
          </p>
        </div>
      )}
    </div>
  )
}
