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
  '*.{md,mdx,json,mjs,js,ts,yml,yaml}': (allFiles) => {
    const allFilesArg = allFiles.join(' ');
    return [`eslint --fix ${allFilesArg}`, `prettier --write ${allFilesArg}`];
  },
};
