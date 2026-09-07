import { beforeEach } from 'vitest';
// the order of import is important
// jest-dom needs a global-jsdom
import 'global-jsdom/register';
import '@testing-library/jest-dom/vitest';

import { cleanupDom } from './src/testing/render';

beforeEach(() => {
  cleanupDom();
});
