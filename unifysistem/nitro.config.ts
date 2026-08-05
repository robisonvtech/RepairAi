import { defineNitroConfig } from 'nitro/config'

export default defineNitroConfig({
  preset: 'vercel',
  // Ensure output uses Vercel Build Output API directory
  output: {
    dir: '.vercel/output'
  }
})
