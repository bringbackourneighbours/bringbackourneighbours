import type { Languages } from '../model/languages';

export function mapStaticPathsForPaths(langs: Languages[]) {
  return Object.values(langs).map((lang) => {
    return {
      params: { lang },
      props: { lang },
    };
  });
}
