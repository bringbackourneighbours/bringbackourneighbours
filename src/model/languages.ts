/**
 * we are using the codes of https://en.wikipedia.org/wiki/IETF_language_tag
 */
export enum Languages {
  ALBANIAN = 'sq',
  ARABIC = 'ar',
  BOSNIAN = 'bs',
  ENGLISH = 'en',
  FARSI = 'fa',
  FRENCH = 'fr',
  GEORGIAN = 'ka',
  GERMAN = 'de',
  ITALIAN = 'it',
  KURDISH = 'ku',
  KURDISH_SORANI = 'ckb',
  MACEDONIAN = 'mk',
  PASHTO = 'ps',
  ROMANES = 'rom', // not in IEFT included
  RUSSIAN = 'ru',
  SERBIAN = 'sr',
  SOMALI = 'so',
  SPANISH = 'es',
  TIGRINYA = 'ti', // not in IEFT included
  TURKISH = 'tr',
  UKRAINIAN = 'uk',
  URDU = 'ur',
  VIETNAMESE = 'vi',
}

export const SupportedLanguages = [
  Languages.ARABIC,
  Languages.ENGLISH,
  Languages.FARSI,
  Languages.FRENCH,
  Languages.GEORGIAN,
  Languages.GERMAN,
  Languages.KURDISH,
  Languages.SPANISH,
  Languages.TURKISH,
] as const;

export const UnSupportedLanguages = [
  Languages.ALBANIAN,
  Languages.BOSNIAN,
  Languages.ITALIAN,
  Languages.KURDISH_SORANI,
  Languages.MACEDONIAN,
  Languages.PASHTO,
  Languages.ROMANES,
  Languages.RUSSIAN,
  Languages.SERBIAN,
  Languages.SOMALI,
  Languages.TIGRINYA,
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
