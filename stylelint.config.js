/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-html/astro'],
  ignoreFiles: ['dist/**'],
  rules: {
    'no-empty-source': null, // astro file without style would break this rule
    'selector-class-pattern': [
      '^(-)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case, with -modi-fiers',
      },
    ],
  },
};
