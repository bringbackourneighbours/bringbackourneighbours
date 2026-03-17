import { PDFDocument } from 'pdf-lib';
import { PDFParse } from 'pdf-parse';

export async function getPdfPageText(
  pdfDocument: PDFDocument,
  pageIndex: number,
): Promise<string> {
  const pdfFile = await pdfDocument.save();
  const parser = new PDFParse({ data: pdfFile });
  const textResult = await parser.getText();

  await parser.destroy();

  return textResult.pages[pageIndex].text;
}
