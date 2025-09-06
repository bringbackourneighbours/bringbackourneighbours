import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';

import Heading from './Heading.astro';

describe('Heading', () => {
  it('should show heading with level', async () => {
    const { getByRole } = await render(Heading, {
      props: {
        level: 1,
        id: 'mock',
      },
      slots: { default: 'a heading' },
    });

    expect(getByRole('heading', { name: 'a heading' })).toBeInTheDocument();
    expect(getByRole('heading', { level: 1 })).toHaveAttribute('id', 'mock');
  });

  it('should default to level 2', async () => {
    const { getByRole } = await render(Heading, {
      props: {},
    });

    expect(getByRole('heading')).toBeInTheDocument();
  });

  it('should shift the level', async () => {
    const { getByRole } = await render(Heading, {
      props: {
        level: 1,
        id: 'mock',
      },
      locals: {
        levelShift: 2,
        isPrint: false,
        isKit: false,
        isFlyer: false,
        lang: 'ar',
      },
    });

    expect(getByRole('heading', { level: 3 })).toHaveAttribute('id', 'mock');
  });
});
