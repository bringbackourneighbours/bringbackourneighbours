import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getCanonicalUrl,
  getCanonicalUrlForPath,
  getCanonicalUrlToFlyer,
  getCanonicalUrlToKit,
  getCanonicalUrlToPage,
} from './get-canonical-url';

// Mocks
const entryMock = {
  data: { title: 'Test Title' },
};
vi.mock('astro:content', () => ({
  getEntry: vi.fn(() => Promise.resolve(entryMock)),
}));
vi.mock('../../astro.config.mjs', () => ({
  default: {
    site: 'https://example.com/',
  },
}));

describe('get-canonical-url', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const { getEntry } = await import('astro:content');

  describe('getCanonicalUrl', async () => {
    it('returns canonical url when entry exists', async () => {
      const result = await getCanonicalUrl('flyers', 'flyer', 'de', 'abc');
      expect(result).toBe('/de/flyer/abc/Test%20Title');
      expect(getEntry).toHaveBeenCalledWith('flyers', 'abc/de');
    });

    it('returns absolute canonical url when entry exists', async () => {
      const result = await getCanonicalUrl(
        'flyers',
        'flyer',
        'de',
        'abc',
        true,
      );
      expect(result).toBe('https://example.com/de/flyer/abc/Test%20Title');
      expect(getEntry).toHaveBeenCalledWith('flyers', 'abc/de');
    });

    it('returns undefined when entry does not exist', async () => {
      vi.mocked(getEntry).mockResolvedValueOnce(undefined);
      const result = await getCanonicalUrl('flyers', 'flyer', 'de', 'abc');
      expect(result).toBeUndefined();
    });
  });

  describe('getCanonicalUrlToFlyer', async () => {
    it('returns absolute canonical url when entry exists', async () => {
      const result = await getCanonicalUrlToFlyer('de', 'abc', true);
      expect(result).toBe('https://example.com/de/flyer/abc/Test%20Title');
      expect(getEntry).toHaveBeenCalledWith('flyers', 'abc/de');
    });

    it('returns undefined when entry does not exist', async () => {
      vi.mocked(getEntry).mockResolvedValueOnce(undefined);
      const result = await getCanonicalUrlToFlyer('de', 'abc');
      expect(result).toBeUndefined();
    });
  });

  describe('getCanonicalUrlToKit', async () => {
    it('returns absolute canonical url when entry exists', async () => {
      const result = await getCanonicalUrlToKit('de', 'abc', true);
      expect(result).toBe('https://example.com/de/kit/abc/Test%20Title');
      expect(getEntry).toHaveBeenCalledWith('kits', 'abc/de');
    });

    it('returns undefined when entry does not exist', async () => {
      vi.mocked(getEntry).mockResolvedValueOnce(undefined);
      const result = await getCanonicalUrlToKit('de', 'abc');
      expect(result).toBeUndefined();
    });
  });

  describe('getCanonicalUrlToPage', async () => {
    it('returns  absolute canonical url when entry exists', async () => {
      const result = await getCanonicalUrlToPage('de', 'abc', true);
      expect(result).toBe('https://example.com/de/page/abc/Test%20Title');
      expect(getEntry).toHaveBeenCalledWith('pages', 'abc/de');
    });

    it('returns undefined when entry does not exist', async () => {
      vi.mocked(getEntry).mockResolvedValueOnce(undefined);
      const result = await getCanonicalUrlToPage('de', 'abc');
      expect(result).toBeUndefined();
    });
  });

  describe('getCanonicalUrlForPath', async () => {
    it('returns absolute canonical url when entry exists', async () => {
      const result = getCanonicalUrlForPath('de', 'abc', true);
      expect(result).toBe('https://example.com/de/abc');
    });
    it('returns canonical url when entry exists', async () => {
      const result = getCanonicalUrlForPath('de', 'abc');
      expect(result).toBe('/de/abc');
    });
  });
});
