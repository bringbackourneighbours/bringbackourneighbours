import { defineMiddleware } from 'astro:middleware';
import { base } from 'astro:config/server';

import { DEFAULT_LANG, type LanguagesValue } from './model/languages';

export const onRequest = defineMiddleware((context, next) => {
  // Components can check if isPrint and show things differently
  context.locals.isPrint = context.url.pathname.startsWith(
    `${base}/internal-print/`,
  );

  context.locals.isKit =
    context.url.pathname.startsWith(`${base}internal-print/kit`) ||
    context.url.pathname.startsWith(`${base}${context.params['lang']}/kit/`);

  context.locals.isZine =
    context.url.pathname.startsWith(`${base}internal-print/zine`) ||
    context.url.pathname.startsWith(`${base}${context.params['lang']}/zine/`);

  context.locals.isFlyer =
    context.locals.isZine ||
    context.url.pathname.startsWith(`${base}internal-print/flyer`) ||
    context.url.pathname.startsWith(`${base}${context.params['lang']}/flyer/`);

  // Read Lang (or default) from params
  context.locals.lang =
    (context.params['lang'] as LanguagesValue) || DEFAULT_LANG;

  return next();
});
