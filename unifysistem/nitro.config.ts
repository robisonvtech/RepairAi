import { resolve } from 'path'
import { defineNitroConfig } from 'nitro/config'

export default defineNitroConfig({
  preset: 'vercel',
  output: {
    // Resolve output relative to the actual build working directory
    dir: resolve(process.cwd(), '.vercel/output')
  }
})
