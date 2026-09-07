// Build one self-contained HTML file you can double-click (offline backup).
// Output: dist-single/Me-Online-lesson.html
import { build } from 'vite'
import { mkdirSync, renameSync, rmSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

process.env.SINGLEFILE = '1'

const root = resolve(import.meta.dirname, '..')
const outDir = resolve(root, 'dist-single')

rmSync(outDir, { recursive: true, force: true })

await build({
  root,
  build: { outDir, emptyOutDir: true },
})

const src = resolve(outDir, 'index.html')
const dest = resolve(outDir, 'Me-Online-lesson.html')
if (existsSync(src)) {
  mkdirSync(outDir, { recursive: true })
  renameSync(src, dest)
  console.log('\n✔ Standalone lesson written to  dist-single/Me-Online-lesson.html')
  console.log('  Double-click it, or copy it onto a USB stick / the shared drive.\n')
} else {
  console.error('Expected dist-single/index.html was not produced.')
  process.exit(1)
}
