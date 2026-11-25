import { defineConfig } from 'astro/config';
import { siteUrl, basePath } from './src/model/site';
import mdx from '@astrojs/mdx';
import printPdfs from './src/integrations/print-pdfs';
import layoutZines from './src/integrations/layout-zines';
import checkPdfPages from './src/integrations/check-pdf-pages';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [
    mdx(),
    printPdfs(),
    checkPdfPages('flyer', 1, 'exact'),
    checkPdfPages('zine', 8),
    checkPdfPages('kit', 25, 'min'),
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
