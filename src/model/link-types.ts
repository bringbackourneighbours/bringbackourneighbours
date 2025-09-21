export const LinkTypes = [
  'DOC',
  'PDF',
  'WEB',
  'AUDIO',
  'VIDEO',
  'FLYER',
  'KIT',
  'PAGE',
] as const;

export type LinkTypes = (typeof LinkTypes)[number];
