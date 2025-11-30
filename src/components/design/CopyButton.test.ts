import { describe, expect, it } from 'vitest';
import { Languages } from '../../model/languages.ts';
import { render } from '../../testing/render.ts';

import '../../testing/with-mocked-translation.ts';

import CopyButton from './CopyButton.astro';

describe('CopyButton', () => {
  it('should show a button and status', async () => {
    const { getByRole } = await render(CopyButton, {
      props: {
        lang: Languages.ARABIC,
      },
    });

    expect(getByRole('button', { name: 'ar-copy' })).toBeInTheDocument();
    expect(getByRole('status')).toContainHTML('ar-copiedContentToClipboard');
    expect(getByRole('status').id).toContain('toast-copy-');
    // astro will not "render" the client-side script... so we cannot test it:(
  });
});
