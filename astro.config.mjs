import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import printPdfs from './src/integrations/print-pdfs';
import checkFlyers from './src/integrations/check-flyers';
import layoutFlyers from './src/integrations/layout-flyers';

const isDev = import.meta.env.DEV;
const siteUrl = isDev
  ? 'http://localhost:4321/'
  : 'https://bringbackourneighbours.de/';
const basePath = '';

export const previewUrl = 'http://localhost:4321/';
export const linkUrl = isDev ? 'http://localhost:4321/link' : 'bbonlink.de';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [mdx(), printPdfs(), checkFlyers(), layoutFlyers()],
  build: {
    concurrency: 4,
  },
});
