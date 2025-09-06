import { describe, expect, it } from 'vitest';
import { Languages } from '../util/languages';
import { render } from '../testing/render.ts';

import '../testing/with-mocked-translation.ts';

import Timestamp from './Timestamp.astro';

describe('Timestamp', () => {
  it('should show machine readable datetime as DOM', async () => {
    const { getByRole } = await render(Timestamp, {
      props: {
        lastChecked: new Date('2025-11-31'),
        lang: Languages.FRENCH,
      },
    });

    expect(getByRole('time')).toHaveAttribute(
      'datetime',
      '2025-12-01T00:00:00.000Z',
    );
  });

  it.each([
    {
      actualLang: Languages.GERMAN,
      expectedLabel: 'de-updated',
      expectedDate: '1.12.2025',
    },
    {
      actualLang: Languages.FARSI,
      expectedLabel: 'fa-updated',
      expectedDate: '۱۴۰۴/۹/۱۰',
    },
    {
      actualLang: Languages.ENGLISH,
      expectedLabel: 'en-updated',
      expectedDate: '12/1/2025',
    },
  ])(
    'should show the date in $actualLang',
    async ({
      actualLang,
      expectedLabel,
      expectedDate,
    }: {
      actualLang: Languages;
      expectedLabel: string;
      expectedDate: string;
    }) => {
      const { getByText } = await render(Timestamp, {
        props: {
          lastChecked: new Date('2025-11-31'),
          lang: actualLang,
        },
      });

      expect(getByText(expectedLabel)).toBeInTheDocument();
      expect(getByText(expectedDate)).toBeInTheDocument();
    },
  );
});
