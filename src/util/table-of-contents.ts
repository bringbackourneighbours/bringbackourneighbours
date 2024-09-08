import type { MarkdownHeading } from 'astro';

export interface NestedMarkdownHeading extends MarkdownHeading {
  subheadings: NestedMarkdownHeading[];
}

export function buildToc(headings: MarkdownHeading[]): NestedMarkdownHeading[] {
  const toc: NestedMarkdownHeading[] = [];
  const parentHeadings = new Map();
  headings.forEach((h) => {
    const heading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);
    // our markdown should not include <h1>...
    if (heading.depth === 1) {
      return;
    } else if (heading.depth === 2) {
      // so we ues h2 as top node
      toc.push(heading);
    } else {
      parentHeadings.get(heading.depth - 1).subheadings.push(heading);
    }
  });
  return toc;
}
