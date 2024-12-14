import {
  getStaticPathsForKits,
  type StandaloneContentProps,
} from '../../util/get-static-paths.ts';
import { printHtmlToBuffer } from '../../util/print-html-to-buffer.ts';

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
export async function GET(flyer: StandaloneContentProps<'kits'>) {
  return new Response(
    await printHtmlToBuffer(
      `internal-print/kit-${flyer.params.lang}-${flyer.params.identifier}`,
    ),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
      },
    },
  );
}
