import { degrees, PageSizes, PDFDocument, PDFPage } from 'pdf-lib';
import fs from 'fs';
import { RTL_LANGUAGES } from '../model/languages.ts';

const placeZineOnPage = async (
  pdfDoc: PDFDocument,
  frontPage: PDFPage,
  zinePdfPath: string,
): Promise<void> => {
  const directionRegEx = new RegExp(`zine-(${RTL_LANGUAGES.join('|')})-`);
  const isRtlLang = directionRegEx.test(zinePdfPath);

  const buffer = fs.readFileSync(zinePdfPath);
  const flyerDoc = await PDFDocument.load(new Uint8Array(buffer));

  const [
    firstPage,
    secondPage,
    thirdPage,
    fourthPage,
    fifthPage,
    sixthPage,
    seventhPage,
    eighthPage,
  ] = await pdfDoc.embedPdf(flyerDoc, [0, 1, 2, 3, 4, 5, 6, 7]);

  const A7_A4_POSISTIONS = {
    east: {
      top: {
        x: firstPage.height,
        y: firstPage.width * 3,
        xScale: 1,
        yScale: 1,
        rotate: degrees(90),
      },
      upper: {
        x: firstPage.height,
        y: firstPage.width * 2,
        xScale: 1,
        yScale: 1,
        rotate: degrees(90),
      },
      lower: {
        x: firstPage.height,
        y: firstPage.width * 1,
        xScale: 1,
        yScale: 1,
        rotate: degrees(90),
      },
      bottom: {
        x: firstPage.height,
        y: 0,
        xScale: 1,
        yScale: 1,
        rotate: degrees(90),
      },
    },
    west: {
      top: {
        x: firstPage.height,
        y: firstPage.width * 4,
        xScale: 1,
        yScale: 1,
        rotate: degrees(270),
      },
      upper: {
        x: firstPage.height,
        y: firstPage.width * 3,
        xScale: 1,
        yScale: 1,
        rotate: degrees(270),
      },
      lower: {
        x: firstPage.height,
        y: firstPage.width * 2,
        xScale: 1,
        yScale: 1,
        rotate: degrees(270),
      },
      bottom: {
        x: firstPage.height,
        y: firstPage.width,
        xScale: 1,
        yScale: 1,
        rotate: degrees(270),
      },
    },
  };

  if (isRtlLang) {
    frontPage.drawPage(eighthPage, A7_A4_POSISTIONS.east.top);
    frontPage.drawPage(firstPage, A7_A4_POSISTIONS.east.upper);
    frontPage.drawPage(secondPage, A7_A4_POSISTIONS.east.lower);
    frontPage.drawPage(thirdPage, A7_A4_POSISTIONS.east.bottom);
    frontPage.drawPage(seventhPage, A7_A4_POSISTIONS.west.top);
    frontPage.drawPage(sixthPage, A7_A4_POSISTIONS.west.upper);
    frontPage.drawPage(fifthPage, A7_A4_POSISTIONS.west.lower);
    frontPage.drawPage(fourthPage, A7_A4_POSISTIONS.west.bottom);
  } else {
    frontPage.drawPage(firstPage, A7_A4_POSISTIONS.east.top);
    frontPage.drawPage(eighthPage, A7_A4_POSISTIONS.east.upper);
    frontPage.drawPage(seventhPage, A7_A4_POSISTIONS.east.lower);
    frontPage.drawPage(sixthPage, A7_A4_POSISTIONS.east.bottom);
    frontPage.drawPage(secondPage, A7_A4_POSISTIONS.west.top);
    frontPage.drawPage(thirdPage, A7_A4_POSISTIONS.west.upper);
    frontPage.drawPage(fourthPage, A7_A4_POSISTIONS.west.lower);
    frontPage.drawPage(fifthPage, A7_A4_POSISTIONS.west.bottom);
  }
};

export async function layoutAllZineInOnePdf(
  zinesPaths: string[],
): Promise<Uint8Array> {
  const newPdf = await PDFDocument.create();

  for (const zinePath of zinesPaths) {
    const frontPage = newPdf.addPage(PageSizes.A4);
    // TODO: no back page for now
    // later we will add posters here
    // const backPage = newPdf.addPage(PageSizes.A4);
    // backPage.drawText('EMPTY', {
    //   x: 200,
    //   y: 400,
    // });

    await placeZineOnPage(newPdf, frontPage, zinePath);
  }

  return await newPdf.save();
}
