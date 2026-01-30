import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/biyoushi-sappli-hp/",
  build: {
    outDir: "docs",
  },
  plugins: [react()],
})
