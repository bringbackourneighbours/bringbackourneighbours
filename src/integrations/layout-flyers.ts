import { type AstroIntegration } from 'astro';
import {
  getFlyerPdfFileNames,
  getPrintDistDir,
  layoutAllFlyerInOnePdf,
} from '../util/layout-all-flyer-in-one-pdf.ts';
import { SupportedLanguages } from '../util/languages.ts';
import { writeFile } from 'node:fs/promises';

export default function layoutFlyers(): AstroIntegration {
  return {
    name: 'layout-flyers',
    hooks: {
      'astro:build:done': async ({ dir, logger }): Promise<void> => {
        logger.info('Layouting all flyer in one PDF per language');

        const pdfDir = getPrintDistDir(dir.pathname);

        const flyerFileNames = await getFlyerPdfFileNames(dir.pathname);

        for (const lang of SupportedLanguages) {
          logger.info(`Processing language ${lang}`);

          const allFlyerPathsInLang = flyerFileNames
            .filter((fileName) => {
              const regex = new RegExp(`flyer-${lang}-.*`);

              return regex.test(fileName);
            })
            .map((fileName) => `${pdfDir}/${fileName}`);

          const pdfBuffer = await layoutAllFlyerInOnePdf(allFlyerPathsInLang);

          const outputPath = `${pdfDir}/all-flyer-${lang}.pdf`;
          await writeFile(outputPath, pdfBuffer);
          logger.debug(`Saved a layouted PDF under ${outputPath}`);
        }
      },
    },
  };
}
