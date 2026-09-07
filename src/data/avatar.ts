/** Avatar builder — 4 features, 4 options each. Each option carries a talking point. */

export type FeatureKey = 'creature' | 'colour' | 'accessory' | 'username'

export interface Option {
  id: string
  label: string
  /** short line the teacher can pull on when this is chosen */
  talk: string
}

export interface Feature {
  key: FeatureKey
  label: string
  prompt: string
  options: Option[]
}

export const FEATURES: Feature[] = [
  {
    key: 'creature',
    label: 'Character',
    prompt: 'What will our avatar be?',
    options: [
      { id: 'fox', label: 'Fox', talk: 'A fox looks friendly. It tells us nothing real about the person.' },
      { id: 'robot', label: 'Robot', talk: 'A robot hides the person completely. That can help you stay private, and it also means others can hide.' },
      { id: 'dragon', label: 'Dragon', talk: 'People often pick something powerful, even when that is not how they feel in real life.' },
      { id: 'cat', label: 'Cat', talk: 'This might match a real pet, or it might have nothing to do with them.' },
    ],
  },
  {
    key: 'colour',
    label: 'Colour',
    prompt: 'Pick a colour',
    options: [
      { id: 'sky', label: 'Sky blue', talk: 'A colour can show a mood or a favourite. It is a small clue, not a fact.' },
      { id: 'grape', label: 'Purple', talk: 'We are choosing how we want to look. Everyone does this online.' },
      { id: 'mint', label: 'Green', talk: 'You might not pick this colour for a school photo. Online you have more choice.' },
      { id: 'sun', label: 'Gold', talk: 'A bright colour to stand out. Standing out is not the same as showing who you are.' },
    ],
  },
  {
    key: 'accessory',
    label: 'Add-on',
    prompt: 'Add one thing',
    options: [
      { id: 'crown', label: 'Crown', talk: 'A crown says "I am important here." It is part of the costume.' },
      { id: 'cape', label: 'Cape', talk: 'People often build an online self that seems braver than their real day.' },
      { id: 'glasses', label: 'Glasses', talk: 'Some parts might be real, like glasses, and some are made up. It is usually a mix.' },
      { id: 'headset', label: 'Headset', talk: 'A gaming headset. This avatar is built for playing with other people.' },
    ],
  },
  {
    key: 'username',
    label: 'Username',
    prompt: 'Choose a username',
    options: [
      { id: 'star', label: 'StarJumpz', talk: 'A made-up name. It does not use a real name, which is a good habit.' },
      { id: 'pro', label: 'xX_ProGamer_Xx', talk: 'A name that sounds skilled or older. You cannot tell someone’s age from a username.' },
      { id: 'first', label: 'Ben2015', talk: 'A real first name and a year give strangers real clues. Keep those private.' },
      { id: 'animal', label: 'SleepyPanda', talk: 'Random and friendly. It shares nothing private.' },
    ],
  },
]

export const REVEAL_LINE =
  'We have just built a person online. None of our choices show their real name, age, school or face. People choose what to show, so an avatar never proves who someone is.'
