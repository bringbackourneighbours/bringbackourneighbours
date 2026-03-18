import { type AstroIntegration } from 'astro';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

import { getPdfFileNames } from '../util/get-flyer-pdf-file-names.ts';

const A7_ON_A4_PAGE_COUNT = 8;

export default function checkZines(): AstroIntegration {
  return {
    name: 'check-zines',
    hooks: {
      'astro:build:done': async ({ dir, logger }): Promise<void> => {
        logger.info('Checking each flyer for the correct page count');

        const zineFileNames = await getPdfFileNames(dir.pathname, 'zine');
        let hasNotCorrectPageCount = false;

        for (const fileName of zineFileNames) {
          const zinePath = `${dir.pathname}print/${fileName}`;
          logger.debug(`Checking zine ${zinePath}`);
          const fileBuffer = fs.readFileSync(zinePath);
          const pdfDoc = await PDFDocument.load(new Uint8Array(fileBuffer));
          const pagesCount = pdfDoc.getPageCount();

          if (pagesCount != A7_ON_A4_PAGE_COUNT) {
            logger.error(`${fileName}: ${pagesCount} pages`);
            hasNotCorrectPageCount = true;
          } else {
            logger.debug(`${fileName}: ${pagesCount} pages`);
          }
        }

        if (hasNotCorrectPageCount) {
          throw new Error(
            `Some of the zine pdf did not produce ${A7_ON_A4_PAGE_COUNT} pages. See log messages above.`,
          );
        }
        logger.info('All Zines fit in the printable page range.');
      },
    },
  };
}
