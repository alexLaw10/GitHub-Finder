import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/api-client',
  test: {
    watch: false,
    globals: true,
    environment: 'node',
    include: ['src/**/*.{spec,test}.ts'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/packages/api-client',
      provider: 'v8',
    },
  },
});
