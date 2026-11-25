import { type AstroIntegration } from 'astro';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

import { getPdfFileNames } from '../util/get-flyer-pdf-file-names';

export default function checkPdfPages(
  collection: 'flyer' | 'zine' | 'kit',
  expectedPageCount: number,
  mode: 'min' | 'exact' | 'max' = 'exact',
): AstroIntegration {
  return {
    name: 'check-pdf-pages',
    hooks: {
      'astro:build:done': async ({ dir, logger }): Promise<void> => {
        logger.info(`Checking each ${collection} for the correct page count`);

        const flyerFileNames = await getPdfFileNames(dir.pathname, collection);
        let hasNotCorrectPageCount = false;

        for (const fileName of flyerFileNames) {
          const flyerPath = `${dir.pathname}print/${fileName}`;
          logger.debug(`Checking flyer ${flyerPath}`);
          const fileBuffer = fs.readFileSync(flyerPath);
          const pdfDoc = await PDFDocument.load(new Uint8Array(fileBuffer));
          const pagesCount = pdfDoc.getPageCount();

          if (
            (mode === 'exact' && pagesCount != expectedPageCount) ||
            (mode === 'min' && pagesCount < expectedPageCount) ||
            (mode === 'max' && pagesCount > expectedPageCount)
          ) {
            logger.error(`${fileName}: ${pagesCount} pages`);
            hasNotCorrectPageCount = true;
          } else {
            logger.debug(`${fileName}: ${pagesCount} pages`);
          }
        }

        if (hasNotCorrectPageCount) {
          throw new Error(
            `Some of the ${collection} pdf did not produce ${mode} ${expectedPageCount} pages. See log messages above.`,
          );
        }
        logger.info(`All ${collection} fit in the printable page range.`);
      },
    },
  };
}
