import { When } from '@cucumber/cucumber';
import type { PlaywrightWorld } from '../support/world.ts';

When(
  'i open the page {string}',
  async function (this: PlaywrightWorld, url: string) {
    await this.screen.page.goto(url);
  },
);
