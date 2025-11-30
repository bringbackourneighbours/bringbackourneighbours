import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';

import '../../testing/with-mocked-translation.ts';

import Toast from './Toast.astro';
import { within } from '@testing-library/dom';

describe('Toast', () => {
  it('should show a status with provided id', async () => {
    const { getByRole } = await render(Toast, {
      props: {
        id: 'mock',
      },
      slots: { default: 'Toast content' },
    });

    const toastEl = getByRole('status');

    expect(within(toastEl).getByText('Toast content')).toBeInTheDocument();

    expect(toastEl.id).toBe('mock');
  });
});
