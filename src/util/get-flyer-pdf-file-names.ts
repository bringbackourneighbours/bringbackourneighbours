import { readdir } from 'node:fs/promises';

import { getPrintDistDir } from './get-print-dist-dir.ts';

export const getFlyerPdfFileNames = async (
  distDir: string,
): Promise<string[]> => {
  const pdfsFileNames = await readdir(getPrintDistDir(distDir));

  return pdfsFileNames.filter((fileName) => {
    return fileName.startsWith('flyer-') && fileName.endsWith('.pdf');
  });
};
