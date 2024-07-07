import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import printPdfs from "./src/integrations/print-pdfs";
const isDev = import.meta.env.DEV;
const siteUrl = isDev
  ? 'http://localhost:4321/'
  : 'https://bringbackourneighbours.github.io/bringbackourneighbours/';
const basePath = isDev ? '/' : '/bringbackourneighbours';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [
    mdx(),
    printPdfs(),
  ],
});
