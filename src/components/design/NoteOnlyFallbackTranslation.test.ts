import type { CollectionEntry } from 'astro:content';
import type { MarkdownCollections } from '../../model/standalone-collections.ts';
import { Languages } from '../../model/languages.ts';
import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';

import '../../testing/with-mocked-translation.ts';

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
