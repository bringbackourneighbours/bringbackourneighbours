export const LinkTypes = [
  'PDF',
  'WEB',
  'AUDIO',
  'VIDEO',
  'FLYER',
  'KIT',
  'PAGE',
] as const;

export type LinkTypes = (typeof LinkTypes)[number];
