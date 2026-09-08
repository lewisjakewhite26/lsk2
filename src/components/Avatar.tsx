import { useMemo } from 'react'
import { createAvatar } from '@dicebear/core'
import { avataaars } from '@dicebear/collection'

/* Avataaars (via DiceBear) — inline SVG, no network, bundles into the
 * standalone file. NB DiceBear's option names differ from getavataaars.com
 * (e.g. `shortFlat`, `straight01`, `bun`, `winterHat1`). */

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
      scale: 88, // headroom so hats / buns aren't clipped by the round crop
      backgroundColor: ['f2f2f5'],
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
