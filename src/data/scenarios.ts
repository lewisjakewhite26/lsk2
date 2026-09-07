/** "Know vs trust" — pupils place each person on a line from
 *  "just met online" to "know them in real life". */

export interface Person {
  id: string
  who: string
  detail: string
  /** suggested spot 0..100 (0 = stranger online, 100 = know well offline) */
  suggested: number
  teacherNote: string
}

export const PEOPLE: Person[] = [
  {
    id: 'classmate',
    who: 'Someone in your class',
    detail: 'You sit near them every day and play together at breaktime.',
    suggested: 92,
    teacherNote: 'You know this person. You spend real time together, so you can be sure who they are.',
  },
  {
    id: 'cousin',
    who: 'Your cousin who lives far away',
    detail: 'You video-call at the weekend and see them in the holidays.',
    suggested: 80,
    teacherNote: 'You know your cousin, even though a lot of your time together is online. Meeting in real life makes you sure.',
  },
  {
    id: 'teammate',
    who: 'A player on your game team',
    detail: 'You have played together most days for a few months. You have never met.',
    suggested: 40,
    teacherNote: 'You have chatted a lot, but you have never met. You cannot be sure who they really are.',
  },
  {
    id: 'newplayer',
    who: 'A player you met in a game yesterday',
    detail: 'They were kind, funny, and asked to be friends and chat somewhere else.',
    suggested: 8,
    teacherNote: 'Being friendly for one day is not the same as knowing someone. Asking to move to a private chat is a warning sign. Tell a trusted adult.',
  },
]

export const KNOW_TRUST_POINT =
  'Knowing someone takes real time together. Trust is built up slowly on top of that. If someone makes you feel uncomfortable, you can stop trusting them.'

/* ---- "Words have weight": one message, read two ways ---- */

export const MESSAGE = 'wow you actually did that'

export const READINGS = [
  {
    tone: 'kind' as const,
    label: 'Said with a smile',
    meaning: 'They are impressed. It means "well done, that was brilliant."',
  },
  {
    tone: 'unkind' as const,
    label: 'Said with a sneer',
    meaning: 'They are being mean. It means "I can’t believe you were silly enough to do that."',
  },
]

export const WORDS_POINT =
  'Online, the person reading your message cannot see your face or hear your voice, so they have to guess how you meant it. Read your message back before you send it.'

/* ---- "Ask first": permission before sharing ---- */

export interface PermissionCard {
  id: string
  situation: string
  ok: boolean
  because: string
}

export const PERMISSION_CARDS: PermissionCard[] = [
  {
    id: 'photo',
    situation: 'Posting a funny photo of your friend falling over',
    ok: false,
    because: 'It is a photo of them, in a moment they might not want shared. Ask them first.',
  },
  {
    id: 'owndrawing',
    situation: 'Sharing a drawing you made yourself',
    ok: true,
    because: 'You made it, so it is yours to share. You still choose who sees it.',
  },
  {
    id: 'groupwin',
    situation: 'Sharing a team photo after everyone said "yes"',
    ok: true,
    because: 'Everyone in the photo said yes. That is how asking permission should work.',
  },
  {
    id: 'chat',
    situation: 'Forwarding a private message someone sent just to you',
    ok: false,
    because: 'They wrote it for you, not for everyone. Check with them before passing it on.',
  },
]
