import { Then, When } from '@cucumber/cucumber';
import type { PlaywrightWorld } from '../support/world.ts';
import { expect } from '@playwright/test';

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
