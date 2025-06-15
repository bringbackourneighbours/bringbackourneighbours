import { type AstroIntegration } from 'astro';
import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';

import { printHtmlToPdf } from '../util/print-html-to-pdf.ts';

// this actually works, but it was more partically to implement this as an endpoint... becuase we can use that in dev mode as well
export default function printPdfs(): AstroIntegration {
  return {
    name: 'print-pdfs',
    hooks: {
      'astro:build:done': async ({ dir, pages, logger }): Promise<void> => {
        const pdfDistDir = `${dir.pathname}print`;
        logger.info(`Printing all the pages to ${pdfDistDir} as PDF`);

        await mkdir(pdfDistDir, { recursive: true });

        const browser = await puppeteer.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        logger.debug(`Launched puppeteer Browser ${await browser.version()}`);

        const printJobs = pages
          .filter((page) => page.pathname.startsWith('internal-print'))
          .map(async (htmlPage) => {
            const pdfOutputFilename = `${htmlPage.pathname.replace('internal-print/', '').replace('/', '.pdf')}`;
            const pdfOutputPath = `${pdfDistDir}/${pdfOutputFilename}`;

            logger.debug(`Printing ${htmlPage.pathname}`);

            const pdfBuffer = await printHtmlToPdf(htmlPage.pathname, browser);

            await writeFile(pdfOutputPath, pdfBuffer);
            logger.info(`Printed ${pdfOutputFilename}`);
            return;
          });

        // we try to print all the pdf in parallel, as this is at least 5 times faster
        await Promise.all(printJobs);

        await browser.close();
        logger.debug('Closed puppeteer Browser.');
      },
    },
  };
}
