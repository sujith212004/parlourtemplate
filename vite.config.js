import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use a relative base so builds work regardless of repo name or hosting path.
  // This produces ./assets/... references which are robust for GitHub Pages.
  base: './',
  plugins: [react()],
})
