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
  TIGRINYA = 'ti',
  TURKISH = 'tr',
  UKRAINIAN = 'uk',
  URDU = 'ur',
  KURDISH = 'ku',
  KURDISH_SORANI = 'ckb',
  ALBANIAN = 'sq',
  MACEDONIAN = 'mk',
  BOSNIAN = 'bs',
  SOMALI = 'so',
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
