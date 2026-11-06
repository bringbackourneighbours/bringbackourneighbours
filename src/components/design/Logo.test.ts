import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render';

import '../../testing/with-mocked-translation';

import Logo from './Logo.astro';

describe('Logo', () => {
  it('should show with label', async () => {
    const { getByRole } = await render(Logo, {
      props: {
        label: 'label',
      },
    });

    expect(getByRole('img', { name: 'label' })).toBeInTheDocument();
    expect(getByRole('img', { name: 'label' })).toHaveStyle('width:24px');
  });

  it('should have dynamic size', async () => {
    const { getByRole } = await render(Logo, {
      props: {
        label: 'big',
        size: '2000px',
      },
    });

    expect(getByRole('img', { name: 'big' })).toHaveStyle('width:2000px');
  });
});
