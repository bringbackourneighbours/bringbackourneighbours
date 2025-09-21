import { describe, expect, it, vi } from 'vitest';
import { getFlyerPdfFileNames } from './get-flyer-pdf-file-names';

const mockFiles = [
  'flyer-de-police.pdf',
  'flyer-en-detention.pdf',
  'not-a-flyer.pdf',
  'flyer-baz.txt',
  'kit-de-support.pdf',
];

vi.mock('node:fs/promises', () => ({
  readdir: vi.fn(() => Promise.resolve(mockFiles)),
}));

describe('getFlyerPdfFileNames', () => {
  it('should return all pdf files starting with flyer-', async () => {
    const result = await getFlyerPdfFileNames('/some/dir');
    expect(result).toEqual(['flyer-de-police.pdf', 'flyer-en-detention.pdf']);
  });
});
