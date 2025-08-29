import {
  getStaticPathsForKits,
  type StandaloneContentProps,
} from '../../util/get-static-paths.ts';
import { printHtmlToPdf } from '../../util/print-html-to-pdf.ts';
import type { APIContext } from 'astro';

export async function getStaticPaths() {
  const isDev = import.meta.env.DEV;
  if (isDev) {
    // here we provide the as live preview for the dev mode
    return getStaticPathsForKits();
  }
  return [];
}

// DEV MOVE ONLY!!!
// For the production env we render the pages within the build step as astro integration.
export async function GET({
  site,
  params,
}: APIContext<StandaloneContentProps<'kits'>>) {
  const pageUrl = `${site?.origin}/internal-print/kit-${params.lang}-${params.identifier}`;

  return new Response(await printHtmlToPdf(pageUrl), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
}
