export enum Languages {
  ARABIC = 'ar',
  ENGLISH = 'en',
  FRENCH = 'fr',
  GEORGIAN = 'ka',
  GERMAN = 'de',
  SPANISH = 'es',
  URDU = 'ur',
}

export const RTL_LANGUAGES: Languages[] = [
  Languages.ARABIC,
  Languages.URDU,
] as const;
