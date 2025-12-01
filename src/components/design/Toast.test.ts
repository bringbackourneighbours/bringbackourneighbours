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

    // the popover is not visible per default call .showPopover() to make it appear
    const toastEl = getByRole('status', { hidden: true });

    expect(toastEl).toBeInTheDocument();
    expect(toastEl).not.toBeVisible();
    expect(within(toastEl!).getByText('Toast content')).toBeInTheDocument();
    expect(toastEl!.id).toBe('mock');
    // it would be nice to test more of this, but sadly jsdom does not support the PopoverApi (yet)
    // see: https://github.com/jsdom/jsdom/issues/3721
    // toastEl.showPopover();
    // expect(toastEl).toBeVisible();
  });
});
