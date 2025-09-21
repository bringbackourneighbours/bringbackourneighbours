import { expect, test } from 'vitest';
import { invertColorVariant } from './invert-color-variants.ts';
import { ColorVariants } from '../model/color-variants.ts';

test.each([
  { input: 'primary', expected: 'inverted-primary' },
  {
    input: 'secondary',
    expected: 'inverted-secondary',
  },
  {
    expected: 'primary',
    input: 'inverted-primary',
  },
  {
    expected: 'secondary',
    input: 'inverted-secondary',
  },
  {
    input: '',
    expected: undefined,
  },
  {
    input: 'foooo',
    expected: undefined,
  },
  {
    input: null,
    expected: undefined,
  },
])('invertColorVariant $input => $expected ', ({ input, expected }) => {
  expect(invertColorVariant(input as ColorVariants)).toEqual(expected);
});
