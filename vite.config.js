import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // This exposes the project to your local network
    port: 5173, // Optional: You can also lock in a specific port here
  }
})