import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

const isDev = import.meta.env.DEV;

const siteUrl = isDev? 'http://localhost:4321' : 'https://bringbackourneighbours.github.io';
const basePath = isDev? '/' : '/bringbackourneighbours';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: basePath,
  integrations: [mdx()]
});