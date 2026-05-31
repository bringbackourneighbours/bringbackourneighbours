import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';

import '../../testing/with-mocked-translation.ts';

import MenuLink from './MenuLink.astro';

describe('MenuLink', () => {
  it('should show link ltr', async () => {
    const { getByRole } = await render(MenuLink, {
      props: {
        lang: 'en',
        label: 'label',
        canonicalUrl: 'https://example.com/',
      },
      locals: {
        lang: 'de',
      } as App.Locals,
    });

    expect(getByRole('link', { name: 'label→' })).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', 'https://example.com/');
    expect(getByRole('link')).toHaveAttribute('hreflang', 'en');
  });

  it('should show link rtl', async () => {
    const { getByRole } = await render(MenuLink, {
      props: {
        lang: 'ar',
        label: 'تسمية',
        canonicalUrl: 'https://example.com/',
      },
      locals: {
        lang: 'fr',
      } as App.Locals,
    });

    expect(getByRole('link', { name: 'تسمية←' })).toBeInTheDocument();
    expect(getByRole('link')).toHaveAttribute('href', 'https://example.com/');
    expect(getByRole('link')).toHaveAttribute('hreflang', 'ar');
  });
});
