import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import printPdfs from './src/integrations/print-pdfs';
import checkFlyers from './src/integrations/check-flyers';
import layoutFlyers from './src/integrations/layout-flyers';

const isDev = import.meta.env.DEV;
const isCodespace = import.meta.env.CODESPACES;
const codespaceUrl = `https://${import.meta.env.CODESPACE_NAME}.${import.meta.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}/`;
const localhostUrl = 'http://localhost:4321/';

const devUrl = isCodespace ? codespaceUrl : localhostUrl;
const siteUrl = isDev ? devUrl : 'https://bringbackourneighbours.de/';
const basePath = '';

export const previewUrl = devUrl;
export const linkUrl = isDev ? `${devUrl}link` : 'bbonlink.de';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [mdx(), printPdfs(), checkFlyers(), layoutFlyers()],
  build: {
    concurrency: 4,
  },
});
