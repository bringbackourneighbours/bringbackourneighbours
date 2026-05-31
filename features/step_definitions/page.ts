import { Then } from '@cucumber/cucumber';
import type { PlaywrightWorld } from '../support/world.ts';
import { expect } from '@playwright/test';

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
