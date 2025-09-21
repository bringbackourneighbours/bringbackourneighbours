import { describe, expect, it } from 'vitest';
import { getPrintDistDir } from './get-print-dist-dir';

describe('getPrintDistDir', () => {
  it('should append /print to a directory without trailing slash', () => {
    expect(getPrintDistDir('/foo/bar')).toBe('/foo/bar/print');
  });

  it('should append /print to a directory with trailing slash', () => {
    expect(getPrintDistDir('/foo/bar/')).toBe('/foo/bar/print');
  });

  it('should work with root directory', () => {
    expect(getPrintDistDir('/')).toBe('/print');
  });

  it('should work with empty string', () => {
    expect(getPrintDistDir('')).toBe('/print');
  });
});
