import type { APIRoute } from 'astro';

import { DEFAULT_LANG, SupportedLanguages } from '../../util/languages.ts';
import {
  getFlyerPdfFileNames,
  getPrintDistDir,
  layoutAllFlyerInOnePdf,
} from '../../util/layout-all-flyer-in-one-pdf.ts';
import path from 'node:path';

export interface LangProp {
  params: {
    lang: string;
  };
}

export function getStaticPaths(): LangProp[] {
  const isDev = import.meta.env.DEV;
  if (isDev) {
    // here we provide the as live preview for the dev mode
    return [...SupportedLanguages, 'all'].map((lang) => {
      return { params: { lang } };
    });
  }
  return [];
}

// DEV MOVE ONLY!!!
// For the production env we render the pages within the build step as astro integration.
export const GET: APIRoute<LangProp> = async ({ params }) => {
  const lang = params.lang || DEFAULT_LANG;

  const DEFAULT_OUT_DIR = 'dist';
  const distDir = `${path.resolve(process.cwd(), DEFAULT_OUT_DIR)}`;

  const pdfDir = getPrintDistDir(distDir);
  const flyerFileNames = await getFlyerPdfFileNames(distDir);

  const allFlyerPathsInLang = flyerFileNames
    .filter((fileName) => {
      const regex =
        lang === 'all' ? new RegExp(`flyer-`) : new RegExp(`flyer-${lang}`);
      return regex.test(fileName);
    })
    .map((fileName) => `${pdfDir}/${fileName}`);

  const newPdfBytes = await layoutAllFlyerInOnePdf(allFlyerPathsInLang);

  return new Response(newPdfBytes as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
};
