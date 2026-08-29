/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      enabled: true,
      include: ['src/**/*.{ts,astro}'],
      thresholds: {
        statements: 35,
        branches: 40,
        functions: 25,
        lines: 35,
      },
    },
  },
});
