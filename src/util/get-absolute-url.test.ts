import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAbsoluteUrl,
  getAllFlyerPrintUrl,
  getPrintUrl,
} from './get-absolute-url.ts';

vi.mock('../../astro.config.mjs', () => ({
  default: { site: 'https://example.com/' },
}));

describe('get-absolute-url', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAbsoluteUrl', () => {
    it('returns absolute url for a given path', () => {
      const result = getAbsoluteUrl('foo/bar');
      expect(result).toBe('https://example.com/foo/bar');
    });
    it('works with leading slash in path', () => {
      const result = getAbsoluteUrl('/foo/bar');
      expect(result).toBe('https://example.com//foo/bar');
    });
    it('returns site url if path is empty', () => {
      const result = getAbsoluteUrl('');
      expect(result).toBe('https://example.com/');
    });
  });

  describe('getPrintUrl', () => {
    it('returns correct print url for flyer', () => {
      const result = getPrintUrl('flyers', 'de', 'abc');
      expect(result).toBe('https://example.com/print/flyer-de-abc.pdf');
    });
    it('returns correct print url for kits', () => {
      const result = getPrintUrl('kits', 'en', 'kitid');
      expect(result).toBe('https://example.com/print/kit-en-kitid.pdf');
    });
  });

  describe('getAllFlyerPrintUrl', () => {
    it('returns correct url for all flyers in a language', () => {
      const result = getAllFlyerPrintUrl('de');
      expect(result).toBe('https://example.com/print/all-flyer-de.pdf');
    });
    it('returns correct url for all flyers for all languages', () => {
      const result = getAllFlyerPrintUrl('all');
      expect(result).toBe('https://example.com/print/all-flyer-all.pdf');
    });
  });
});
