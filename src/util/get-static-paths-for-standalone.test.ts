import { describe, expect, it } from 'vitest';
import { getStaticPathsForStandalone } from './get-static-paths-for-standalone.ts';
import type { StandaloneCollectionEntry } from '../model/standalone-collections.ts';

describe('getStaticPaths', () => {
  it('return all mapped', () => {
    expect(
      getStaticPathsForStandalone([
        {
          data: {
            identifier: 'aaa',
            lang: 'de',
            title: 'AAAA',
          },
        } as StandaloneCollectionEntry<'flyers'>,
        {
          data: {
            identifier: 'bbb',
            lang: 'en',
            title: 'BBBB',
          },
        } as StandaloneCollectionEntry<'flyers'>,
      ]),
    ).toEqual([
      {
        params: {
          identifier: 'aaa',
          lang: 'de',
          title: 'AAAA',
        },
        props: {
          entry: {
            data: {
              identifier: 'aaa',
              lang: 'de',
              title: 'AAAA',
            },
          },
        },
      },
      {
        params: {
          identifier: 'bbb',
          lang: 'en',
          title: 'BBBB',
        },
        props: {
          entry: {
            data: {
              identifier: 'bbb',
              lang: 'en',
              title: 'BBBB',
            },
          },
        },
      },
    ]);
  });
});
