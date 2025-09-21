import type { ColorVariants } from '../model/color-variants.ts';

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
