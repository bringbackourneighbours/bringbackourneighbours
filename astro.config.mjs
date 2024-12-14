import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import printPdfs from './src/integrations/print-pdfs';
import checkFlyers from './src/integrations/check-flyers';

const isDev = import.meta.env.DEV;
const siteUrl = isDev
  ? 'http://localhost:4321/'
  : 'https://bringbackourneighbours.github.io/bringbackourneighbours/';
const basePath = isDev ? '' : '/bringbackourneighbours';

export const linkUrl = isDev
  ? 'http://localhost:4321/link'
  : 'https://bringbackourneighbours.github.io/bringbackourneighbours/link';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [mdx(), printPdfs(), checkFlyers()],
  build: {
    concurrency: 4,
  },
});
