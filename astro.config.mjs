import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import printPdfs from './src/integrations/print-pdfs';
import checkFlyers from './src/integrations/check-flyers';

const isDev = import.meta.env.DEV;
const siteUrl = isDev
  ? 'http://localhost:4321/'
  : 'https://beta.bringbackourneighbours.de/';
const basePath = '';

export const linkUrl = isDev
  ? 'http://localhost:4321/link'
  : 'https://beta.bbonlink.de/link';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [mdx(), printPdfs(), checkFlyers()],
  build: {
    concurrency: 4,
  },
});
