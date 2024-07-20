import {
  getStaticPathsForKits,
  type StandaloneContentProps,
} from '../../util/get-static-paths.ts';
import { printHtmlToBuffer } from '../../util/print-html-to-buffer.ts';

export async function getStaticPaths() {
  return getStaticPathsForKits();
}

// TODO: this is a little hacky: we do render the pages within the build step.
// this only works when the "internal-print" was build just before.
// alternativ would be to move this to an astro integration
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
