export const LinkTypes = ['PDF', 'WEB', 'AUDIO', 'VIDEO'] as const;

export type LinkTypes = (typeof LinkTypes)[number];
