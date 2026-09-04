import { defineConfig } from 'astro/config';
import { siteUrl, basePath } from './src/model/site';
import mdx from '@astrojs/mdx';
import printPdfs from './src/integrations/print-pdfs';
import checkFlyers from './src/integrations/check-flyers';
import checkZines from './src/integrations/check-zines';
import layoutFlyers from './src/integrations/layout-flyers';
import layoutZines from './src/integrations/layout-zines';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [
    mdx(),
    printPdfs(),
    checkFlyers(),
    checkZines(),
    layoutFlyers(),
    layoutZines(),
  ],
  build: {
    concurrency: 4,
  },
  server: {
    // for runing in devContainer/Codespaces
    // see: https://vite.dev/guide/troubleshooting.html#dev-containers-vs-code-port-forwarding
    host: '127.0.0.1',
  },
});
