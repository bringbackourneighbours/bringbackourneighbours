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
  Languages.ENGLISH,
  Languages.GERMAN,
] as const;

export const UnSupportedLanguages = [
  Languages.ALBANIAN,
  Languages.ARABIC,
  Languages.BOSNIAN,
  Languages.FARSI,
  Languages.FRENCH,
  Languages.GEORGIAN,
  Languages.KURDISH,
  Languages.KURDISH_SORANI,
  Languages.MACEDONIAN,
  Languages.PASHTO,
  Languages.RUSSIAN,
  Languages.SERBIAN,
  Languages.SOMALI,
  Languages.SPANISH,
  Languages.TIGRINYA,
  Languages.TURKISH,
  Languages.UKRAINIAN,
  Languages.URDU,
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
