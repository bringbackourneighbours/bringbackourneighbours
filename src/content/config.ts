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

const blocksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...translatableSchema,
  }),
});

const flyersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    germanTitle: z.string(),
    lastChecked: z.date(),
    ...i18nUrlSchema,
  }),
});

const linksCollection = defineCollection({
  type: 'data',
  schema: z.record(
    z.string(),
    z.object({
      slug: z.string(),
      url: z.string(),
      title: z.string(),
      type: z.string(),
    }),
  ),
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...i18nUrlSchema,
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
    wizard: z
      .object({
        isThereDangerQuestion: z.string(),
      })
      .optional(),
  }),
});

export const collections = {
  blocks: blocksCollection,
  flyers: flyersCollection,
  links: linksCollection,
  pages: pagesCollection,
  ui: uiCollection,
};
