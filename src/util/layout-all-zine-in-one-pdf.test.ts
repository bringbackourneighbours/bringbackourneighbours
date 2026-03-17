import { describe, expect, it } from 'vitest';
import { PageSizes } from 'pdf-lib';
import { layoutAllZineInOnePdf } from './layout-all-zine-in-one-pdf.ts';
import { getPdfPageText } from '../testing/get-pdf-page-text.ts';

describe('layoutAllZineInOnePdf', () => {
  it('should merge the rtl a7 pages in one pdf document', async () => {
    const joinPdfDocument = await layoutAllZineInOnePdf([
      './src/testing/__mocks__/zine-en-a-a7-8pages.pdf',
      './src/testing/__mocks__/zine-en-b-a7-8pages.pdf',
    ]);

    const pageOne = await getPdfPageText(joinPdfDocument, 0);
    const pageTwo = await getPdfPageText(joinPdfDocument, 1);

    expect(joinPdfDocument.getPageCount()).toBe(2);
    expect(joinPdfDocument.getPage(0).getWidth()).toBe(PageSizes.A4[0]);
    expect(joinPdfDocument.getPage(0).getHeight()).toBe(PageSizes.A4[1]);
    expect(pageOne).toContain('1 English A');
    expect(pageOne).toContain('2 English A');
    expect(pageOne).toContain('3 English A');
    expect(pageOne).toContain('4 English A');
    expect(pageOne).toContain('5 English A');
    expect(pageOne).toContain('6 English A');
    expect(pageOne).toContain('7 English A');
    expect(pageOne).toContain('8 English A');
    expect(pageTwo).toContain('1 English B');
    expect(pageTwo).toContain('2 English B');
    expect(pageTwo).toContain('3 English B');
    expect(pageTwo).toContain('4 English B');
    expect(pageTwo).toContain('5 English B');
    expect(pageTwo).toContain('6 English B');
    expect(pageTwo).toContain('7 English B');
    expect(pageTwo).toContain('8 English B');
  });

  it('should merge the ltr a7 pages in one pdf document', async () => {
    const joinPdfDocument = await layoutAllZineInOnePdf([
      './src/testing/__mocks__/zine-fa-a-a7-8pages.pdf',
      './src/testing/__mocks__/zine-fa-b-a7-8pages.pdf',
    ]);
    const pageOne = await getPdfPageText(joinPdfDocument, 0);
    const pageTwo = await getPdfPageText(joinPdfDocument, 1);

    expect(joinPdfDocument.getPageCount()).toBe(2);
    expect(joinPdfDocument.getPage(0).getWidth()).toBe(PageSizes.A4[0]);
    expect(joinPdfDocument.getPage(0).getHeight()).toBe(PageSizes.A4[1]);
    expect(pageOne).toContain('1 Farsi A');
    expect(pageOne).toContain('2 Farsi A');
    expect(pageOne).toContain('3 Farsi A');
    expect(pageOne).toContain('4 Farsi A');
    expect(pageOne).toContain('5 Farsi A');
    expect(pageOne).toContain('6 Farsi A');
    expect(pageOne).toContain('7 Farsi A');
    expect(pageOne).toContain('8 Farsi A');
    expect(pageTwo).toContain('1 Farsi B');
    expect(pageTwo).toContain('2 Farsi B');
    expect(pageTwo).toContain('3 Farsi B');
    expect(pageTwo).toContain('4 Farsi B');
    expect(pageTwo).toContain('5 Farsi B');
    expect(pageTwo).toContain('6 Farsi B');
    expect(pageTwo).toContain('7 Farsi B');
    expect(pageTwo).toContain('8 Farsi B');
  });
});
