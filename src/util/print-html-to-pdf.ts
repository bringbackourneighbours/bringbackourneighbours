import { type Browser, chromium } from 'playwright';

const EMPTY_TEMPLATE = '<span></span>';

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

  let footerTemplate = EMPTY_TEMPLATE;

  // the page migth contain a template for the footer
  const footerLocator = page.locator('template#footerTemplate');
  if ((await footerLocator.count()) > 0) {
    const computedStylesVars = await page.locator('body').evaluate((body) => {
      const computedStyles = window.getComputedStyle(body);

      return {
        '--bbon-size-p': computedStyles.getPropertyValue('--bbon-size-p'),
        '--bbon-color-primary': computedStyles.getPropertyValue(
          '--bbon-color-primary',
        ),
      };
    });

    // we cannot use any real css with the footer template, as it will only be evaluated as string, so we have to replace css var with the right values.
    footerTemplate = (await footerLocator.innerHTML())
      .replace('var(--bbon-size-p)', computedStylesVars['--bbon-size-p'])
      .replace(
        'var(--bbon-color-primary)',
        computedStylesVars['--bbon-color-primary'],
      );
  }

  const pdfBuffer = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: EMPTY_TEMPLATE,
    footerTemplate: footerTemplate,
  });

  if (!browserToReuse) {
    await browser.close();
  }

  return pdfBuffer;
};
