import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.goto('https://bringbackourneighbours.de', {
  waitUntil: 'networkidle2',
});
// Saves the PDF to hn.pdf.
await page.pdf({
  path: 'dist/bbon.pdf',
});

await browser.close();
