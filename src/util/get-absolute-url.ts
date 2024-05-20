import AstroConfig from '../../astro.config.mjs';

export const getAbsoluteUrl = (path: string): string => {
  return `${AstroConfig.site}${path}`;
};
