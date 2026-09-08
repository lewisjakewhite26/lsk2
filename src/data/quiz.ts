export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  answer: number
  teach: string
}

export const QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What does "identity" mean?',
    options: [
      'A game you play online',
      'Everything that makes you who you are',
      'A type of password',
      'A kind of avatar',
    ],
    answer: 1,
    teach: 'Your identity is everything that makes you who you are. Online, you choose how much of it to show.',
  },
  {
    id: 'q2',
    question: 'Someone picks a dragon avatar and the username "MegaChamp99". What can you be sure of?',
    options: [
      'They are good at games',
      'They are 9 years old',
      'They like dragons',
      'Almost nothing — it is all chosen',
    ],
    answer: 3,
    teach: 'An avatar and a username are chosen. They do not prove someone’s age, skill or anything else.',
  },
  {
    id: 'q3',
    question: 'You have gamed with someone online every day for months but never met. Do you know them?',
    options: [
      'Yes — months is a long time',
      'No — you have never met, so you cannot be sure who they are',
      'Yes — if they are kind',
      'Only if they tell you their name',
    ],
    answer: 1,
    teach: 'Chatting a lot is not the same as knowing someone. Without meeting, you cannot be sure who they are.',
  },
  {
    id: 'q4',
    question: 'Your friend says they wish they looked like a person they follow online. What is a good thing to say?',
    options: [
      'You should try to look like them',
      'Everyone online only shows their best bits — you are great as you are',
      'Just stop following that person',
      'Nothing, it is not your problem',
    ],
    answer: 1,
    teach: 'People online show their best, tidied-up version. Try not to compare yourself to it.',
  },
  {
    id: 'q5',
    question: 'Why can a joke sound mean when you type it online?',
    options: [
      'The internet is slow',
      'There is no face or voice, so the reader guesses the tone',
      'Jokes are not allowed online',
      'Autocorrect changes the words',
    ],
    answer: 1,
    teach: 'There is no face or voice online, so the reader guesses your tone. Read your message back first.',
  },
  {
    id: 'q6',
    question: 'You want to post a photo with your friend in it. What do you do first?',
    options: [
      'Post it — you can delete it later',
      'Ask your friend for permission',
      'Blur your own face',
      'Only post it if it is funny',
    ],
    answer: 1,
    teach: 'Ask every time. If they say no, you do not post it.',
  },
]
