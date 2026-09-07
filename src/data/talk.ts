export interface TalkCard {
  id: string
  prompt: string
  hint: string
}

export const TALK_CARDS: TalkCard[] = [
  {
    id: 't1',
    prompt: 'Why might someone choose an avatar that looks nothing like them?',
    hint: 'To stay private · to feel braver · for fun · because their friends do',
  },
  {
    id: 't2',
    prompt: 'Your friend online says they are 10, like you. Can you be certain? How would you check?',
    hint: 'You cannot be certain from words alone · you would need to meet them · a trusted adult can help you check',
  },
  {
    id: 't3',
    prompt: 'Someone posts a photo of you that you do not like. How do you feel, and what could you do?',
    hint: 'Upset · embarrassed · cross · it was not their photo to post · ask them to take it down · tell a trusted adult',
  },
]

export const TRUSTED_ADULTS =
  'A trusted adult is a grown-up who looks after you and will listen: a parent or carer, a teacher, a teaching assistant, a grandparent. Telling them about a problem online is the right thing to do.'
