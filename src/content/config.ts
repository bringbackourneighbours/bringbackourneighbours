import { z, defineCollection } from 'astro:content';

const i18nUrlSchema = {
  title: z.string(),
  identifier: z.string(),
  lang: z.string(),
  seo: z.string(),
  fallback: z.string().optional(),
};

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...i18nUrlSchema,
  }),
});

const flyersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...i18nUrlSchema,
    germanTitle: z.string(),
    lastChecked: z.date(),
  }),
});

export const collections = {
  pages: pagesCollection,
  flyers: flyersCollection,
};
