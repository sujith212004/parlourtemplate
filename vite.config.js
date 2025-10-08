import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // When deploying to GitHub Pages (username.github.io/repo), set base to your repo name
  // Replace '/portfolioOG/' with your repository name if different.
  base: '/portfolioOG/',
  plugins: [react()],
})
