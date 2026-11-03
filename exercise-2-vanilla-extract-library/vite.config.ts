import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// vanillaExtractPlugin compiles every *.css.ts file to a static CSS file at build time.
// No styles are generated in the browser at runtime.
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
});
