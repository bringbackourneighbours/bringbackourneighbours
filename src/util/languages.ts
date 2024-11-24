/**
 * we are using the codes of https://en.wikipedia.org/wiki/IETF_language_tag
 */
export enum Languages {
  ARABIC = 'ar',
  ENGLISH = 'en',
  FARSI = 'fa',
  FRENCH = 'fr',
  GEORGIAN = 'ka',
  GERMAN = 'de',
  PASHTO = 'ps',
  RUSSIAN = 'ru',
  SERBIAN = 'sr',
  SPANISH = 'es',
  TIGRINYA = 'ti', // not in IEFT included
  TURKISH = 'tr',
  UKRAINIAN = 'uk',
  URDU = 'ur',
  KURDISH = 'ku',
  KURDISH_SORANI = 'ckb',
  ALBANIAN = 'sq',
  MACEDONIAN = 'mk',
  BOSNIAN = 'bs',
  SOMALI = 'so',
  VIETNAMESE = 'vi',
}

export const SupportedLanguages = [
  Languages.ARABIC,
  Languages.ENGLISH,
  Languages.FRENCH,
  Languages.GEORGIAN,
  Languages.GERMAN,
  Languages.SPANISH,
  Languages.URDU,
] as const;

export const UnSupportedLanguages = [
  Languages.FARSI,
  Languages.PASHTO,
  Languages.RUSSIAN,
  Languages.SERBIAN,
  Languages.TIGRINYA,
  Languages.TURKISH,
  Languages.UKRAINIAN,
  Languages.KURDISH,
  Languages.KURDISH_SORANI,
  Languages.ALBANIAN,
  Languages.MACEDONIAN,
  Languages.BOSNIAN,
  Languages.SOMALI,
  Languages.VIETNAMESE,
] as const;

export type LanguagesValue = `${Languages}`;

export const RTL_LANGUAGES: Languages[] = [
  Languages.ARABIC,
  Languages.URDU,
  Languages.FARSI,
  Languages.PASHTO,
  Languages.KURDISH_SORANI,
] as const;

export const DEFAULT_LANG: LanguagesValue = Languages.GERMAN;
