import { PageSizes, PDFDocument, PDFPage } from 'pdf-lib';
import fs from 'fs';
import { chunks } from './list-helper.ts';
import { readdir } from 'node:fs/promises';
import { RTL_LANGUAGES } from '../model/languages.ts';

export const getPrintDistDir = (distDir: string): string => {
  return `${distDir.endsWith('/') ? distDir.slice(0, -1) : distDir}/print`;
};

export const getFlyerPdfFileNames = async (
  distDir: string,
): Promise<string[]> => {
  const pdfsFileNames = await readdir(getPrintDistDir(distDir));

  return pdfsFileNames.filter((fileName) => {
    return fileName.startsWith('flyer-');
  });
};

const placeFlyerOnPages = async (
  pdfDoc: PDFDocument,
  frontPage: PDFPage,
  backPage: PDFPage,
  flyerPdfPath: string,
  asTop: boolean,
): Promise<void> => {
  const directionRegEx = new RegExp(`flyer-(${RTL_LANGUAGES.join('|')})-`);
  const isRtlLang = directionRegEx.test(flyerPdfPath);

  const buffer = fs.readFileSync(flyerPdfPath);
  const flyerDoc = await PDFDocument.load(new Uint8Array(buffer));

  const [firstPage, secondPage, thirdPage, fourthPage] = await pdfDoc.embedPdf(
    flyerDoc,
    [0, 1, 2, 3],
  );

  frontPage.drawPage(firstPage, {
    x: isRtlLang ? 0 : firstPage.width,
    y: asTop ? firstPage.height : 0,
    xScale: 1,
    yScale: 1,
  });
  backPage.drawPage(secondPage, {
    x: isRtlLang ? secondPage.width : 0,
    y: asTop ? secondPage.height : 0,
    xScale: 1,
    yScale: 1,
  });
  backPage.drawPage(thirdPage, {
    x: isRtlLang ? 0 : thirdPage.width,
    y: asTop ? thirdPage.height : 0,
    xScale: 1,
    yScale: 1,
  });
  frontPage.drawPage(fourthPage, {
    x: isRtlLang ? secondPage.width : 0,
    y: asTop ? fourthPage.height : 0,
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
