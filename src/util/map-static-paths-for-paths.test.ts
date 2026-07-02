import { describe, expect, it } from 'vitest';
import { mapStaticPathsForPaths } from './map-static-paths-for-paths';
import { Languages } from '../model/languages';

describe('mapStaticPathsForPaths', () => {
  it('return all mapped', () => {
    expect(
      mapStaticPathsForPaths([Languages.GERMAN, Languages.ALBANIAN]),
    ).toEqual([
      {
        params: {
          lang: 'de',
        },
        props: {
          lang: 'de',
        },
      },
      {
        params: {
          lang: 'sq',
        },
        props: {
          lang: 'sq',
        },
      },
    ]);
  });
});
