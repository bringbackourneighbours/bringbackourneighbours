import {
  getStaticPathsForFlyers,
  type StandaloneContentProps,
} from '../../util/get-static-paths.ts';
import { printHtmlToPdf } from '../../util/print-html-to-pdf.ts';

export async function getStaticPaths() {
  const isDev = import.meta.env.DEV;
  if (isDev) {
    // here we provide the as live preview for the dev mode
    return getStaticPathsForFlyers();
  }
  return [];
}

// DEV MOVE ONLY!!!
// For the production env we render the pages within the build step as astro integration.
export async function GET(flyer: StandaloneContentProps<'flyers'>) {
  return new Response(
    await printHtmlToPdf(
      `internal-print/flyer-${flyer.params.lang}-${flyer.params.identifier}`,
    ),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
      },
    },
  );
}
