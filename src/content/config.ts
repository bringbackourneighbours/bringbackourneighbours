import { defineCollection, z } from 'astro:content';
import {
  SupportedLanguages,
  UnSupportedLanguages,
} from '../model/languages.ts';
import { LinkTypes } from '../model/link-types.ts';

const translatableSchema = {
  identifier: z.string(),
  lang: z.enum(SupportedLanguages).or(z.enum(UnSupportedLanguages)),
  fallback: z.enum(SupportedLanguages).optional(),
  machineTranslation: z.boolean().optional(),
};

/**
 * for flyer, kits and pages
 */
const standaloneContentSchema = z.object({
  ...translatableSchema,
  lastChecked: z.date(),
  title: z.string(),
  seo: z.string(),
});

const addressesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    identifier: z.string(),
    lastChecked: z.date(),
    name: z.string(), // location
    streetLine: z.string().optional(),
    additional: z.string().optional(),
    zip: z.string().optional(),
    city: z.string().optional(), // contact
    mail: z.string().optional(),
    mails: z.array(z.string()).optional(),
    phone: z.string().optional(),
    phones: z.array(z.string()).optional(),

    // web
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    telegram: z.string().optional(),
    twitter: z.string().optional(),
    url: z.string().optional(),

    // notes
    translatedNotes: z
      .record(
        z.enum(SupportedLanguages).or(z.enum(UnSupportedLanguages)),
        z.string(),
      )
      .optional(),
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
        allFlyers: z.string(),
        allKits: z.string(),
        contacts: z.string(),
        copiedContentToClipboard: z.string(),
        copy: z.string(),
        downloadAllPdf: z.string(),
        downloadPdf: z.string(),
        emergencyKit: z.string(),
        findAlsoAsPage: z.string(),
        findAlsoInFlyer: z.string(),
        forms: z.string(),
        home: z.string(),
        imprint: z.string(),
        infosAgainstDeportation: z.string(),
        machineTranslation: z.string(),
        material: z.string(),
        moreInfo: z.string(),
        moreInfoAbout: z.string(),
        notFound: z.string(),
        notFoundText: z.string(),
        professionals: z.string(),
        publicity: z.string(),
        share: z.string(),
        sharedLinkToClipboard: z.string(),
        subtitle: z.string(),
        supporters: z.string(),
        title: z.string(),
        updated: z.string(),
      })
      .optional(),
    languages: z.object({
      ar: z.string(),
      bs: z.string(),
      ckb: z.string(),
      de: z.string(),
      en: z.string(),
      es: z.string(),
      fa: z.string(),
      fr: z.string(),
      ka: z.string(),
      ku: z.string(),
      mk: z.string(),
      ps: z.string(),
      ru: z.string(),
      so: z.string(),
      sq: z.string(),
      sr: z.string(),
      ti: z.string(),
      tr: z.string(),
      uk: z.string(),
      vi: z.string(),
      ur: z.string(),
      findTranslation: z.string().optional(),
    }),
    shortLink: z
      .object({
        availableInOtherLanguages: z.string(),
        onlyAvailableInOtherLanguages: z.string(),
        onlyAvailableOnlineInOtherLanguages: z.string(),
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
