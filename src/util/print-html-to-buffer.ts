import puppeteer from 'puppeteer';
import fs from 'fs';

export const printHtmlToBuffer = async (distPath: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // we will not get the global stylesheets without loading them first.
  // so we visit the porduction page once and then the css is already loaded
  // alternatively we could intercept the request for the styles... do it works for now.
  await page.goto(
    'https://bringbackourneighbours.github.io/bringbackourneighbours/',
  );

  const contentHtml = fs.readFileSync(distPath, 'utf8');
  await page.setContent(contentHtml, { waitUntil: 'domcontentloaded' });

  const pdfBuffer = await page.pdf({
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  return pdfBuffer;
};
