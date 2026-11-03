import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Tailwind CSS v4 is wired in as a Vite plugin. No tailwind.config.js is needed:
// design tokens live in src/index.css inside an @theme block.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
