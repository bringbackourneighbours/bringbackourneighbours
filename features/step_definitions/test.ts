import { Then, When } from '@cucumber/cucumber';
import type { PlaywrightWorld } from '../support/world.ts';
import { expect } from '@playwright/test';

// TODO: best split those in to smaller files

When(/^a step is passing$/, function () {});

When(
  'i open the page {string}',
  async function (this: PlaywrightWorld, url: string) {
    await this.screen.page.goto(url);
  },
);

Then(
  'i see a title containing {string}',
  async function (this: PlaywrightWorld, expectedTitle: RegExp) {
    await expect(this.screen.page).toHaveTitle(new RegExp(expectedTitle));
  },
);

Then(
  'i see a url containing {string}',
  async function (this: PlaywrightWorld, expectedUrl: RegExp) {
    await this.screen.page.waitForURL(new RegExp(expectedUrl));
    expect(this.screen.page.url()).toMatch(new RegExp(expectedUrl));
  },
);

Then(
  'i see a heading {string}',
  async function (this: PlaywrightWorld, expectedHeading: string) {
    await expect(
      this.screen.page.getByRole('heading', { name: expectedHeading }),
    ).toBeVisible();
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
