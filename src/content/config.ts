import { z, defineCollection } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    identifier: z.string(),
    lang: z.string(),
    seo: z.string(),
    fallback: z.string().optional(),
  }),
});

export const collections = {
  pages: pagesCollection,
};
