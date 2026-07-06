import path from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/github-finder-test',
  resolve: {
    conditions: ['@org/source'],
    alias: {
      '@': path.resolve(__dirname, '../../packages/design-system/src/lib'),
    },
  },
  plugins: [react()],
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{spec,test}.{ts,tsx}'],
    reporters: ['default'],
    setupFiles: ['./src/test-setup.ts'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      reportsDirectory: '../../coverage/apps/github-finder',
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.{spec,test}.{ts,tsx}', 'src/test-setup.ts', 'src/test-utils/**'],
    },
  },
});
