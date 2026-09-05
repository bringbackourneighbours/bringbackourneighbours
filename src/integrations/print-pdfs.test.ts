import { beforeEach, describe, expect, it, vi } from 'vitest';
import { printPdfsImpl } from './print-pdfs';
import type { AstroIntegrationLogger } from 'astro';

// Mocks for node:fs/promises
vi.mock('node:fs/promises', () => ({
  mkdir: vi.fn().mockResolvedValue(undefined),
  writeFile: vi.fn().mockResolvedValue(undefined),
}));
// Mock for playwright
const mockBrowser = {
  version: vi.fn().mockResolvedValue('MockBrowser'),
  close: vi.fn().mockResolvedValue(undefined),
};
vi.mock('playwright', () => ({
  chromium: {
    launch: vi.fn(() => mockBrowser),
  },
}));

const mockPreviewServer = {
  stop: vi.fn(),
};
vi.mock('astro', () => ({
  preview: vi.fn(() => {
    return Promise.resolve(mockPreviewServer);
  }),
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
      const { mkdir, writeFile } = await import('node:fs/promises');
      const { chromium } = await import('playwright');
      const { printHtmlToPdf } = await import('../util/print-html-to-pdf.ts');
      const { getPrintDistDir } = await import('../util/get-print-dist-dir.ts');
      const { preview } = await import('astro');

      await printPdfsImpl(
        new URL('file://myMaschine/dist'),
        mockLogger as unknown as AstroIntegrationLogger,
        pages,
      );

      expect(getPrintDistDir).toHaveBeenCalledWith('/dist');
      expect(mkdir).toHaveBeenCalledWith('/dist/print', {
        recursive: true,
      });
      expect(preview).toHaveBeenCalled();
      expect(chromium.launch).toHaveBeenCalledTimes(1);
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
      expect(mockPreviewServer.stop).toHaveBeenCalledTimes(1);
    });

    it('should close down on errors', async () => {
      const pages = [{ pathname: 'internal-print/page1' }];
      const { printHtmlToPdf } = await import('../util/print-html-to-pdf.ts');
      vi.mocked(printHtmlToPdf).mockRejectedValue(
        new Error('PDF generation failed'),
      );

      await expect(
        printPdfsImpl(
          new URL('file://myMaschine/dist'),
          mockLogger as unknown as AstroIntegrationLogger,
          pages,
        ),
      ).rejects.toThrow('PDF generation failed');

      expect(mockBrowser.close).toHaveBeenCalledTimes(1);
      expect(mockPreviewServer.stop).toHaveBeenCalledTimes(1);
    });
  });
});
