import { type AstroIntegration } from 'astro';
import { readdir } from 'node:fs/promises';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

const A6_ON_A4_PAGE_COUNT = 4;

export default function checkFlyers(): AstroIntegration {
  return {
    name: 'check-flyers',
    hooks: {
      'astro:build:done': async ({ dir, logger }): Promise<void> => {
        logger.info('Checking each flyer for the right page count');

        const pdfDistDir = `${dir.pathname}print`;
        const pdfsFileNames = await readdir(pdfDistDir);

        let hasCorrectPageCount = false;

        for (const fileName of pdfsFileNames.filter((fileName) => {
          logger.debug(`Checking if ${fileName} is a flyer`);
          return fileName.startsWith('flyer');
        })) {
          const fileBuffer = fs.readFileSync(`${pdfDistDir}/${fileName}`);
          const pdfDoc = await PDFDocument.load(new Uint8Array(fileBuffer));
          const pagesCount = pdfDoc.getPageCount();

          if (pagesCount != A6_ON_A4_PAGE_COUNT) {
            logger.error(`${fileName}: ${pagesCount} pages`);
            hasCorrectPageCount = true;
          } else {
            logger.info(`${fileName}: ${pagesCount} pages`);
          }
        }

        if (hasCorrectPageCount) {
          throw new Error(
            `Some of the flyers pdf did not produce ${A6_ON_A4_PAGE_COUNT} pages. See log messages above.`,
          );
        }
        logger.info('All flyers fit in the printable page range.');
      },
    },
  };
}
