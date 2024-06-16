import puppeteer from 'puppeteer';
import fs from 'fs';

export const printHtmlToBuffer = async (distPath: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    'https://bringbackourneighbours.github.io/bringbackourneighbours/',
  );

  const contentHtml = fs.readFileSync(distPath, 'utf8');
  await page.setContent(contentHtml, { waitUntil: 'domcontentloaded' });

  const pdfBuffer = await page.pdf();

  await browser.close();

  return pdfBuffer;
};

export const prinUrlToBuffer = async (url: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const pdfBuffer = await page.pdf();

  await browser.close();

  return pdfBuffer;
};
