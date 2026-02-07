import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import printPdfs from './src/integrations/print-pdfs';
import checkFlyers from './src/integrations/check-flyers';
import layoutFlyers from './src/integrations/layout-flyers';

const isDev = import.meta.env.DEV;

const localhostUrl = 'http://localhost:4321/';
const prodUrl = 'https://bringbackourneighbours.de/';
const prodLinkUrl = 'bbonlink.de';
const basePath = '';
// TODO: i think the basepath should be '/' so we could omit it above

const siteUrl = isDev ? localhostUrl : prodUrl;

export const previewUrl = localhostUrl;
export const linkUrl = isDev ? `${localhostUrl}link` : prodLinkUrl;

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [mdx(), printPdfs(), checkFlyers(), layoutFlyers()],
  build: {
    concurrency: 4,
  },
  server: {
    // for runing in devContainer/Codespaces
    // see: https://vite.dev/guide/troubleshooting.html#dev-containers-vs-code-port-forwarding
    host: '127.0.0.1',
  },
});
