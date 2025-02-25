import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://vyapar-score-backend-final.onrender.com/api/v1', // Your backend API server
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS backend
      },
    },
  }
})
