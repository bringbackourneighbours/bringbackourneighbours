import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';

import '../../testing/with-mocked-translation.ts';

import SupportBox from './SupportBox.astro';

describe('SupportBox', () => {
  it('should show accordion with proper labels', async () => {
    const { getByRole, getByText } = await render(SupportBox, {
      props: {
        title: 'test-flyer',
      },
      locals: {
        lang: 'de',
      } as App.Locals,
      slots: { default: 'my flyer content' },
    });

    expect(getByRole('group', { name: 'test-flyer' })).toBeInTheDocument();
    expect(
      getByRole('heading', { name: 'test-flyer', level: 3 }),
    ).toBeInTheDocument();
    expect(getByRole('article', { name: 'test-flyer' })).toBeInTheDocument();
    expect(getByText('my flyer content')).toBeInTheDocument();
  });
});
