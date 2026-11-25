import { readdir } from 'node:fs/promises';

import { getPrintDistDir } from './get-print-dist-dir';

export const getFlyerPdfFileNames = async (
  distDir: string,
): Promise<string[]> => getPdfFileNames(distDir, 'flyer');

export const getPdfFileNames = async (
  distDir: string,
  collection: 'flyer' | 'zine' | 'kit' | 'page',
): Promise<string[]> => {
  const pdfsFileNames = await readdir(getPrintDistDir(distDir));

  return pdfsFileNames.filter((fileName) => {
    return fileName.startsWith(`${collection}-`) && fileName.endsWith('.pdf');
  });
};
