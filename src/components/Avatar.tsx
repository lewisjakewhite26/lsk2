import { useMemo } from 'react'
import { createAvatar } from '@dicebear/core'
import { avataaars } from '@dicebear/collection'

/* Avataaars (via DiceBear) — inline SVG, no network, bundles into the
 * standalone file. Options mirror getavataaars.com. */

export interface AvatarSpec {
  seed?: string
  top?: string[]
  accessories?: string[]
  clothing?: string[]
  clothesColor?: string[]
  eyes?: string[]
  eyebrows?: string[]
  mouth?: string[]
  hairColor?: string[]
  skinColor?: string[]
  facialHair?: string[]
}

export function Avatar({ spec, size = 220 }: { spec: AvatarSpec; size?: number }) {
  const svg = useMemo(() => {
    // DiceBear generates its own narrow literal-union types for every option;
    // we curate the values ourselves, so widen to string[] at this boundary.
    const options = {
      size,
      radius: 50,
      backgroundColor: ['ffffff'],
      accessoriesProbability: spec.accessories?.length ? 100 : 0,
      facialHairProbability: spec.facialHair?.length ? 100 : 0,
      ...spec,
    } as Parameters<typeof createAvatar<Record<string, unknown>>>[1]
    return createAvatar(avataaars, options).toString()
  }, [spec, size])

  return (
    <div
      style={{ width: size, height: size }}
      // DiceBear returns a trusted, self-generated SVG string
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

/* The persona for the hook. Placeholder styling until Lewis supplies
 * the real generated look + the Netflix / Facebook images. */
export const PRIYA: AvatarSpec = {
  seed: 'priya-me-online',
  top: ['longHairStraight'],
  hairColor: ['2c1b18'],
  skinColor: ['brown'],
  clothing: ['hoodie'],
  clothesColor: ['3b6df6'],
  eyes: ['default'],
  eyebrows: ['defaultNatural'],
  mouth: ['smile'],
}
