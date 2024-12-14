import puppeteer, { Browser } from 'puppeteer';
import fs from 'fs';
import AstroConfig from '../../astro.config.mjs';

export const printHtmlToBuffer = async (
  pagePath: string,
  browserToReuse?: Browser,
): Promise<Uint8Array> => {
  const isDev = import.meta.env.DEV;
  // when printing en masse we don't want to set up and tear the browers for each page
  const browser =
    browserToReuse ??
    (await puppeteer.launch({
      // in the github ci the build will fail without diasbling the sandbox.
      // TODO: investigate possible workaround
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }));
  const page = await browser.newPage();

  if (isDev) {
    // we will use the fresh page in Dev Mode
    await page.goto(`${AstroConfig.site!}${pagePath}`);
  } else {
    // we will not get the global stylesheets without loading them first.
    // so we visit the production page once and then the css is already loaded
    // alternatively we could intercept the request for the styles... but it works for now.
    await page.goto(AstroConfig.site!, {
      waitUntil: ['domcontentloaded', 'networkidle0'],
    });

    const contentHtml = fs.readFileSync(`dist/${pagePath}/index.html`, 'utf8');
    await page.setContent(contentHtml, {
      waitUntil: ['domcontentloaded', 'networkidle0'],
    });
  }

  const pdfBuffer = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
  });

  if (!browserToReuse) {
    await browser.close();
  }

  return pdfBuffer;
};
