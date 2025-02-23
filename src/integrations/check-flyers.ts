import { type AstroIntegration } from 'astro';
import { readdir } from 'node:fs/promises';
import muhammara from 'muhammara';

export default function checkFlyers(): AstroIntegration {
  return {
    name: 'check-flyers',
    hooks: {
      'astro:build:done': async ({ dir, logger }): Promise<void> => {
        logger.info('Checking each flyer for the right page count');

        const pdfDistDir = `${dir.pathname}print`;
        const pdfsFileNames = await readdir(pdfDistDir);

        pdfsFileNames
          .filter((fileName) => {
            logger.debug(`Checking if ${fileName} is a flyer`);
            return fileName.startsWith('flyer');
          })
          .forEach((fileName) => {
            const pdfReader = muhammara.createReader(
              `${pdfDistDir}/${fileName}`,
            );
            const pagesCount = pdfReader.getPagesCount();

            if (pagesCount > 4) {
              logger.error(`${fileName}: ${pagesCount} pages`);
            } else {
              logger.info(`${fileName}: ${pagesCount} pages`);
            }
          });
      },
    },
  };
}
