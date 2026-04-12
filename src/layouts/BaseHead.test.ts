import { describe, expect, it } from 'vitest';
import { renderToString } from '../testing/render.ts';

import BaseHead from './BaseHead.astro';

describe('BaseHead', () => {
  it('should show an html head', async () => {
    const head = await renderToString(BaseHead, {
      props: {
        title: 'mockTitle',
        seo: 'mockSeo',
        lang: 'ku',
        canonicalUrl: 'canonical.url',
        translationSlugs: [
          {
            lang: 'en',
            url: 'example.uk.com',
          },
          {
            lang: 'de',
            url: 'example.de',
          },
        ],
        allowIndexing: true,
      },
      slots: { default: 'Head content' },
    });

    document.head.outerHTML = head;

    expect(document.title).toBe('mockTitle');
  });
});
