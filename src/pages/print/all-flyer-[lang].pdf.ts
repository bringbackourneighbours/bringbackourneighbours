import type { APIRoute } from 'astro';

import {
  DEFAULT_LANG,
  type LanguagesValue,
  SupportedLanguages,
} from '../../util/languages.ts';
import { getStaticPathsForFlyers } from '../../util/get-static-paths.ts';
import {
  getFlyerPdfPath,
  layoutAllFlyerInOnePdf,
} from '../../util/layout-all-flyer-in-one-pdf.ts';
import path from 'node:path';

export interface LangProp {
  params: {
    lang: LanguagesValue;
  };
}

export function getStaticPaths(): LangProp[] {
  const isDev = import.meta.env.DEV;
  if (isDev) {
    // here we provide the as live preview for the dev mode
    return SupportedLanguages.map((lang) => {
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

  const flyersPaths = (await getStaticPathsForFlyers())
    .filter((flyers) => flyers.props.entry.data.lang === lang)
    .map(({ params }) => getFlyerPdfPath(distDir, params.identifier, lang));

  const newPdfBytes = await layoutAllFlyerInOnePdf(flyersPaths);

  return new Response(newPdfBytes, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
};
