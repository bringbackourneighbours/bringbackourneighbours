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
vi.mock('./get-absolute-url', () => ({
  getAbsoluteUrl: vi.fn((path) => `https://example.com/${path}`),
}));
vi.mock('../../astro.config.mjs', () => ({
  default: { site: 'https://example.com/' },
}));

describe('get-canonical-url', async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const { getEntry } = await import('astro:content');
  const { getAbsoluteUrl } = await import('./get-absolute-url');

  describe('getCanonicalUrl', async () => {
    it('returns canonical url when entry exists', async () => {
      const result = await getCanonicalUrl('flyers', 'flyer', 'de', 'abc');
      expect(result).toBe('https://example.com/de/flyer/abc/Test%20Title');
      expect(getEntry).toHaveBeenCalledWith('flyers', 'abc/de');
      expect(getAbsoluteUrl).toHaveBeenCalledWith('de/flyer/abc/Test%20Title');
    });

    it('returns undefined when entry does not exist', async () => {
      vi.mocked(getEntry).mockResolvedValueOnce(undefined);
      const result = await getCanonicalUrl('flyers', 'flyer', 'de', 'abc');
      expect(result).toBeUndefined();
    });
  });

  describe('getCanonicalUrlToFlyer', async () => {
    it('returns canonical url when entry exists', async () => {
      const result = await getCanonicalUrlToFlyer('de', 'abc');
      expect(result).toBe('https://example.com/de/flyer/abc/Test%20Title');
      expect(getEntry).toHaveBeenCalledWith('flyers', 'abc/de');
      expect(getAbsoluteUrl).toHaveBeenCalledWith('de/flyer/abc/Test%20Title');
    });

    it('returns undefined when entry does not exist', async () => {
      vi.mocked(getEntry).mockResolvedValueOnce(undefined);
      const result = await getCanonicalUrlToFlyer('de', 'abc');
      expect(result).toBeUndefined();
    });
  });

  describe('getCanonicalUrlToKit', async () => {
    it('returns canonical url when entry exists', async () => {
      const result = await getCanonicalUrlToKit('de', 'abc');
      expect(result).toBe('https://example.com/de/kit/abc/Test%20Title');
      expect(getEntry).toHaveBeenCalledWith('kits', 'abc/de');
      expect(getAbsoluteUrl).toHaveBeenCalledWith('de/kit/abc/Test%20Title');
    });

    it('returns undefined when entry does not exist', async () => {
      vi.mocked(getEntry).mockResolvedValueOnce(undefined);
      const result = await getCanonicalUrlToKit('de', 'abc');
      expect(result).toBeUndefined();
    });
  });

  describe('getCanonicalUrlToPage', async () => {
    it('returns canonical url when entry exists', async () => {
      const result = await getCanonicalUrlToPage('de', 'abc');
      expect(result).toBe('https://example.com/de/page/abc/Test%20Title');
      expect(getEntry).toHaveBeenCalledWith('pages', 'abc/de');
      expect(getAbsoluteUrl).toHaveBeenCalledWith('de/page/abc/Test%20Title');
    });

    it('returns undefined when entry does not exist', async () => {
      vi.mocked(getEntry).mockResolvedValueOnce(undefined);
      const result = await getCanonicalUrlToPage('de', 'abc');
      expect(result).toBeUndefined();
    });
  });

  describe('getCanonicalUrlForPath', async () => {
    it('returns canonical url when entry exists', async () => {
      const result = await getCanonicalUrlForPath('de', 'abc');
      expect(result).toBe('https://example.com/de/abc');
      expect(getAbsoluteUrl).toHaveBeenCalledWith('de/abc');
    });
  });
});
