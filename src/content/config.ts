import { z, defineCollection } from 'astro:content';
import { SupportedLanguages, UnSupportedLanguages } from '../util/languages.ts';
import { LinkTypes } from '../util/link-icon-type.ts';

const translatableSchema = {
  identifier: z.string(),
  lang: z.enum(SupportedLanguages),
  fallback: z.enum(SupportedLanguages).optional(),
  machineTranslation: z.boolean().optional(),
};

const i18nUrlSchema = {
  ...translatableSchema,
  title: z.string(),
  seo: z.string(),
};

/**
 * for flyer and kits
 */
const standaloneContentSchema = z.object({
  germanTitle: z.string(),
  lastChecked: z.date(),
  ...i18nUrlSchema,
});

const addressesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    identifier: z.string(),
    lastChecked: z.date(),
    name: z.string(),
    // location
    streetLine: z.string().optional(),
    additional: z.string().optional(),
    zip: z.string().optional(),
    city: z.string().optional(),
    // contact
    mail: z.string().optional(),
    mails: z.array(z.string()).optional(),
    phone: z.string().optional(),
    // web
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    telegram: z.string().optional(),
    twitter: z.string().optional(),
    url: z.string().optional(),
    bbon: z.string().optional(), // identifier for bbon link
    // notes
    translatedNotes: z.record(z.string(), z.string()).optional(),
  }),
});

const blocksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...translatableSchema,
  }),
});

const flyersCollection = defineCollection({
  type: 'content',
  schema: standaloneContentSchema,
});

const kitsCollection = defineCollection({
  type: 'content',
  schema: standaloneContentSchema,
});

const linksCollection = defineCollection({
  type: 'data',
  schema: z.record(
    z
      .enum(SupportedLanguages)
      .or(z.enum(UnSupportedLanguages))
      .or(z.literal('all')),
    z.object({
      slug: z.string().optional(),
      url: z.string().optional(),
      title: z.string().optional(),
      type: z.enum(LinkTypes).optional(), // TODO: PDF,WEB as literal
    }),
  ),
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: standaloneContentSchema,
});

const uiCollection = defineCollection({
  type: 'data',
  schema: z.object({
    fallback: z.enum(SupportedLanguages).optional(),
    meta: z
      .object({
        title: z.string(),
        subtitle: z.string(),
        updated: z.string(),
        imprint: z.string(),
        moreInfo: z.string(),
        allFlyers: z.string(),
        allKits: z.string(),
        contacts: z.string(),
        publicity: z.string(),
        forms: z.string(),
        material: z.string(),
        share: z.string(),
        sharedLinkToClipboard: z.string(),
        copy: z.string(),
        downloadPdf: z.string(),
        copiedContentToClipboard: z.string(),
        infosAgainstDeportation: z.string(),
        machineTranslation: z.string(),
      })
      .optional(),
    languages: z.object({
      ar: z.string(),
      de: z.string(),
      en: z.string(),
      es: z.string(),
      fa: z.string(),
      fr: z.string(),
      ka: z.string(),
      ur: z.string(),
      findTranslation: z.string().optional(),
    }),
    shortLink: z
      .object({
        availableInOtherLanguages: z.string(),
        notAvailableInCurrentLanguage: z.string(),
      })
      .optional(),
    wizard: z
      .object({
        isThereDangerQuestion: z.string(),
        areYouInDangerQuestion: z.string(),
        someoneElseInDangerQuestion: z.string(),
      })
      .optional(),
  }),
});

export const collections = {
  addresses: addressesCollection,
  blocks: blocksCollection,
  flyers: flyersCollection,
  links: linksCollection,
  kits: kitsCollection,
  pages: pagesCollection,
  ui: uiCollection,
};
