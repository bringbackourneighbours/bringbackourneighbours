import { describe, expect, it } from 'vitest';
import { Languages } from '../../model/languages.ts';
import { render } from '../../testing/render.ts';

import '../../testing/with-mocked-translation.ts';

import Card from './Card.astro';

describe('Card', () => {
  it('should show content', async () => {
    const { getByText } = await render(Card, {
      slots: {
        default: 'Cardcontent',
      },
    });
    expect(getByText('Cardcontent')).toBeInTheDocument();
  });

  it('should show set default styles', async () => {
    const { getByText } = await render(Card, {
      locals: {
        lang: Languages.ENGLISH,
        isFlyer: false,
        isKit: false,
        isPrint: false,
      },
      slots: {
        default: 'Cardcontent',
      },
    });
    const cardEl = getByText('Cardcontent');
    expect(cardEl.className).toContain('ltr');
    expect(cardEl.className).toContain('-big');
    expect(cardEl.className).toContain('-primary');
  });

  it('should show set styles via props', async () => {
    const { getByText } = await render(Card, {
      props: {
        lang: Languages.PASHTO,
        size: 'small',
        variant: 'secondary',
        invalid: true,
      },
      slots: {
        default: 'Cardcontent',
      },
    });
    const cardEl = getByText('Cardcontent');
    expect(cardEl.className).toContain('rtl');
    expect(cardEl.className).toContain('-small');
    expect(cardEl.className).toContain('-secondary');
    expect(cardEl.className).toContain('-invalid');
  });
});
