import {
  type Browser,
  type BrowserContext,
  type BrowserContextOptions,
  chromium,
  type Page,
} from 'playwright';
import { type IWorldOptions, World } from '@cucumber/cucumber';
import { dev } from 'astro';

// @ts-expect-error think there is an export missing in astro
import type { DevServer } from 'astro/dist/core/dev/dev';

// TODO: inspired by https://github.com/tzero86/cucumber-typescript-playwright/blob/4f0f0dc3f6d77dbdf6fa42cd7f993940e64caa18/e2e/src/step-definitions/setup/world.ts#L12

export type Screen = {
  browser: Browser;
  context: BrowserContext;
  page: Page;
};

export class PlaywrightWorld extends World {
  screen!: Screen;
  devServer: DevServer;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(contextOptions?: BrowserContextOptions): Promise<Screen> {
    this.devServer = await this.newAstroDevServer();

    await this.screen?.page?.close();
    await this.screen?.context?.close();
    await this.screen?.browser?.close();

    const browser = await this.newBrowser();
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();
    await context.tracing.start({ screenshots: true, snapshots: true });
    this.screen = { browser, context, page };
    return this.screen;
  }

  async close(): Promise<void> {
    await this.closeBrower();
    await this.closeAstroDevServer();
  }

  private newBrowser = async (): Promise<Browser> => {
    return await chromium.launch();
  };

  private closeBrower = async (): Promise<void> => {
    await this.screen?.page?.close();
    await this.screen?.context?.close();
    await this.screen?.browser?.close();
  };

  private newAstroDevServer = async (): Promise<DevServer> => {
    return await dev({});
  };

  private closeAstroDevServer = async (): Promise<void> => {
    await this.devServer.stop();
  };
}
