import { useState } from 'react'
import { Avatar, type AvatarSpec } from '../components/Avatar'
import { Kicker } from '../components/ui'

interface Choice {
  label: string
  patch: AvatarSpec
  swatch?: string
}
interface Category {
  key: string
  label: string
  choices: Choice[]
}

const CATEGORIES: Category[] = [
  {
    key: 'skin',
    label: 'Skin',
    choices: [
      { label: '', swatch: '#ffdbb4', patch: { skinColor: ['ffdbb4'] } },
      { label: '', swatch: '#edb98a', patch: { skinColor: ['edb98a'] } },
      { label: '', swatch: '#d08b5b', patch: { skinColor: ['d08b5b'] } },
      { label: '', swatch: '#ae5d29', patch: { skinColor: ['ae5d29'] } },
      { label: '', swatch: '#614335', patch: { skinColor: ['614335'] } },
    ],
  },
  {
    key: 'hair',
    label: 'Hair',
    choices: [
      { label: 'Short', patch: { top: ['shortFlat'] } },
      { label: 'Curly', patch: { top: ['shortCurly'] } },
      { label: 'Afro', patch: { top: ['fro'] } },
      { label: 'Long', patch: { top: ['straight01'] } },
      { label: 'Bun', patch: { top: ['bun'] } },
      { label: 'Hat', patch: { top: ['winterHat1'] } },
    ],
  },
  {
    key: 'colour',
    label: 'Hair colour',
    choices: [
      { label: '', swatch: '#2c1b18', patch: { hairColor: ['2c1b18'] } },
      { label: '', swatch: '#724133', patch: { hairColor: ['724133'] } },
      { label: '', swatch: '#b58143', patch: { hairColor: ['b58143'] } },
      { label: '', swatch: '#d6b370', patch: { hairColor: ['d6b370'] } },
      { label: '', swatch: '#c93305', patch: { hairColor: ['c93305'] } },
      { label: '', swatch: '#e8a4c4', patch: { hairColor: ['e8a4c4'] } },
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
  top: ['shortFlat'],
  hairColor: ['2c1b18'],
  skinColor: ['edb98a'],
  clothing: ['hoodie'],
  clothesColor: ['3b6df6'],
  accessories: [],
  eyes: ['happy'],
  eyebrows: ['defaultNatural'],
  mouth: ['smile'],
}

/** does the current spec already match this choice's patch? */
function isActive(spec: AvatarSpec, patch: AvatarSpec) {
  return Object.entries(patch).every(([k, v]) => {
    const cur = (spec as Record<string, unknown>)[k]
    return JSON.stringify(cur) === JSON.stringify(v)
  })
}

export function AvatarBuilderSlide() {
  const [spec, setSpec] = useState<AvatarSpec>(BASE)
  const [cat, setCat] = useState(0)
  const category = CATEGORIES[cat]

  return (
    <div className="m-auto w-full px-8 py-12 md:px-20">
      <div className="mx-auto w-full max-w-5xl">
        <Kicker>Activity · build an avatar as a class</Kicker>
        <h2 className="mt-4" style={{ color: 'var(--color-ink)', fontSize: 'clamp(1.9rem, 4.4vw, 3rem)', lineHeight: 1.1 }}>
          Design and label your avatar
        </h2>

        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,300px)_1fr] md:items-center">
          <div className="card flex items-center justify-center p-5">
            <Avatar spec={spec} size={248} />
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

            <div className="mt-5 flex flex-wrap gap-3">
              {category.choices.map((ch, n) => {
                const active = isActive(spec, ch.patch)
                if (ch.swatch) {
                  return (
                    <button
                      key={n}
                      onClick={() => setSpec((s) => ({ ...s, ...ch.patch }))}
                      aria-label={`${category.label} option ${n + 1}`}
                      className="press h-12 w-12 rounded-full"
                      style={{
                        background: ch.swatch,
                        boxShadow: active
                          ? '0 0 0 3px var(--color-accent), 0 0 0 5px var(--color-surface)'
                          : '0 0 0 1px var(--color-hair)',
                      }}
                    />
                  )
                }
                return (
                  <button
                    key={n}
                    onClick={() => setSpec((s) => ({ ...s, ...ch.patch }))}
                    className="press rounded-xl px-4 py-3 text-sm font-bold"
                    style={
                      active
                        ? { background: 'var(--color-accent)', color: '#fff' }
                        : { background: 'var(--color-surface)', color: 'var(--color-ink)', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
                    }
                  >
                    {ch.label}
                  </button>
                )
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
