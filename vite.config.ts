/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/*
 * Relative asset URLs ("./assets/…"), so the same build works wherever GitHub
 * Pages serves it: from a user site at the domain root, or from a project
 * repository's sub-path. The repository name is not decided yet.
 */
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
});
