export const ColorVariants = [
  'primary',
  'secondary',
  'inverted-primary',
  'inverted-secondary',
] as const;
export type ColorVariants = (typeof ColorVariants)[number];
