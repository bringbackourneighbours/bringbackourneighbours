import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';
import { SupportedLanguages, UnSupportedLanguages } from './model/languages';
import { LinkTypes } from './model/link-types';

const translatableSchema = {
  identifier: z.string(),
  lang: z.enum(SupportedLanguages).or(z.enum(UnSupportedLanguages)),
  fallbackToLang: z.enum(SupportedLanguages).optional(),
  notToBeTranslated: z.boolean().optional(),
  machineTranslation: z.boolean().optional(),
};

const checkableSchema = {
  noCheckUntil: z.date().optional(),
  lastChecked: z.date(),
};
/**
 * for flyer, kits and pages
 */
const standaloneContentSchema = {
  ...translatableSchema,
  ...checkableSchema,
  title: z.string(),
  seo: z.string(),
};

const locationSchema = {
  streetLine: z.string().optional(),
  additional: z.string().optional(),
  zip: z.string().optional(),
  city: z.string().optional(),
};

const addressesCollection = defineCollection({
  loader: glob({ base: './src/content/addresses', pattern: '**/*.{yml,yaml}'}),
  schema: z.object({
    ...checkableSchema,
    identifier: z.string(),
    name: z.string(),
    locations: z
      .array(
        z.object({
          location: z.string().optional(),
          ...locationSchema,
        }),
      )
      .optional(),
    ...locationSchema,
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
      .partialRecord(
        // z.enum(SupportedLanguages),
        z.enum(SupportedLanguages).or(z.enum(UnSupportedLanguages)),
        z.string(),
      )
      .optional(),
  }),
});

const blocksCollection = defineCollection({
  loader: glob({ base: './src/content/blocks', pattern: '**/*.{md,mdx}'}),
  schema: z.object({
    ...translatableSchema,
    ...checkableSchema,
  }),
});

const flyersCollection = defineCollection({
  loader: glob({ base: './src/content/flyers', pattern: '**/*.{md,mdx}'}),
  schema: z.object({
    ...standaloneContentSchema,
    index: z.number().optional(),
  }),
});

const kitsCollection = defineCollection({
  loader: glob({ base: './src/content/kits', pattern: '**/*.{md,mdx}'}),
  schema: z.object(standaloneContentSchema),
});

const linksCollection = defineCollection({
  loader: glob({ base: './src/content/links', pattern: '**/*.{yml,yaml}'}),
  schema: z.partialRecord(
    z
      .enum(SupportedLanguages)
      .or(z.enum(UnSupportedLanguages))
      .or(z.literal('all')),
    z.object({
      ...checkableSchema,
      // TODO: only optional for now to allow soft migration
      lastChecked: checkableSchema.lastChecked.optional(),
      slug: z.string().optional(),
      url: z.string().optional(),
      title: z.string().optional(),
      type: z.enum(LinkTypes).optional(),
    }),
  ),
});

const pagesCollection = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}'}),
  schema: z.object(standaloneContentSchema),
});

const uiCollection = defineCollection({
  loader: glob({ base: './src/content/ui', pattern: '**/*.json'}),
  schema: z.object({
    fallback: z.enum(SupportedLanguages).optional(),
    meta: z
      .object({
        allFlyers: z.string(),
        allKits: z.string(),
        copiedContentToClipboard: z.string(),
        copy: z.string(),
        downloadAllFlyerPdf: z.string(),
        downloadAllZinePdf: z.string(),
        downloadPdf: z.string(),
        emergencyKit: z.string(),
        findAlsoAsFlyerInFallbackLang: z.string(),
        findAlsoAsPage: z.string(),
        findAlsoAsPageInFallbackLang: z.string(),
        findAlsoInFlyer: z.string(),
        home: z.string(),
        imprint: z.string(),
        infosAgainstDeportation: z.string(),
        machineTranslation: z.string(),
        moreInfo: z.string(),
        moreInfoAbout: z.string(),
        notFound: z.string(),
        notFoundText: z.string(),
        onlyInFallbackLanguage: z.string(),
        share: z.string(),
        sharedLinkToClipboard: z.string(),
        subtitle: z.string(),
        supporters: z.string(),
        tableOfContents: z.string(),
        mainNavigation: z.string(),
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
      it: z.string(),
      ka: z.string(),
      ku: z.string(),
      mk: z.string(),
      ps: z.string(),
      rom: z.string(),
      ru: z.string(),
      so: z.string(),
      sq: z.string(),
      sr: z.string(),
      ti: z.string(),
      tr: z.string(),
      uk: z.string(),
      ur: z.string(),
      vi: z.string(),
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
