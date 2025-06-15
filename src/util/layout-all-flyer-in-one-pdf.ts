import { PageSizes, PDFDocument, PDFPage } from 'pdf-lib';
import fs from 'fs';
import { chunks } from './list-helper.ts';

export const getFlyerPdfPath = (
  distDir: string,
  identifier: string,
  lang: string,
): string => {
  return `${distDir}/print/flyer-${lang}-${identifier}.pdf`;
};

const placeFlyerOnPages = async (
  pdfDoc: PDFDocument,
  frontPage: PDFPage,
  backPage: PDFPage,
  flyerPdfPath: string,
  asTop: boolean,
): Promise<void> => {
  const buffer = fs.readFileSync(flyerPdfPath);

  const flyerDoc = await PDFDocument.load(new Uint8Array(buffer));

  const [firstPage, secondPage, thirdPage, fourthPage] = await pdfDoc.embedPdf(
    flyerDoc,
    [0, 1, 2, 3],
  );

  frontPage.drawPage(firstPage, {
    x: firstPage.width,
    y: asTop ? firstPage.height : 0,
    xScale: 1,
    yScale: 1,
  });
  backPage.drawPage(secondPage, {
    x: 0,
    y: asTop ? firstPage.height : 0,
    xScale: 1,
    yScale: 1,
  });
  backPage.drawPage(thirdPage, {
    x: thirdPage.width,
    y: asTop ? firstPage.height : 0,
    xScale: 1,
    yScale: 1,
  });
  frontPage.drawPage(fourthPage, {
    x: 0,
    y: asTop ? firstPage.height : 0,
    xScale: 1,
    yScale: 1,
  });
};

export async function layoutAllFlyerInOnePdf(
  flyersPaths: string[],
): Promise<Uint8Array> {
  const newPdf = await PDFDocument.create();

  for (const [topPath, bottomPath] of [...chunks(flyersPaths, 2)]) {
    const frontPage = newPdf.addPage(PageSizes.A4);
    const backPage = newPdf.addPage(PageSizes.A4);

    if (topPath) {
      await placeFlyerOnPages(newPdf, frontPage, backPage, topPath, true);
    }
    if (bottomPath) {
      await placeFlyerOnPages(newPdf, frontPage, backPage, bottomPath, false);
    }
  }

  return await newPdf.save();
}
