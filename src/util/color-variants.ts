export const ColorVariants = [
  'primary',
  'secondary',
  'inverted-primary',
  'inverted-secondary',
] as const;

export type ColorVariants = (typeof ColorVariants)[number];

export const invertColorVariant = (input: ColorVariants): ColorVariants => {
  switch (input) {
    case 'primary':
      return 'inverted-primary';
    case 'secondary':
      return 'inverted-secondary';
    case 'inverted-primary':
      return 'primary';
    case 'inverted-secondary':
      return 'secondary';
  }
};
