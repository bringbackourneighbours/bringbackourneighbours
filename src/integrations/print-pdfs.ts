import { type AstroIntegration } from 'astro';
import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';
import { exec } from 'node:child_process';

import { printHtmlToPdf } from '../util/print-html-to-pdf.ts';
import { getPrintDistDir } from '../util/layout-all-flyer-in-one-pdf.ts';

// this actually works, but it was more partically to implement this as an endpoint... becuase we can use that in dev mode as well
export default function printPdfs(): AstroIntegration {
  return {
    name: 'print-pdfs',
    hooks: {
      'astro:build:done': async ({ dir, pages, logger }): Promise<void> => {
        const pdfDistDir = getPrintDistDir(dir.pathname);
        logger.info(`Printing all the pages to ${pdfDistDir} as PDF`);

        await mkdir(pdfDistDir, { recursive: true });

        const previewProcess = exec('npm run preview');
        previewProcess.on('error', (error) => {
          logger.debug(`Preview Process error with ${error}`);
        });
        previewProcess.on('close', (code) => {
          logger.debug(`Preview Process exited with code ${code}`);
        });
        logger.debug(`Launched Preview Process ${previewProcess.pid}`);

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
            logger.debug(`Printed ${pdfOutputFilename}`);
            return;
          });

        // we try to print all the pdf in parallel, as this is at least 5 times faster
        await Promise.all(printJobs);

        logger.info(`Printed Flyers`);

        await browser.close();
        logger.debug('Closed puppeteer Browser.');
        previewProcess.kill();
        logger.debug('Closed Preview Process.');
      },
    },
  };
}
