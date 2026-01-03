import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    setupFiles: ['./vitest-setup.ts'],
    include: ['**/*.test.ts'],
  },
});
