import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';

import '../../testing/with-mocked-translation.ts';

import Imprint from './Imprint.astro';

describe('Imprint', () => {
  it('should in local lang', async () => {
    const { getByText } = await render(Imprint, {
      locals: {
        lang: 'de',
      } as App.Locals,
    });

    expect(
      getByText(/Kontaktgruppe Asyl und Abschiebehaft e.V./),
    ).toBeInTheDocument();
    expect(getByText(/Dresden/)).toBeInTheDocument();
    expect(getByText('de-imprint:')).toBeInTheDocument();
  });
  it('should in prop lang', async () => {
    const { getByText } = await render(Imprint, {
      props: {
        lang: 'ar',
      },
    });

    expect(
      getByText(/Kontaktgruppe Asyl und Abschiebehaft e.V./),
    ).toBeInTheDocument();
    expect(getByText(/Dresden/)).toBeInTheDocument();
    expect(getByText('ar-imprint:')).toBeInTheDocument();
  });
});
