import type { MarkdownHeading } from 'astro';

export interface NestedMarkdownHeading extends MarkdownHeading {
  subheadings: NestedMarkdownHeading[];
}

/**
 * we shift all the heading one level up as we will not include ghe one h1 per page
 * the TOC should "start" with the h2 as root
 *
 *
 * @param headings the heaidng info as astro will render it from the markdown
 * TODO: the heading with blocks are not registered here, would be nice to so how show them
 */
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
