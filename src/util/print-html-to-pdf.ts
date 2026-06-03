import { type Browser, chromium } from 'playwright';

/**
 * Prints the given HTML page to a PDF buffer.
 * @param pageUrl The URL of the HTML page to print.
 * @param browserToReuse An optional playwright browser instance to reuse.
 * @returns A promise that resolves to a Uint8Array containing the PDF data.
 */
export const printHtmlToPdf = async (
  pageUrl: string,
  browserToReuse?: Browser,
): Promise<Uint8Array> => {
  // when printing en masse we don't want to set up and tear the browsers for each page
  const browser = browserToReuse ?? (await chromium.launch({ headless: true }));
  const page = await browser.newPage();

  await page.goto(pageUrl);

  const pdfBuffer = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
  });

  if (!browserToReuse) {
    await browser.close();
  }

  return pdfBuffer;
};
