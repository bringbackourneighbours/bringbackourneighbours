import { describe, expect, it } from 'vitest';
import { within } from '@testing-library/dom';
import { render } from '../../testing/render.ts';
import { Languages } from '../../model/languages.ts';

import '../../testing/with-mocked-translation.ts';

import NoteMachineTranslation from './NoteMachineTranslation.astro';
import type { CollectionEntry } from 'astro:content';

describe('NoteMachineTranslation', () => {
  it('should show a strong note when set in entry', async () => {
    const { getByRole, getByText } = await render(NoteMachineTranslation, {
      props: {
        entry: {
          data: {
            machineTranslation: true,
            identifier: 'test',
            lastChecked: new Date(),
            lang: Languages.ARABIC,
            title: 'test',
            seo: 'test content',
          },
        } as CollectionEntry<'flyers'>,
      },
      locals: {
        lang: 'de',
      } as App.Locals,
      slots: { default: 'my flyer' },
    });

    const noteEl = getByRole('note');
    expect(within(noteEl).getByRole('strong')).toBeInTheDocument();
    expect(
      within(noteEl).getByText('ar-machineTranslation'),
    ).toBeInTheDocument();

    expect(getByText('my flyer')).toBeInTheDocument();
  });

  it('should show emphasis note when set in entry', async () => {
    const { getByRole, getByText } = await render(NoteMachineTranslation, {
      props: {
        isStrong: false,
        entry: {
          data: {
            machineTranslation: true,
            identifier: 'test',
            lastChecked: new Date(),
            lang: Languages.GERMAN,
            title: 'test',
            seo: 'test content',
          },
        } as CollectionEntry<'kits'>,
      },
      locals: {
        lang: 'de',
      } as App.Locals,
      slots: { default: 'my kit' },
    });

    const noteEl = getByRole('note');
    expect(within(noteEl).getByRole('emphasis')).toBeInTheDocument();
    expect(
      within(noteEl).getByText('de-machineTranslation'),
    ).toBeInTheDocument();

    expect(getByText('my kit')).toBeInTheDocument();
  });

  it('should not show the note when not set in entry', async () => {
    const { queryByRole, getByText } = await render(NoteMachineTranslation, {
      props: {
        entry: {
          data: {
            machineTranslation: false,
            identifier: 'test',
            lastChecked: new Date(),
            lang: Languages.TURKISH,
            title: 'test',
            seo: 'test content',
          },
        } as CollectionEntry<'pages'>,
      },
      locals: {
        lang: 'en',
      } as App.Locals,
      slots: { default: 'my pages' },
    });

    expect(queryByRole('note')).not.toBeInTheDocument();
    expect(getByText('my pages')).toBeInTheDocument();
  });

  it('should not show the note when set in entry but already show in local context', async () => {
    const { queryByRole, getByText } = await render(NoteMachineTranslation, {
      props: {
        entry: {
          data: {
            machineTranslation: true,
            identifier: 'test',
            lastChecked: new Date(),
            lang: Languages.TURKISH,
            title: 'test',
            seo: 'test content',
          },
        } as CollectionEntry<'pages'>,
      },
      locals: {
        lang: 'en',
        machineTranslationNoteWasDisplayed: true,
      } as App.Locals,
      slots: { default: 'my pages' },
    });

    expect(queryByRole('note')).not.toBeInTheDocument();
    expect(getByText('my pages')).toBeInTheDocument();
  });
});
