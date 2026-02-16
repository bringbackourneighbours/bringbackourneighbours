import type { APIRoute } from 'astro';

import { DEFAULT_LANG, SupportedLanguages } from '../../model/languages.ts';
import path from 'node:path';
import { getPdfFileNames } from '../../util/get-flyer-pdf-file-names.ts';
import { getPrintDistDir } from '../../util/get-print-dist-dir.ts';
import { layoutAllZineInOnePdf } from '../../util/layout-all-zine-in-one-pdf.ts';

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
  const zineFileNames = await getPdfFileNames(distDir, 'zine');

  const allZinePathsInLang = zineFileNames
    .filter((fileName) => {
      const regex =
        lang === 'all' ? new RegExp(`zine-`) : new RegExp(`zine-${lang}`);
      return regex.test(fileName);
    })
    .map((fileName) => `${pdfDir}/${fileName}`);

  const newPdfBytes = await layoutAllZineInOnePdf(allZinePathsInLang);

  return new Response(newPdfBytes as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
};
