import { defineMiddleware } from 'astro:middleware';

import { DEFAULT_LANG, type LanguagesValue } from './model/languages.ts';
import AstroConfig from '../astro.config.mjs';

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  // Components can check if isPrint and show things differently
  context.locals.isPrint = context.url.pathname.startsWith(
    `${AstroConfig.base}/internal-print/`,
  );

  context.locals.isKit =
    context.url.pathname.startsWith(`${AstroConfig.base}/internal-print/kit`) ||
    context.url.pathname.startsWith(
      `${AstroConfig.base}/${context.params['lang']}/kit/`,
    );

  context.locals.isFlyer =
    context.url.pathname.startsWith(
      `${AstroConfig.base}/internal-print/flyer`,
    ) ||
    context.url.pathname.startsWith(
      `${AstroConfig.base}/${context.params['lang']}/flyer/`,
    );

  // Read Lang (or default) from params
  context.locals.lang =
    (context.params['lang'] as LanguagesValue) || DEFAULT_LANG;

  return next();
});
