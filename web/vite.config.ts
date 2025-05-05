import { defineConfig } from 'vite'
import redwood from '@redwoodjs/vite'

// Set default result order for DNS to ensure Vite loads on localhost instead of 127.0.0.1
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [redwood()],
  css: {
    modules: false,
  },
} as any)
