import { getEntry } from 'astro:content';
import jp from 'jsonpath';
import type { LanguagesValue } from './languages.enum.ts';

/**
 * translates the `key` to the `language` based on the `ui`-Collection.
 *
 * If no translation is found it will try the `fallback`
 *
 * USAGE:
 * ```
 * useUiTranslation('meta.subtitle', 'de') ==> Gemeinsam solidarisch gegen die sächsische Abschiebepolitik
 * ```
 *
 * @param key
 * @param language
 * @param withFallback (optinal) will prevent using the fallback language. used to prevent endless recursions.
 */
export const useUiTranslation = async (
  key: string,
  language: LanguagesValue,
  withFallback = true,
): Promise<string> => {
  const foundTranslation = await getEntry('ui', language);

  const foundValue = foundTranslation?.data
    ? jp.query(foundTranslation?.data, key)[0]
    : undefined;

  if (
    withFallback &&
    foundTranslation?.data &&
    foundValue === undefined &&
    foundTranslation?.data?.fallback
  ) {
    return await useUiTranslation(key, foundTranslation?.data.fallback, false);
  }

  return foundValue || `${key}/${language} (Noch nicht übersetzt)`;
};
