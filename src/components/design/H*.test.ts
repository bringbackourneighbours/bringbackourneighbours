import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';

import H1 from './H1.astro';
import H2 from './H2.astro';
import H3 from './H3.astro';
import H4 from './H4.astro';
import H5 from './H5.astro';

describe('H*', () => {
  it.each([
    {
      component: H1,
      level: 1,
    },
    {
      component: H2,
      level: 2,
    },
    {
      component: H3,
      level: 3,
    },
    {
      component: H4,
      level: 4,
    },
    {
      component: H5,
      level: 5,
    },
  ])(
    'should show $component with level $level',
    async ({ component, level }) => {
      const { getByRole } = await render(component, {
        props: { id: 'mock' },
        slots: { default: 'a heading' },
      });

      expect(getByRole('heading', { name: 'a heading' })).toBeInTheDocument();
      expect(getByRole('heading', { level })).toHaveAttribute('id', 'mock');
    },
  );
});
