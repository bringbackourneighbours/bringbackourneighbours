import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';
import { Languages } from '../../util/languages';
import AddressDesign from './AddressDesign.astro';
import type { CollectionEntry } from 'astro:content';

describe('AddressDesign', () => {
  describe('In the Web', () => {
    it('should show all data in web', async () => {
      const { getByRole } = await render(AddressDesign, {
        props: {
          lang: Languages.GERMAN,
          entry: {
            data: {
              identifier: 'mock',
              lastChecked: new Date('2025-07-08'),
              name: 'Projekt Namenlos',
              additional: 'c/o Namelos e.V.',
              streetLine: 'Am Ende 123',
              zip: '12345',
              city: 'Dresden',
              mail: 'mail@hallo.de',
              mails: ['mail1@web.de', 'mail2@web.de'],
              phone: '+4917333444550',
              phones: ['+4917333444551', '+4917333444552', '+4917333444553'],
              url: 'example.com',
              facebook: 'facebook',
              instagram: 'instagram',
              telegram: 'telegram',
              twitter: 'twitter', // bbon: 'slug', // FIXME: this is hard to test
              translatedNotes: {
                de: 'Nur ein Beispiel',
                en: 'Just an Example',
              },
            },
          } as unknown as CollectionEntry<'addresses'>,
        },
        locals: {
          lang: 'en',
          isPrint: false,
          isKit: false,
          isFlyer: true,
        },
      });

      expect(getByRole('group')).toBeInTheDocument();
      expect(getByRole('strong')).toBeInTheDocument();

      expect(getByRole('link', { name: '+4917333444550' })).toHaveAttribute(
        'href',
        'tel:+4917333444550',
      );
      expect(getByRole('link', { name: '+4917333444551' })).toHaveAttribute(
        'href',
        'tel:+4917333444551',
      );
      expect(getByRole('link', { name: '+4917333444552' })).toHaveAttribute(
        'href',
        'tel:+4917333444552',
      );
      expect(getByRole('link', { name: '+4917333444553' })).toHaveAttribute(
        'href',
        'tel:+4917333444553',
      );
    });
  });
});
