import { type AstroIntegration, type AstroIntegrationLogger } from 'astro';
import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer, { Browser } from 'puppeteer';
import { ChildProcess, exec } from 'node:child_process';

import { previewUrl } from '../../astro.config.mjs';

import { printHtmlToPdf } from '../util/print-html-to-pdf.ts';

import { getPrintDistDir } from '../util/get-print-dist-dir.ts';

export async function printPdfsImpl(
  distDirUrl: URL,
  logger: AstroIntegrationLogger,
  pages: {
    pathname: string;
  }[],
): Promise<void> {
  const pdfDistDir = getPrintDistDir(distDirUrl.pathname);
  logger.info(`Printing all the pages to ${pdfDistDir} as PDF`);

  await mkdir(pdfDistDir, { recursive: true });

  // TODO: there is a new api for it https://docs.astro.build/en/reference/programmatic-reference/#preview
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

  try {
    const printJobs = pages
      .filter((page) => page.pathname.startsWith('internal-print'))
      .map(async (htmlPage) => {
        const pdfOutputFilename = `${htmlPage.pathname.replace('internal-print/', '').replace('/', '.pdf')}`;
        const pdfOutputPath = `${pdfDistDir}/${pdfOutputFilename}`;
        const pageUrl = `${previewUrl}${htmlPage.pathname}`;
        logger.debug(`Printing ${pageUrl}`);
        const pdfBuffer = await printHtmlToPdf(pageUrl, browser);

        await writeFile(pdfOutputPath, pdfBuffer);
        logger.debug(`Printed ${pdfOutputFilename}`);
        return;
      });
    // we try to print all the pdf in parallel, as this is at least 5 times faster
    await Promise.all(printJobs);

    logger.info(`Printed ${printJobs.length} PDFs to ${pdfDistDir}`);
  } catch (error) {
    logger.error(`Failed to print PDFs with error ${error}`);
    await closePreviewAndBrowser(logger, browser, previewProcess);
    throw error;
  }

  await closePreviewAndBrowser(logger, browser, previewProcess);
}

async function closePreviewAndBrowser(
  logger: AstroIntegrationLogger,
  browser: Browser,
  previewProcess: ChildProcess,
) {
  await browser.close();
  logger.debug('Closed puppeteer Browser.');
  previewProcess.kill();
  logger.debug('Closed Preview Process.');
}

/**
 * An Astro integration that prints all pages `dist/internal-print` to PDF after the build is done.
 */
export default function printPdfs(): AstroIntegration {
  return {
    name: 'print-pdfs',
    hooks: {
      'astro:build:done': async ({ dir, pages, logger }): Promise<void> => {
        await printPdfsImpl(dir, logger, pages);
      },
    },
  };
}
