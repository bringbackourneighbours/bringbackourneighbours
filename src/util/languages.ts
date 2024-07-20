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
] as const;

export type LanguagesValue = `${Languages}`;

export const RTL_LANGUAGES: Languages[] = [
  Languages.ARABIC,
  Languages.URDU,
  Languages.FARSI,
  Languages.PASHTO,
] as const;

export const DEFAULT_LANG: LanguagesValue = Languages.GERMAN;
