import puppeteer from 'puppeteer';

const printPage = async (url: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // alternative to visiting the page after build would be to load the html form dist
  // stackoverflow.com/questions/47587352/opening-local-html-file-using-puppeteer
  // await page.goto('file://C:/Users/compoundeye/test.html');
  // or
  // var contentHtml = fs.readFileSync('C:/Users/compoundeye/test.html', 'utf8');
  // await page.setContent(contentHtml);

  await page.goto(url, {
    waitUntil: 'networkidle2',
  });
  const pdfBuffer = await page.pdf();

  await browser.close();

  return pdfBuffer;
};

export async function GET() {
  return new Response(await printPage('https://bringbackourneighbours.de'), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
}
