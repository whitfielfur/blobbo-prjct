import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0', 
    port: 5173,
    hmr: {
        host: '127.0.0.1',
        clientPort: 5173
    }
  } // this needed only because I use VPN
})