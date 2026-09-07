# Me Online — Year 3 & 4 Online Safety

An interactive, teacher-led lesson on **self-image & identity** and **online relationships**
(Teach Computing / *Education for a Connected World*). Whole-class, teacher-paced, built for
the smartboard.

**Objective:** *I can explain how people show who they are online, and the difference
between knowing and trusting someone online.*

## Running it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # normal production build in dist/
```

React + TypeScript + Vite.

### Navigation (in the lesson)

- **Arrow keys / space** — next / previous
- Click the **left or right edge** of the screen
- **Dots** along the bottom — jump to any section
- **F** — full screen
- `?step=N` in the URL resumes at that section (0–10)

## Offline backup — one HTML file

If the app can't run on the day:

```bash
npm run build:single
```

This writes **`dist-single/Me-Online-lesson.html`** — a single self-contained file with the
whole lesson inside it. Double-click to open in any browser, or drop it on a USB stick /
the shared drive. No internet or install needed (fonts fall back to the system font offline).

## Lesson flow

| # | Section | |
|---|---------|--|
| 1 | Learning | Objective + success criteria |
| 2 | Starter — "Same person?" | One child shown four ways; reveal each |
| 3 | Identity | Click-to-reveal teaching points |
| 4 | Avatar builder | Class votes each feature; talking point per choice |
| 5 | Know vs trust | Place four people on a trust line, reveal + discuss |
| 6 | Words have weight | One message, two tones |
| 7 | Ask first | Permission scenarios |
| 8 | Turn and talk | Three discussion cards (teacher prompts built in) |
| 9 | Quiz round | Six questions, check / reveal / teach, score screen |
| 10 | Recap | Success criteria + trusted-adult message |

Lesson content lives in [`src/lesson.ts`](src/lesson.ts) and [`src/data/`](src/data/).
