import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';

import Stack from './Stack.astro';

describe('Stack', () => {
  it('should render the content of the slots', async () => {
    const { getByText } = await render(Stack, {
      slots: {
        heading: '<span>Heading</span>',
        default: '<div>Item 1</div><div>Item 2</div><div>Item 3</div>',
      },
    });
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
    expect(getByText('Item 3')).toBeInTheDocument();
    expect(getByText('Heading')).toBeInTheDocument();
  });
});
