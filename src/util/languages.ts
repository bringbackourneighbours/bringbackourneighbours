export enum Languages {
  ARABIC = 'ar',
  ENGLISH = 'en',
  FARSI = 'fa',
  FRENCH = 'fr',
  GEORGIAN = 'ka',
  GERMAN = 'de',
  PASHTO = 'ps',
  RUSSIAN = 'ru',
  SPANISH = 'es',
  TURKISH = 'tr',
  UKRAINIAN = 'uk',
  URDU = 'ur',
}

export const SupportedLanguages = [
  Languages.ARABIC,
  Languages.ENGLISH,
  Languages.FARSI,
  Languages.FRENCH,
  Languages.GEORGIAN,
  Languages.GERMAN,
  Languages.SPANISH,
  Languages.URDU,
] as const;

export const UnSupportedLanguages = [
  Languages.PASHTO,
  Languages.RUSSIAN,
  Languages.TURKISH,
  Languages.UKRAINIAN,
] as const;

export type LanguagesValue = `${Languages}`;

export const RTL_LANGUAGES: Languages[] = [
  Languages.ARABIC,
  Languages.URDU,
] as const;

export const DEFAULT_LANG: LanguagesValue = Languages.GERMAN;
