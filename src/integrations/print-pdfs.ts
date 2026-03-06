import { type AstroIntegration, type AstroIntegrationLogger } from 'astro';
import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer, { Browser } from 'puppeteer';
import { ChildProcess, exec } from 'node:child_process';

import { previewUrl } from '../../astro.config.mjs';

import { printHtmlToPdf } from '../util/print-html-to-pdf.ts';

import { getPrintDistDir } from '../util/get-print-dist-dir.ts';

const KILL_PREVIEW_PROCESS_TIMEOUT = 5000;

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
  // weirdly it doesnt work. something with the adapter i guess.
  const previewProcess = exec('npm run preview');
  previewProcess.on('error', (error) => {
    logger.error(`Preview Process error with ${error}`);
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

  await new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      // looks like this happens in the CI sometimes.
      logger.error(
        `
        Preview Process closing timed out. Will just go ahead.
        There might a rogue preview process with PID ${previewProcess.pid} running now, you might want to check and kill it manually.`,
      );
      resolve();
    }, KILL_PREVIEW_PROCESS_TIMEOUT);

    previewProcess.on('close', (code) => {
      logger.debug(`Preview Process closed with code ${code}`);
      resolve();
    });
    previewProcess.on('error', (error) => {
      logger.error(`Preview Process errored while closing with ${error}`);
      reject(error);
    });
    previewProcess.kill();
  });

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
