import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

const isDev = import.meta.env.DEV;

const siteUrl = isDev? 'http://localhost:4321' : 'https://bringbackourneighbours.github.io';
const base = isDev? '/' : '/bringbackourneighbours';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [mdx()]
});