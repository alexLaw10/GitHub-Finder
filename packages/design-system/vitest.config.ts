import path from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/design-system',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/lib'),
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
      reportsDirectory: '../../coverage/packages/design-system',
      provider: 'v8',
    },
  },
});
