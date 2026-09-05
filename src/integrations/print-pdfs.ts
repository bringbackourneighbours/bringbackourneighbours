import {
  type AstroIntegration,
  type AstroIntegrationLogger,
  preview,
  type PreviewServer,
} from 'astro';
import { mkdir, writeFile } from 'node:fs/promises';
import { type Browser, chromium } from 'playwright';

import { previewUrl } from '../model/site';
import { printHtmlToPdf } from '../util/print-html-to-pdf';
import { getPrintDistDir } from '../util/get-print-dist-dir';

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
  const previewServer = await preview({});
  logger.debug(
    `Launched Preview Process ${previewServer.host}:${previewServer.port}`,
  );

  const browser = await chromium.launch({ headless: true });
  logger.debug(`Launched chromium Browser ${browser.version()}`);

  try {
    const printJobs = pages
      .filter((page) => page.pathname.startsWith('internal-print'))
      .map(async (htmlPage) => {
        const pdfOutputFilename = `${htmlPage.pathname.replace('internal-print/', '').replace('/', '.pdf')}`;
        const pdfOutputPath = `${pdfDistDir}/${pdfOutputFilename}`;
        const pageUrl = `${previewUrl}/${htmlPage.pathname}`;
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
    await closePreviewAndBrowser(logger, browser, previewServer);
    throw error;
  }

  await closePreviewAndBrowser(logger, browser, previewServer);
}

async function closePreviewAndBrowser(
  logger: AstroIntegrationLogger,
  browser: Browser,
  previewServer: PreviewServer,
) {
  await browser.close();
  logger.debug('Closed chromium Browser.');

  await previewServer.stop();
  logger.debug('Closed Preview Server.');
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
