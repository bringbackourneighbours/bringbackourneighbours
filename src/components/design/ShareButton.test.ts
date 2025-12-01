import { describe, expect, it } from 'vitest';
import { Languages } from '../../model/languages.ts';
import { render } from '../../testing/render.ts';

import '../../testing/with-mocked-translation.ts';

import ShareButton from './ShareButton.astro';

describe('ShareButton', () => {
  it('should show a button and status', async () => {
    const { getByRole } = await render(ShareButton, {
      props: {
        lang: Languages.FARSI,
        title: 'my title',
        text: 'my text',
        url: 'https://example.com',
      },
    });
    expect(getByRole('button', { name: 'fa-share' })).toBeInTheDocument();

    // the popover is not visible per default call .showPopover() to make it appear
    const toastEl = getByRole('status', { hidden: true });
    expect(toastEl).toContainHTML('fa-sharedLinkToClipboard');
    expect(toastEl.id).toContain('toast-share-');
    // astro will not "render" the client-side script... so we cannot test it:(
  });
});
