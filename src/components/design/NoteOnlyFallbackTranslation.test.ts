import type { CollectionEntry } from 'astro:content';
import type { MarkdownCollections } from '../../model/standalone-collections';
import { Languages } from '../../model/languages';
import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render';

import '../../testing/with-mocked-translation';

import NoteOnlyFallbackTranslation from './NoteOnlyFallbackTranslation.astro';

describe('NoteOnlyFallbackTranslation', () => {
  it('should show the note', async () => {
    const { getByText } = await render(NoteOnlyFallbackTranslation, {
      props: {
        entry: {
          data: {
            lang: Languages.URDU,
          },
        } as CollectionEntry<MarkdownCollections>,
      },
      locals: {
        lang: 'it',
      } as App.Locals,
    });

    expect(getByText('it-onlyInFallbackLanguage:')).toBeInTheDocument();
    expect(getByText('ur-ur')).toBeInTheDocument();
    expect(getByText('it-ur')).toBeInTheDocument();
  });
});
