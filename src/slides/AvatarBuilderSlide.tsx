import { useState } from 'react'
import { motion } from 'framer-motion'
import { Avatar, type AvatarSpec } from '../components/Avatar'
import { Kicker } from '../components/ui'

interface Choice {
  label: string
  patch: AvatarSpec
}
interface Category {
  key: string
  label: string
  choices: Choice[]
}

const CATEGORIES: Category[] = [
  {
    key: 'hair',
    label: 'Hair',
    choices: [
      { label: 'Short', patch: { top: ['shortHairShortFlat'] } },
      { label: 'Curly', patch: { top: ['shortHairShortCurly'] } },
      { label: 'Long', patch: { top: ['longHairStraight'] } },
      { label: 'Bun', patch: { top: ['longHairBun'] } },
      { label: 'Hat', patch: { top: ['winterHat1'] } },
    ],
  },
  {
    key: 'colour',
    label: 'Hair colour',
    choices: [
      { label: 'Brown', patch: { hairColor: ['2c1b18'] } },
      { label: 'Black', patch: { hairColor: ['090806'] } },
      { label: 'Blonde', patch: { hairColor: ['d6b370'] } },
      { label: 'Red', patch: { hairColor: ['a55728'] } },
      { label: 'Pink', patch: { hairColor: ['f59797'] } },
    ],
  },
  {
    key: 'glasses',
    label: 'Glasses',
    choices: [
      { label: 'None', patch: { accessories: [] } },
      { label: 'Round', patch: { accessories: ['round'] } },
      { label: 'Square', patch: { accessories: ['wayfarers'] } },
      { label: 'Sun', patch: { accessories: ['sunglasses'] } },
    ],
  },
  {
    key: 'top',
    label: 'Top',
    choices: [
      { label: 'Hoodie', patch: { clothing: ['hoodie'] } },
      { label: 'T-shirt', patch: { clothing: ['shirtCrewNeck'] } },
      { label: 'Graphic', patch: { clothing: ['graphicShirt'] } },
      { label: 'Smart', patch: { clothing: ['blazerAndSweater'] } },
    ],
  },
  {
    key: 'face',
    label: 'Face',
    choices: [
      { label: 'Happy', patch: { mouth: ['smile'], eyes: ['happy'] } },
      { label: 'Cheeky', patch: { mouth: ['twinkle'], eyes: ['wink'] } },
      { label: 'Surprised', patch: { mouth: ['disbelief'], eyes: ['surprised'] } },
      { label: 'Cool', patch: { mouth: ['serious'], eyes: ['default'] } },
    ],
  },
]

const BASE: AvatarSpec = {
  seed: 'me-online',
  top: ['shortHairShortFlat'],
  hairColor: ['2c1b18'],
  skinColor: ['light'],
  clothing: ['hoodie'],
  clothesColor: ['3b6df6'],
  accessories: [],
  eyes: ['happy'],
  eyebrows: ['defaultNatural'],
  mouth: ['smile'],
}

export function AvatarBuilderSlide() {
  const [spec, setSpec] = useState<AvatarSpec>(BASE)
  const [cat, setCat] = useState(0)
  const category = CATEGORIES[cat]

  return (
    <div className="m-auto w-full px-8 py-14 md:px-20">
      <div className="mx-auto w-full max-w-5xl">
        <Kicker>Task · build one together, then make your own</Kicker>
        <h2 className="mt-4" style={{ color: 'var(--color-ink)', fontSize: 'clamp(1.9rem, 4.4vw, 3rem)', lineHeight: 1.1 }}>
          Design and label your avatar
        </h2>

        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:items-start">
          <div className="card flex items-center justify-center p-6">
            <motion.div key={JSON.stringify(spec)} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.16 }}>
              <Avatar spec={spec} size={228} />
            </motion.div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c, i) => (
                <button
                  key={c.key}
                  onClick={() => setCat(i)}
                  className="press rounded-full px-4 py-2 text-sm font-bold"
                  style={
                    i === cat
                      ? { background: 'var(--color-accent)', color: '#fff' }
                      : { color: 'var(--color-ink-soft)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', background: 'var(--color-surface)' }
                  }
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {category.choices.map((ch) => (
                <button
                  key={ch.label}
                  onClick={() => setSpec((s) => ({ ...s, ...ch.patch }))}
                  className="press card px-3 py-3 text-sm font-bold"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {ch.label}
                </button>
              ))}
            </div>

            <div className="card mt-6 p-5">
              <p className="text-base font-bold" style={{ color: 'var(--color-ink)' }}>
                Now make your own on paper
              </p>
              <p className="mt-1.5 text-sm md:text-base" style={{ color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>
                Draw an avatar for a new game. Add <strong>3 labels</strong> — each one should say something that is
                <strong> true to the real you</strong>, not just what looks cool.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
