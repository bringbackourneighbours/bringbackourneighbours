import { describe, expect, it } from 'vitest';
import { layoutAllFlyerInOnePdf } from './layout-all-flyer-in-one-pdf.ts';
import { PageSizes } from 'pdf-lib';
import { getPdfPageText } from '../testing/get-pdf-page-text.ts';

describe('layoutAllFlyerInOnePdf', () => {
  it('should merge the ltr a6 pages in one pdf document', async () => {
    const joinPdfDocument = await layoutAllFlyerInOnePdf([
      './src/testing/__mocks__/flyer-en-a-a6-4pages.pdf',
      './src/testing/__mocks__/flyer-en-b-a6-4pages.pdf',
    ]);

    const pageOne = await getPdfPageText(joinPdfDocument, 0);
    const pageTwo = await getPdfPageText(joinPdfDocument, 1);

    expect(joinPdfDocument.getPageCount()).toBe(2);
    expect(joinPdfDocument.getPage(0).getWidth()).toBe(PageSizes.A4[0]);
    expect(joinPdfDocument.getPage(0).getHeight()).toBe(PageSizes.A4[1]);
    expect(pageOne).toContain('1 English A');
    expect(pageOne).toContain('4 English A');
    expect(pageOne).toContain('1 English B');
    expect(pageOne).toContain('4 English B');
    expect(pageTwo).toContain('2 English A');
    expect(pageTwo).toContain('3 English A');
    expect(pageTwo).toContain('2 English B');
    expect(pageTwo).toContain('3 English B');
  });

  it('should merge the rtl a6 pages in one pdf document', async () => {
    const joinPdfDocument = await layoutAllFlyerInOnePdf([
      './src/testing/__mocks__/flyer-ar-a-a6-4pages.pdf',
      './src/testing/__mocks__/flyer-ar-b-a6-4pages.pdf',
    ]);
    const pageOne = await getPdfPageText(joinPdfDocument, 0);
    const pageTwo = await getPdfPageText(joinPdfDocument, 1);

    expect(joinPdfDocument.getPageCount()).toBe(2);
    expect(joinPdfDocument.getPage(0).getWidth()).toBe(PageSizes.A4[0]);
    expect(joinPdfDocument.getPage(0).getHeight()).toBe(PageSizes.A4[1]);
    expect(pageOne).toContain('1 Arabic A');
    expect(pageOne).toContain('4 Arabic A');
    expect(pageOne).toContain('1 Arabic B');
    expect(pageOne).toContain('4 Arabic B');
    expect(pageTwo).toContain('2 Arabic A');
    expect(pageTwo).toContain('3 Arabic A');
    expect(pageTwo).toContain('2 Arabic B');
    expect(pageTwo).toContain('3 Arabic B');
  });
});
