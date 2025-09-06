import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Timestamp from './Timestamp.astro';
import { Languages } from '../util/languages';
import { getByRole, getByText } from '@testing-library/dom';
import { JSDOM } from 'jsdom';

// FIXME: this test depends on the content throung using useUiTranslation

describe('Timestamp', () => {
  it('should show machine readable datetime as DOM', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Timestamp, {
      props: {
        lastChecked: new Date('2025-11-31'),
        lang: Languages.FRENCH,
      },
    });

    const { document } = new JSDOM().window;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = result;

    expect(getByRole(wrapper, 'time')).toHaveAttribute(
      'datetime',
      '2025-12-01T00:00:00.000Z',
    );
  });

  it('should show machin readable datetime', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Timestamp, {
      props: {
        lastChecked: new Date('2025-11-31'),
        lang: Languages.GERMAN,
      },
    });

    expect(result).toContain('datetime="2025-12-01T00:00:00.000Z"');
  });

  it.each([
    {
      actualLang: Languages.GERMAN,
      expectedLabel: /Zuletzt aktualisiert/,
      expectedDate: '1.12.2025',
    },
    {
      actualLang: Languages.FARSI,
      expectedLabel: /آخرین به روز رسانی/,
      expectedDate: '12/1/2025',
    },
    {
      actualLang: Languages.ENGLISH,
      expectedLabel: /Last updated/,
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
      expectedLabel: RegExp;
      expectedDate: string;
    }) => {
      const container = await AstroContainer.create();
      const result = await container.renderToString(Timestamp, {
        props: {
          lastChecked: new Date('2025-11-31'),
          lang: actualLang,
        },
      });

      const { document } = new JSDOM().window;
      const wrapper = document.createElement('div');
      wrapper.innerHTML = result;

      expect(getByText(wrapper, expectedLabel)).toBeInTheDOM(wrapper);
      expect(getByText(wrapper, expectedDate)).toBeInTheDocument();
    },
  );
});
