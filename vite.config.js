import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = process.env.VITE_BASE_PATH || env.VITE_BASE_PATH || '/'
  return {
    plugins: [react(), {
      name: 'base-aware-404',
      writeBundle(options) {
        // Files in public are copied verbatim; substitute the configured base after copying.
        const file = path.resolve(options.dir, '404.html')
        fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replaceAll('%BASE_URL%', base))
      },
    }],
    base,
  }
})
