import puppeteer from 'puppeteer';
import fs from 'fs';

export const printPage = async (distPath: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const contentHtml = fs.readFileSync(distPath, 'utf8');
  await page.setContent(contentHtml, { waitUntil: 'domcontentloaded' });

  const pdfBuffer = await page.pdf();

  await browser.close();

  return pdfBuffer;
};
