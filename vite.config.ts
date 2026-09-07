import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// SINGLEFILE=1 -> emit one self-contained dist/index.html you can double-click
const singleFile = process.env.SINGLEFILE === '1'

// https://vite.dev/config/
export default defineConfig({
  base: singleFile ? './' : '/',
  plugins: [react(), tailwindcss(), ...(singleFile ? [viteSingleFile()] : [])],
})
