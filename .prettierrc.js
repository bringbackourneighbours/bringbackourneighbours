/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
    {
      // prettier has no svg parser; the html parser handles svg (case-sensitive
      // attribute names such as viewBox stay intact)
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
  ],
  singleQuote: true,
  tabWidth: 2,
  singleAttributePerLine: true,
};
