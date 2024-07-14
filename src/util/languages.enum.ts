export enum Languages {
  ARABIC = 'ar',
  ENGLISH = 'en',
  FRENCH = 'fr',
  GEORGIAN = 'ka',
  GERMAN = 'de',
  SPANISH = 'es',
  URDU = 'ur',
}

export type LanguagesValue = `${Languages}`;

export const RTL_LANGUAGES: Languages[] = [
  Languages.ARABIC,
  Languages.URDU,
] as const;

export const DEFAULT_LANG: LanguagesValue = Languages.GERMAN;
