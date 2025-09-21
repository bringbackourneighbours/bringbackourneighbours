import { type AstroIntegration } from 'astro';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

import { getFlyerPdfFileNames } from '../util/get-flyer-pdf-file-names.ts';

const A6_ON_A4_PAGE_COUNT = 4;

export default function checkFlyers(): AstroIntegration {
  return {
    name: 'check-flyers',
    hooks: {
      'astro:build:done': async ({ dir, logger }): Promise<void> => {
        logger.info('Checking each flyer for the correct page count');

        const flyerFileNames = await getFlyerPdfFileNames(dir.pathname);
        let hasNotCorrectPageCount = false;

        for (const fileName of flyerFileNames) {
          const flyerPath = `${dir.pathname}print/${fileName}`;
          logger.debug(`Checking flyer ${flyerPath}`);
          const fileBuffer = fs.readFileSync(flyerPath);
          const pdfDoc = await PDFDocument.load(new Uint8Array(fileBuffer));
          const pagesCount = pdfDoc.getPageCount();

          if (pagesCount != A6_ON_A4_PAGE_COUNT) {
            logger.error(`${fileName}: ${pagesCount} pages`);
            hasNotCorrectPageCount = true;
          } else {
            logger.debug(`${fileName}: ${pagesCount} pages`);
          }
        }

        if (hasNotCorrectPageCount) {
          throw new Error(
            `Some of the flyers pdf did not produce ${A6_ON_A4_PAGE_COUNT} pages. See log messages above.`,
          );
        }
        logger.info('All flyers fit in the printable page range.');
      },
    },
  };
}
