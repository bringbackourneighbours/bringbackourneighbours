import { describe, expect, it } from 'vitest';
import { within } from '@testing-library/dom';
import { render } from '../../testing/render';
import { Languages } from '../../model/languages';

import '../../testing/with-mocked-translation';

import NoteMachineTranslation from './NoteMachineTranslation.astro';
import type { CollectionEntry } from 'astro:content';

describe('NoteMachineTranslation', () => {
  it('should show a strong note when set in entry', async () => {
    const { getByRole } = await render(NoteMachineTranslation, {
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
    });

    const noteEl = getByRole('note');
    expect(within(noteEl).getByRole('strong')).toBeInTheDocument();
    expect(
      within(noteEl).getByText('ar-machineTranslation'),
    ).toBeInTheDocument();
  });

  it('should show emphasis note when set in entry', async () => {
    const { getByRole } = await render(NoteMachineTranslation, {
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
    });

    const noteEl = getByRole('note');
    expect(within(noteEl).getByRole('emphasis')).toBeInTheDocument();
    expect(
      within(noteEl).getByText('de-machineTranslation'),
    ).toBeInTheDocument();
  });

  it('should not show the note when not set in entry', async () => {
    const { queryByRole } = await render(NoteMachineTranslation, {
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
    });

    expect(queryByRole('note')).not.toBeInTheDocument();
  });

  it('should not show the note when set in entry but already show in local context', async () => {
    const { queryByRole } = await render(NoteMachineTranslation, {
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
    });

    expect(queryByRole('note')).not.toBeInTheDocument();
  });
});
