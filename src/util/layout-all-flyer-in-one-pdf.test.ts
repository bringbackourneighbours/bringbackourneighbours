import { describe, expect, it } from 'vitest';
import { layoutAllFlyerInOnePdf } from './layout-all-flyer-in-one-pdf.ts';
import { PDFParse } from 'pdf-parse';
import { PageSizes, PDFDocument } from 'pdf-lib';

describe('layoutAllFlyerInOnePdf', () => {
  async function getPageText(
    pdfDocument: PDFDocument,
    pageIndex: number,
  ): Promise<string> {
    const pdfFile = await pdfDocument.save();
    const parser = new PDFParse({ data: pdfFile });
    const textResult = await parser.getText();

    await parser.destroy();

    return textResult.pages[pageIndex].text;
  }

  it('should merge the a6 pages in one pdf document', async () => {
    const joinPdfDocument = await layoutAllFlyerInOnePdf([
      './src/testing/__mocks__/flyer-en-a-a6-4pages.pdf',
      './src/testing/__mocks__/flyer-en-b-a6-4pages.pdf',
    ]);

    const pageOne = await getPageText(joinPdfDocument, 0);
    const pageTwo = await getPageText(joinPdfDocument, 1);

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

  it('should merge the a6 pages in one pdf document', async () => {
    const joinPdfDocument = await layoutAllFlyerInOnePdf([
      './src/testing/__mocks__/flyer-ar-a-a6-4pages.pdf',
      './src/testing/__mocks__/flyer-ar-b-a6-4pages.pdf',
    ]);
    const pageOne = await getPageText(joinPdfDocument, 0);
    const pageTwo = await getPageText(joinPdfDocument, 1);

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
