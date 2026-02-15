import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getBasedUrl,
  getAllFlyerPrintUrl,
  getPrintUrl,
} from './get-based-url.ts';

vi.mock('../../astro.config.mjs', () => ({
  default: {
    base: 'example',
    site: 'https://example.com/',
  },
}));

describe('get-based-url', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getBasedUrl', () => {
    it('returns based url for a given path', () => {
      const result = getBasedUrl('foo/bar');
      expect(result).toBe('/example/foo/bar');
    });

    it('returns base url if path is empty', () => {
      const result = getBasedUrl('');
      expect(result).toBe('/example/');
    });

    it('returns absolute url for a given path', () => {
      const result = getBasedUrl('foo/bar', true);
      expect(result).toBe('https://example.com/example/foo/bar');
    });
  });

  describe('getPrintUrl', () => {
    it('returns correct print url for flyer', () => {
      const result = getPrintUrl('flyers', 'de', 'abc');
      expect(result).toBe('/example/print/flyer-de-abc.pdf');
    });

    it('returns correct print url for kits', () => {
      const result = getPrintUrl('kits', 'en', 'kitid', true);
      expect(result).toBe('https://example.com/example/print/kit-en-kitid.pdf');
    });
  });

  describe('getAllFlyerPrintUrl', () => {
    it('returns correct url for all flyers in a language', () => {
      const result = getAllFlyerPrintUrl('de');
      expect(result).toBe('/example/print/all-flyer-de.pdf');
    });
    it('returns correct url for all flyers for all languages', () => {
      const result = getAllFlyerPrintUrl('all');
      expect(result).toBe('/example/print/all-flyer-all.pdf');
    });
  });
});
