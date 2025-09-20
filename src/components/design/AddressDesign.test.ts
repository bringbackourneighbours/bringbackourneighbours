import type { CollectionEntry } from 'astro:content';
import { describe, expect, it } from 'vitest';
import { within } from '@testing-library/dom';

import { render } from '../../testing/render.ts';
import { Languages } from '../../util/languages';

import AddressDesign from './AddressDesign.astro';

describe('AddressDesign', () => {
  describe('In the Web', () => {
    it('should show all data', async () => {
      const { getByRole, getByText, queryByText } = await render(
        AddressDesign,
        {
          props: {
            lang: Languages.GERMAN,
            entry: {
              data: {
                identifier: 'mock',
                lastChecked: new Date('2025-07-08'),
                name: 'Projekt Namenlos',
                additional: 'c/o Namhaft e.V.',
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
                twitter: 'twitter',
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
        },
      );

      expect(getByRole('group')).toBeInTheDocument();
      expect(
        within(getByRole('strong')).getByText('Projekt Namenlos'),
      ).toBeInTheDocument();

      // location
      expect(getByText(/c\/o Namhaft e\.V\./)).toBeInTheDocument();
      expect(getByText(/Am Ende 123/)).toBeInTheDocument();
      expect(getByText(/12345 Dresden/)).toBeInTheDocument();

      // contact
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
      expect(getByRole('link', { name: 'mail@hallo.de' })).toHaveAttribute(
        'href',
        'mailto:mail@hallo.de',
      );
      expect(getByRole('link', { name: 'mail1@web.de' })).toHaveAttribute(
        'href',
        'mailto:mail1@web.de',
      );
      expect(getByRole('link', { name: 'mail2@web.de' })).toHaveAttribute(
        'href',
        'mailto:mail2@web.de',
      );
      // web
      expect(getByRole('link', { name: '@facebook' })).toHaveAttribute(
        'href',
        'https://www.facebook.com/facebook',
      );
      expect(getByRole('link', { name: '@instagram' })).toHaveAttribute(
        'href',
        'https://instagram.com/instagram',
      );
      expect(getByRole('link', { name: '@telegram' })).toHaveAttribute(
        'href',
        'https://t.me/telegram',
      );
      expect(getByRole('link', { name: '@twitter' })).toHaveAttribute(
        'href',
        'https://twitter.com/twitter',
      );

      expect(getByText('Nur ein Beispiel')).toBeInTheDocument();
      expect(queryByText('Just an Example')).not.toBeInTheDocument();
    });
    it('should show translation of the note data', async () => {
      const { getByText, queryByText } = await render(AddressDesign, {
        props: {
          lang: Languages.ENGLISH,
          entry: {
            data: {
              identifier: 'mock',
              lastChecked: new Date('2025-07-08'),
              name: 'Projekt Namenlos',
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
      expect(queryByText('Nur ein Beispiel')).not.toBeInTheDocument();
      expect(getByText('Just an Example')).toBeInTheDocument();
    });
  });

  describe('In Printed Flyer', () => {
    it('should show only the web', async () => {
      const { getByRole, queryByRole, queryByText } = await render(
        AddressDesign,
        {
          props: {
            lang: Languages.GERMAN,
            entry: {
              data: {
                identifier: 'mock',
                lastChecked: new Date('2025-07-08'),
                name: 'Projekt Namenlos',
                additional: 'c/o Namhaft e.V.',
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
                twitter: 'twitter',
                translatedNotes: {
                  de: 'Nur ein Beispiel',
                  en: 'Just an Example',
                },
              },
            } as unknown as CollectionEntry<'addresses'>,
          },
          locals: {
            lang: 'en',
            isPrint: true,
            isKit: false,
            isFlyer: true,
          },
        },
      );

      expect(getByRole('group')).toBeInTheDocument();
      expect(
        within(getByRole('strong')).getByText('Projekt Namenlos'),
      ).toBeInTheDocument();

      // location
      expect(queryByText(/c\/o Namhaft e\.V\./)).not.toBeInTheDocument();
      expect(queryByText(/Am Ende 123/)).not.toBeInTheDocument();
      expect(queryByText(/12345 Dresden/)).not.toBeInTheDocument();

      // contact
      expect(
        queryByRole('link', { name: '+4917333444550' }),
      ).not.toBeInTheDocument();
      expect(
        queryByRole('link', { name: '+4917333444551' }),
      ).not.toBeInTheDocument();
      expect(
        queryByRole('link', { name: '+4917333444552' }),
      ).not.toBeInTheDocument();
      expect(
        queryByRole('link', { name: '+4917333444553' }),
      ).not.toBeInTheDocument();
      expect(
        queryByRole('link', { name: 'mail@hallo.de' }),
      ).not.toBeInTheDocument();
      expect(
        queryByRole('link', { name: 'mail1@web.de' }),
      ).not.toBeInTheDocument();
      expect(
        queryByRole('link', { name: 'mail2@web.de' }),
      ).not.toBeInTheDocument();
      // web
      expect(getByRole('link', { name: '@facebook' })).toHaveAttribute(
        'href',
        'https://www.facebook.com/facebook',
      );
      expect(getByRole('link', { name: '@instagram' })).toHaveAttribute(
        'href',
        'https://instagram.com/instagram',
      );
      expect(getByRole('link', { name: '@telegram' })).toHaveAttribute(
        'href',
        'https://t.me/telegram',
      );
      expect(getByRole('link', { name: '@twitter' })).toHaveAttribute(
        'href',
        'https://twitter.com/twitter',
      );

      expect(queryByText('Nur ein Beispiel')).not.toBeInTheDocument();
      expect(queryByText('Just an Example')).not.toBeInTheDocument();
    });
  });
});
