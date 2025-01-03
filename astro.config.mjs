import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
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
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        return (
          !/\/internal-print\//.test(page) &&
          !/\/link\//.test(page) &&
          !/\/showcase\//.test(page)
        );
      },

      // this will not work:
      // astro well just replace the 'de' with 'en' but our canonical URl are more complex!
      i18n: {
        defaultLocale: 'de',
        locales: {
          en: 'en-GB',
          de: 'de-DE',
        },
      },
      serialize: (item) => {
        // console.log(item.links);
        // we cannot access the content here to populate the links for the translations
        return item;
      },
    }),
    printPdfs(),
    checkFlyers(),
  ],
  build: {
    concurrency: 4,
  },
});
