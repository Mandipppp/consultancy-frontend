import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),     // ← auto-loads tailwind.config.js for both dev & build
  ],
})