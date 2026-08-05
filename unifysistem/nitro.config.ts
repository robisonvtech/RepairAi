+mport { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNitroConfig } from 'nitro/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineNitroConfig({
  preset: 'vercel',
  // Ensure output uses Vercel Build Output API directory at repo root
  output: {
    dir: resolve(__dirname, '../.vercel/output')
  }
})
