import {
  getStaticPathsForFlyers,
  type StandaloneContentProps,
} from '../../util/get-static-paths.ts';
import { printHtmlToBuffer } from '../../util/print-html-to-buffer.ts';

export async function getStaticPaths() {
  return getStaticPathsForFlyers();
}

// TODO: this is a little hacky: we do render the pages within the builud step.
// this only works because the "internal-print" was build just before.
// alternativ would be to move this to an astro integration
export async function GET(flyer: StandaloneContentProps<'flyers'>) {
  return new Response(
    await printHtmlToBuffer(
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
