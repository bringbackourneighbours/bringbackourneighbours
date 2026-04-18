import { type Browser, type BrowserContext, type Page } from 'playwright';
import { type IWorldOptions, World } from '@cucumber/cucumber';

// @ts-expect-error think there is an export missing in astro
import type { DevServer } from 'astro/dist/core/dev/dev';

// TODO: inspired by https://github.com/tzero86/cucumber-typescript-playwright/blob/4f0f0dc3f6d77dbdf6fa42cd7f993940e64caa18/e2e/src/step-definitions/setup/world.ts#L12

type PlaywrightWorldParameters = {
  baseUrl: string;
  useDevServer: boolean;
};

export type Screen = {
  // TODO: do we need this? or would just the page be enough?
  browser: Browser;
  context: BrowserContext;
  page: Page;
};

export class PlaywrightWorld extends World<PlaywrightWorldParameters> {
  static browser: Browser;
  static devServer: DevServer;

  screen!: Screen;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(): Promise<Screen> {
    await this.close();

    const browser = PlaywrightWorld.browser;
    const context = await browser.newContext({
      baseURL: this.parameters.baseUrl,
    });
    const page = await context.newPage();

    this.screen = { browser, context, page };

    return this.screen;
  }

  async close(): Promise<void> {
    await this.screen?.page?.close();
    await this.screen?.context?.close();
  }
}
