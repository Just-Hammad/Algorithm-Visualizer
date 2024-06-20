import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const root = resolve(__dirname, 'src')
const dist = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  build: {
    outDir: dist,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        maze: resolve(root, "maze", 'index.html'),
      },
    },
  },
})
