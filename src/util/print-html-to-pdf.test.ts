import { beforeEach, describe, expect, it, vi } from 'vitest';
import { printHtmlToPdf } from './print-html-to-pdf.ts';
import { type Browser, chromium } from 'playwright';

// Mock for playwright
const mockPage = {
  goto: vi.fn(),
  pdf: vi.fn().mockResolvedValue(Buffer.from('PDF Buffer')),
};
const mockBrowser = {
  newPage: vi.fn().mockResolvedValue(mockPage),
  close: vi.fn().mockResolvedValue(undefined),
};
vi.mock('playwright', () => ({
  chromium: {
    launch: vi.fn(() => mockBrowser),
  },
}));
describe('printHtmlToPdf', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should goto the page add turn pdf as buffer', async () => {
    const pdfBuffer = await printHtmlToPdf(
      'http://localhost:4321/internal-print/flyer1',
    );
    expect(mockBrowser.newPage).toHaveBeenCalledTimes(1);
    expect(mockPage.goto).toHaveBeenCalledWith(
      'http://localhost:4321/internal-print/flyer1',
    );
    expect(mockPage.pdf).toHaveBeenCalledWith({
      printBackground: true,
      preferCSSPageSize: true,
    });
    expect(pdfBuffer).toBeInstanceOf(Uint8Array);
    expect(pdfBuffer.length).toBeGreaterThan(0);
  });

  it('should open and close a browse', async () => {
    await printHtmlToPdf('http://localhost:4321/internal-print/flyer1');
    expect(chromium.launch).toHaveBeenCalledTimes(1);
    expect(mockBrowser.close).toHaveBeenCalledTimes(1);
  });

  it('should goto the page add turn pdf as buffer', async () => {
    await printHtmlToPdf(
      'http://localhost:4321/internal-print/flyer1',
      mockBrowser as unknown as Browser,
    );
    expect(chromium.launch).not.toHaveBeenCalled();
    expect(mockBrowser.close).not.toHaveBeenCalled();
  });
});
