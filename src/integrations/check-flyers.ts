import { type AstroIntegration } from 'astro';
import { readdir } from 'node:fs/promises';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

export default function checkFlyers(): AstroIntegration {
  return {
    name: 'check-flyers',
    hooks: {
      'astro:build:done': async ({ dir, logger }): Promise<void> => {
        logger.info('Checking each flyer for the right page count');

        const pdfDistDir = `${dir.pathname}print`;
        const pdfsFileNames = await readdir(pdfDistDir);

        let hasOverprinting = false;

        for (const fileName1 of pdfsFileNames.filter((fileName) => {
          logger.debug(`MUHA Checking if ${fileName} is a flyer`);
          return fileName.startsWith('flyer');
        })) {
          const fileBuffer = fs.readFileSync(`${pdfDistDir}/${fileName1}`);
          const pdfDoc = await PDFDocument.load(new Uint8Array(fileBuffer));
          const pagesCount = pdfDoc.getPageCount();

          if (pagesCount > 4) {
            logger.error(`${fileName1}: ${pagesCount} pages`);
            hasOverprinting = true;
          } else {
            logger.info(`${fileName1}: ${pagesCount} pages`);
          }
        }

        if (hasOverprinting) {
          throw new Error(
            'One of the flyers pdf had more than 4 pages. See log messages above.',
          );
        }
        logger.info('No overprinting detected.');
      },
    },
  };
}
