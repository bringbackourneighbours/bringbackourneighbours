import { defineMiddleware } from 'astro:middleware';
import { DEFAULT_LANG, type LanguagesValue } from './util/languages.ts';
import AstroConfig from '../astro.config.mjs';

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  // Components can check if isPrint and show things differently
  context.locals.isPrint = context.url.pathname.startsWith(
    `${AstroConfig.base}/internal-print/`,
  );

  // Read Lang (or default) from params
  context.locals.lang =
    (context.params['lang'] as LanguagesValue) || DEFAULT_LANG;

  return next();
});
