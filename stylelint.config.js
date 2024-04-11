/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-html/astro'],
  rules: {
    'no-empty-source': null, // astro file without style would break this rule
  },
};
