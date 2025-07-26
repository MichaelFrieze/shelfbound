import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

const config = defineConfig({
  // build: {
  //   sourcemap: true,
  // },
  // optimizeDeps: {
  //   entries: ['src/**/*.tsx', 'src/**/*.ts'],
  //   exclude: ['@radix-ui/react-select'],
  // },
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart({
      customViteReactPlugin: true,
    }),
    react(),
  ],
})

export default config
