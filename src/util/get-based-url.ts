import { base, site } from 'astro:config/server';
import type { LanguagesValue } from '../model/languages';
import type { StandaloneCollections } from '../model/standalone-collections';

export const getBasedUrl = (path: string, absolute = false): string => {
  // TODO: could we use the native URL class here?
  return `${absolute ? `${site}` : ''}${base && base != '' ? `${base}` : ''}${path}`;
};

// TODO: move to own file
export function getPrintUrl(
  collection: StandaloneCollections | 'zines',
  lang: LanguagesValue | 'all',
  identifier: string,
  absolute = false,
) {
  if (identifier === 'all') {
    return getBasedUrl(`print/all-${collection.slice(0, -1)}-${lang}.pdf`);
  }
  return getBasedUrl(
    `print/${collection.slice(0, -1)}-${lang}-${identifier}.pdf`,
    absolute,
  );
}
