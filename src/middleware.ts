import { defineMiddleware } from 'astro:middleware';

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
  // Components can check if isPrint and show things differently
  context.locals.isPrint = context.url.pathname.startsWith('/internal-print/');

  return next();
});
