import { type AstroIntegration } from 'astro';
import { writeFile, mkdir } from 'node:fs/promises';
import { printHtmlToBuffer } from '../util/print-html-to-buffer.ts';

// this actually works, but it was more partically to implement this as an endpoint... becuase we can use that in dev mode as well
export default function printPdfs(): AstroIntegration {
  return {
    name: 'print-pdfs',
    hooks: {
      'astro:build:done': async ({ dir, pages, logger }): Promise<void> => {
        const pdfDistDir = `${dir.pathname}pdfs`;
        logger.info(`printing the flyers to ${pdfDistDir} `);

        await mkdir(pdfDistDir, { recursive: true });

        for (const htmlPage of pages.filter((page) =>
          page.pathname.startsWith('internal-print'),
        )) {
          const htmlTemplatePath = `${dir.pathname}${htmlPage.pathname}/index.html`;
          const pdfOutputPath = `${dir.pathname}pdfs/${htmlPage.pathname.replace('internal-print/', '').replace('/', '.pdf')}`;

          logger.info(`printing from ${htmlTemplatePath} to ${pdfOutputPath}`);

          const pdfBuffer = await printHtmlToBuffer(htmlPage.pathname);

          await writeFile(pdfOutputPath, pdfBuffer);
        }
      },
    },
  };
}
