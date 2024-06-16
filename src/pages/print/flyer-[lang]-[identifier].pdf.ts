import {
  getStaticPathsForFlyers,
  type StandaloneContentProps,
} from '../../util/get-static-paths.ts';
import { printPage } from '../../util/print-page.ts';

export async function getStaticPaths() {
  return getStaticPathsForFlyers();
}

export async function GET(flyer: StandaloneContentProps<'flyers'>) {
  return new Response(
    await printPage(
      `dist/internal-print/flyer-${flyer.params.lang}-${flyer.params.identifier}/index.html`,
    ),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
      },
    },
  );
}
