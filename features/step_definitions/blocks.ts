import { Then } from '@cucumber/cucumber';
import type { PlaywrightWorld } from '../support/world.ts';
import { expect } from '@playwright/test';

Then(
  'i see a heading {string}',
  async function (this: PlaywrightWorld, expectedHeading: string) {
    await expect(
      this.screen.page.getByRole('heading', { name: expectedHeading }),
    ).toBeVisible();
  },
);

Then(
  'i see a language tag {string}',
  async function (this: PlaywrightWorld, name: string) {
    await expect(
      this.screen.page.getByRole('complementary').getByText(name),
    ).toBeVisible();
  },
);

Then(
  'there is a hidden footer template',
  async function (this: PlaywrightWorld) {
    expect(this.screen.page.locator('template#footerTemplate')).toBeTruthy();
  },
);

Then(
  'i see a table of contents labeled {string} with {int} items',
  async function (this: PlaywrightWorld, label: string, count: number) {
    const tocNav = this.screen.page.getByRole('navigation', { name: label });

    await expect(tocNav).toBeVisible();
    expect(await tocNav.getByRole('listitem').count()).toBe(count);
  },
);

Then(
  'i see a role {string} with name {string}',
  async function (
    this: PlaywrightWorld,
    role:
      | 'alert'
      | 'alertdialog'
      | 'application'
      | 'article'
      | 'banner'
      | 'blockquote'
      | 'button'
      | 'caption'
      | 'cell'
      | 'checkbox'
      | 'code'
      | 'columnheader'
      | 'combobox'
      | 'complementary'
      | 'contentinfo'
      | 'definition'
      | 'deletion'
      | 'dialog'
      | 'directory'
      | 'document'
      | 'emphasis'
      | 'feed'
      | 'figure'
      | 'form'
      | 'generic'
      | 'grid'
      | 'gridcell'
      | 'group'
      | 'heading'
      | 'img'
      | 'insertion'
      | 'link'
      | 'list'
      | 'listbox'
      | 'listitem'
      | 'log'
      | 'main'
      | 'marquee'
      | 'math'
      | 'meter'
      | 'menu'
      | 'menubar'
      | 'menuitem'
      | 'menuitemcheckbox'
      | 'menuitemradio'
      | 'navigation'
      | 'none'
      | 'note'
      | 'option'
      | 'paragraph'
      | 'presentation'
      | 'progressbar'
      | 'radio'
      | 'radiogroup'
      | 'region'
      | 'row'
      | 'rowgroup'
      | 'rowheader'
      | 'scrollbar'
      | 'search'
      | 'searchbox'
      | 'separator'
      | 'slider'
      | 'spinbutton'
      | 'status'
      | 'strong'
      | 'subscript'
      | 'superscript'
      | 'switch'
      | 'tab'
      | 'table'
      | 'tablist'
      | 'tabpanel'
      | 'term'
      | 'textbox'
      | 'time'
      | 'timer'
      | 'toolbar'
      | 'tooltip'
      | 'tree'
      | 'treegrid'
      | 'treeitem',
    name: string,
  ) {
    await expect(this.screen.page.getByRole(role, { name })).toBeVisible();
  },
);

Then(
  'i see a text asking for feedback with text containing {string}',
  async function (this: PlaywrightWorld, feedbackText: string) {
    const feedbackParagraph = this.screen.page.getByText(feedbackText);
    await expect(feedbackParagraph).toBeVisible();

    const mailLink = feedbackParagraph.getByRole('link', {
      name: 'info@bringbackourneighbours.de',
    });
    await expect(mailLink).toBeVisible();

    await expect(mailLink).toHaveAttribute(
      'href',
      'mailto:info@bringbackourneighbours.de',
    );
  },
);

Then(
  'i see a link {string} to {string} in language {string}',
  async function (
    this: PlaywrightWorld,
    expectedLinkLabel: string,
    expectedLinkHref: string,
    expectedHrefLang: string,
  ) {
    const link = this.screen.page.getByRole('link', {
      name: expectedLinkLabel,
    });
    await expect(link).toHaveAttribute('href', new RegExp(expectedLinkHref));
    await expect(link).toHaveAttribute('hreflang', expectedHrefLang);
  },
);

Then(
  'i see an article {string} with a link {string} to {string}',
  async function (
    this: PlaywrightWorld,
    articleLabel: string,
    expectedLinkLabel: string,
    expectedLinkHref: string,
  ) {
    const article = this.screen.page
      .getByRole('article', {
        name: articleLabel,
      })
      .first();

    console.log('ARTICEL', await article.ariaSnapshot());
    await expect(article).toBeVisible();
    await expect(
      article.getByRole('link', { name: expectedLinkLabel }),
    ).toHaveAttribute('href', expectedLinkHref);
  },
);
