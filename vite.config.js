import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),       // ← makes sure Vite can handle your .jsx files
  ],
})
