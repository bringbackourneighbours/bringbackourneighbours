import type { MarkdownHeading } from 'astro';
import { describe, it, expect } from 'vitest';
import { buildToc, type NestedMarkdownHeading } from './table-of-contents';

describe('buildToc', () => {
  it('should build a nested TOC from headings', () => {
    const headings: MarkdownHeading[] = [
      { depth: 1, text: 'Title', slug: 'title' },
      { depth: 2, text: 'Section 1', slug: 'section-1' },
      { depth: 3, text: 'Subsection 1.1', slug: 'subsection-1-1' },
      { depth: 2, text: 'Section 2', slug: 'section-2' },
      { depth: 3, text: 'Subsection 2.1', slug: 'subsection-2-1' },
      { depth: 4, text: 'Subsubsection 2.1.1', slug: 'subsubsection-2-1-1' },
      { depth: 3, text: 'Subsection 2.2', slug: 'subsection-2-2' },
    ];
    const toc: NestedMarkdownHeading[] = buildToc(headings);
    expect(toc).toEqual([
      {
        depth: 2,
        slug: 'section-1',
        subheadings: [
          {
            depth: 3,
            slug: 'subsection-1-1',
            subheadings: [],
            text: 'Subsection 1.1',
          },
        ],
        text: 'Section 1',
      },
      {
        depth: 2,
        slug: 'section-2',
        subheadings: [
          {
            depth: 3,
            slug: 'subsection-2-1',
            subheadings: [
              {
                depth: 4,
                slug: 'subsubsection-2-1-1',
                subheadings: [],
                text: 'Subsubsection 2.1.1',
              },
            ],
            text: 'Subsection 2.1',
          },
          {
            depth: 3,
            slug: 'subsection-2-2',
            subheadings: [],
            text: 'Subsection 2.2',
          },
        ],
        text: 'Section 2',
      },
    ]);
  });

  it('should return empty array if only h1 is present', () => {
    const toc = buildToc([{ depth: 1, text: 'Title', slug: 'title' }]);
    expect(toc).toEqual([]);
  });

  it('should handle empty headings array', () => {
    const toc = buildToc([]);
    expect(toc).toEqual([]);
  });
});
