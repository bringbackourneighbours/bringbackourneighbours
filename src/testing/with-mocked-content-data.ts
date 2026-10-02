import { vi } from 'vitest';

vi.mock('../content/use-content-data', () => ({
  useContentData: vi.fn((collection, identifier, lang) => {
    const value = `${collection}-${identifier}-${lang}`;
    return Promise.resolve({
      title: `${value}-title`,
      seo: `${value}-seo`,
    });
  }),
}));
