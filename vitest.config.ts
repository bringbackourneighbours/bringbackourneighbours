import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      enabled: true,
      include: ['src/**/*.{ts,astro}'],
      thresholds: {
        statements: 30, // FIXME: Adjusted coverage threshold
      },
    },
  },
});
