import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    coverage: {
      reporter: ["text", "json", "lcov"],
    },
  },
  server: {
    host: '0.0.0.0', // Necessary for Docker
    port: 5173,
    allowedHosts:['letterboxd-review-analyzer-web.onrender.com'],
    proxy: {
      // Proxy API requests to the backend container
      '/api': {
        target: 'https://letterboxd-review-analyzer-pq3a.onrender.com', // Use the service name for Docker communication
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
