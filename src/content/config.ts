import { z, defineCollection } from 'astro:content';

const translatableSchema = {
  identifier: z.string(),
  lang: z.string(),
  fallback: z.string().optional(),
};

const i18nUrlSchema = {
  ...translatableSchema,
  title: z.string(),
  seo: z.string(),
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

const blocksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...translatableSchema,
  }),
});

const uiCollection = defineCollection({
  type: 'data',
  schema: z.object({
    fallback: z.string(),
    meta: z
      .object({
        title: z.string(),
        subtitle: z.string(),
      })
      .optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
  flyers: flyersCollection,
  blocks: blocksCollection,
  ui: uiCollection,
};
