import { getAbsoluteUrl } from './get-absolute-url.ts';
import { getEntry } from 'astro:content';

export const getCanonicalUrlToFlyer = async (
  lang: string,
  identifier: string,
): Promise<string> => {
  const flyer = await getEntry('flyers', `${identifier}/${lang}`);

  return getAbsoluteUrl(
    `${lang}/flyer/${identifier}/${flyer?.data.seo ? encodeURIComponent(flyer.data.seo) : ''}`,
  );
};
