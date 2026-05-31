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
    const article = this.screen.page.getByRole('article', {
      name: articleLabel,
    });
    await expect(article).toBeVisible();
    await expect(
      article.getByRole('link', { name: expectedLinkLabel }),
    ).toHaveAttribute('href', expectedLinkHref);
  },
);
