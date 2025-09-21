export const getPrintDistDir = (distDir: string): string => {
  return `${distDir.endsWith('/') ? distDir.slice(0, -1) : distDir}/print`;
};
