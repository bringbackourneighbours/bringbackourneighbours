import puppeteer from 'puppeteer';
import fs from 'fs';
import AstroConfig from '../../astro.config.mjs';

export const printHtmlToBuffer = async (
  pagePath: string,
): Promise<Uint8Array> => {
  const isDev = import.meta.env.DEV;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  if (isDev) {
    // we will use the fresh page in Dev Mode
    await page.goto(`${AstroConfig.site!}${pagePath}`);
  } else {
    // we will not get the global stylesheets without loading them first.
    // so we visit the production page once and then the css is already loaded
    // alternatively we could intercept the request for the styles... do it works for now.
    await page.goto(AstroConfig.site!, {
      waitUntil: 'domcontentloaded',
    });

    const contentHtml = fs.readFileSync(`dist/${pagePath}/index.html`, 'utf8');
    await page.setContent(contentHtml, { waitUntil: 'domcontentloaded' });
  }

  const pdfBuffer = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  return pdfBuffer;
};
