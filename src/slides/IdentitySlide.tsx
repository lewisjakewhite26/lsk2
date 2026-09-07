import { SlideShell, RevealList } from '../components/ui'

export function IdentitySlide() {
  return (
    <SlideShell
      kicker="Teach · identity"
      title="What identity means"
      intro="Your identity is everything that makes you who you are. Online, you get to choose how you show it."
    >
      <RevealList
        items={[
          {
            head: 'Identity is everything that makes you who you are',
            body: 'Your name, your age, how you look, what you enjoy, your family, how you feel.',
          },
          {
            head: 'Online, you choose how you appear',
            body: 'An avatar instead of a photo. A username instead of your name. A character who might act differently from you.',
          },
          {
            head: 'People show different sides in different places',
            body: 'A gaming name, a family photo album, a reading account. One person, different places.',
          },
          {
            head: 'You cannot be sure about other people either',
            body: 'If you can choose how you appear, so can everyone else. An avatar does not prove who someone is.',
          },
        ]}
      />
    </SlideShell>
  )
}
