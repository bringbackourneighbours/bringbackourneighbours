import { When } from '@cucumber/cucumber';
import type { PlaywrightWorld } from '../support/world.ts';
import { expect } from '@playwright/test';

When(
  'i open the page {string}',
  async function (this: PlaywrightWorld, url: string) {
    await this.screen.page.goto(url);
  },
);

When(
  'i open the navigation menu labeled {string}',
  async function (this: PlaywrightWorld, label: string) {
    this.screen.page
      .getByRole('button', { name: label, expanded: false })
      .click();
  },
);

When(
  'i switch to the language {string} with the language switcher labeled {string}',
  async function (this: PlaywrightWorld, languageLabel: string, switcherLabel) {
    const switcher = this.screen.page.getByRole('navigation', {
      name: switcherLabel,
    });
    const languageLink = switcher.getByRole('link', { name: languageLabel });

    if ((await languageLink.count()) === 0) {
      await switcher.getByRole('button').click();
    }

    await expect(languageLink).toBeVisible();

    const href = await languageLink.getAttribute('href');
    if (!href) {
      throw new Error(`the language chip "${languageLabel}" links nowhere`);
    }
    await languageLink.click();
    await this.screen.page.waitForURL(new RegExp(href));
  },
);
