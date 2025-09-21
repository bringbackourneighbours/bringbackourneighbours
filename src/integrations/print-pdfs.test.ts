import { beforeEach, describe, expect, it, vi } from 'vitest';
import { printPdfsImpl } from './print-pdfs';
import type { AstroIntegrationLogger } from 'astro';

// Mocks for node:fs/promises
vi.mock('node:fs/promises', () => ({
  mkdir: vi.fn().mockResolvedValue(undefined),
  writeFile: vi.fn().mockResolvedValue(undefined),
}));
// Mock for puppeteer
const mockBrowser = {
  version: vi.fn().mockResolvedValue('MockBrowser'),
  close: vi.fn().mockResolvedValue(undefined),
};
vi.mock('puppeteer', () => ({
  default: {
    launch: vi.fn(() => mockBrowser),
  },
}));

// Mock for child_process
const mockChildProcess = {
  on: vi.fn((event, cb) => {
    if (event === 'close') cb(0);
  }),
  pid: 1234,
  kill: vi.fn(),
};
vi.mock('node:child_process', () => ({
  exec: vi.fn(() => {
    return mockChildProcess;
  }),
}));
// Mock for AstroConfig
vi.mock('../../astro.config.mjs', () => ({
  default: { site: 'http://localhost:4321/' },
  previewUrl: 'http://localhost:4321/',
}));
// Mock for printHtmlToPdf
vi.mock('../util/print-html-to-pdf.ts', () => ({
  printHtmlToPdf: vi.fn().mockResolvedValue(Buffer.from('PDF')),
}));
// Mock for getPrintDistDir
vi.mock('../util/get-print-dist-dir.ts', () => ({
  getPrintDistDir: vi.fn((dir) => `${dir}/print`),
}));

const mockLogger = {
  info: vi.fn(),
  debug: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  options: { dest: undefined, level: 'info' },
  label: 'mock',
  fork: vi.fn(() => mockLogger),
};

describe('printPdfs Integration', () => {
  describe('printPdfsImpl', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('prints only internal-print pages to PDF and calls all dependencies', async () => {
      const pages = [
        { pathname: 'internal-print/page1' },
        { pathname: 'internal-print/page2' },
        { pathname: 'public/page3' }, // should be ignored
      ];
      await printPdfsImpl(
        new URL('file://myMaschine/dist'),
        mockLogger as unknown as AstroIntegrationLogger,
        pages,
      );
      const { mkdir, writeFile } = await import('node:fs/promises');
      const puppeteer = (await import('puppeteer')).default;
      const { printHtmlToPdf } = await import('../util/print-html-to-pdf.ts');
      const { getPrintDistDir } = await import('../util/get-print-dist-dir.ts');
      const { exec } = await import('node:child_process');

      expect(getPrintDistDir).toHaveBeenCalledWith('/dist');
      expect(mkdir).toHaveBeenCalledWith('/dist/print', {
        recursive: true,
      });
      expect(exec).toHaveBeenCalledWith('npm run preview');
      expect(puppeteer.launch).toHaveBeenCalledTimes(1);
      expect(printHtmlToPdf).toHaveBeenCalledTimes(2);
      expect(printHtmlToPdf).toHaveBeenCalledWith(
        'http://localhost:4321/internal-print/page1',
        mockBrowser,
      );
      expect(printHtmlToPdf).toHaveBeenCalledWith(
        'http://localhost:4321/internal-print/page2',
        mockBrowser,
      );
      expect(writeFile).toHaveBeenCalledTimes(2);
      expect(writeFile).toHaveBeenCalledWith(
        expect.stringContaining('/dist/print/page'),
        Buffer.from('PDF'),
      );
      expect(mockBrowser.close).toHaveBeenCalledTimes(1);
      expect(mockChildProcess.kill).toHaveBeenCalledTimes(1);
    });
  });
});
