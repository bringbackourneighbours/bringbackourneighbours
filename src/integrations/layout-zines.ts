import { type AstroIntegration } from 'astro';
import { writeFile } from 'node:fs/promises';

import { layoutAllZineInOnePdf } from '../util/layout-all-zine-in-one-pdf.ts';
import { SupportedLanguages } from '../model/languages.ts';
import { getPrintDistDir } from '../util/get-print-dist-dir.ts';
import { getPdfFileNames } from '../util/get-flyer-pdf-file-names.ts';

export default function layoutZines(): AstroIntegration {
  return {
    name: 'layout-zines',
    hooks: {
      'astro:build:done': async ({ dir, logger }): Promise<void> => {
        logger.info('Layouting all zines in one PDF per language');

        const pdfDir = getPrintDistDir(dir.pathname);

        const zineFileNames = await getPdfFileNames(dir.pathname, 'zine');

        // we provide one pdf per language and additionally one that will contain all languages
        for (const lang of [...SupportedLanguages, 'all']) {
          logger.info(`Processing language ${lang}`);

          const allZinePathsInLang = zineFileNames
            .filter((fileName) => {
              const regex =
                lang === 'all'
                  ? new RegExp(`zine-`)
                  : new RegExp(`zine-${lang}`);
              return regex.test(fileName);
            })
            .map((fileName) => `${pdfDir}/${fileName}`);

          logger.debug(`For language ${lang} found ${allZinePathsInLang}`);
          const pdfBuffer = await layoutAllZineInOnePdf(allZinePathsInLang);

          const outputPath = `${pdfDir}/all-zine-${lang}.pdf`;
          await writeFile(outputPath, pdfBuffer);
          logger.info(`Saved a layouted PDF under ${outputPath}`);
        }
      },
    },
  };
}
