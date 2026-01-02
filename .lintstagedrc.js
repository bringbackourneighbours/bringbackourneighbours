export default {
  // this is quite broad but works for now
  '*.{astro,css,html,svg}': (allFiles) => {
    const allFilesArg = allFiles.join(' ');
    return [
      `stylelint --fix ${allFilesArg}`,
      `eslint --fix ${allFilesArg}`,
      `prettier --write ${allFilesArg}`,
    ];
  },
  '*.{md,mdx,mjs,js,ts}': (allFiles) => {
    const allFilesArg = allFiles.join(' ');
    return [`eslint --fix ${allFilesArg}`, `prettier --write ${allFilesArg}`];
  },
  '*.{json,yml,yaml}': (allFiles) => {
    const allFilesArg = allFiles.join(' ');
    return [`prettier --write ${allFilesArg}`];
  },
};
