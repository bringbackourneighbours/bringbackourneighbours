import type { APIContext } from 'astro';
import { mapStaticPathsForStandalone } from '../../util/map-static-paths-for-standalone.ts';
import { printHtmlToPdf } from '../../util/print-html-to-pdf.ts';
import type { StandaloneContentProps } from '../../model/standalone-collections.ts';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const isDev = import.meta.env.DEV;
  if (isDev) {
    // here we provide the as live preview for the dev mode
    return mapStaticPathsForStandalone(await getCollection('flyers'));
  }
  return [];
}

// DEV MOVE ONLY!!!
// For the production env we render the pages within the build step as astro integration.
export async function GET({
  site,
  params,
}: APIContext<StandaloneContentProps<'flyers'>>) {
  const pageUrl = `${site?.origin}/internal-print/zine-${params.lang}-${params.identifier}`;
  return new Response((await printHtmlToPdf(pageUrl)) as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
    },
  });
}
