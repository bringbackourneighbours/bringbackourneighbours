export default {
  // this is quiet broad but works for now
  '*.{astro,css,html}': (allFiles) => {
    const allFilesArg = allFiles.join(' ');
    return [
      `stylelint --fix ${allFilesArg}`,
      `eslint --fix ${allFilesArg}`,
      `prettier --write ${allFilesArg}`,
    ];
  },
  '*.{md,json,js,ts}': (allFiles) => {
    const allFilesArg = allFiles.join(' ');
    return [`eslint --fix ${allFilesArg}`, `prettier --write ${allFilesArg}`];
  },
};
