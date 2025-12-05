import { beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import 'global-jsdom/register';

import { cleanupDom } from './src/testing/render.ts';

beforeEach(() => {
  cleanupDom();
});
