import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setWorldConstructor,
} from '@cucumber/cucumber';
import { PlaywrightWorld } from './world.ts';
import type { Browser } from 'playwright';
import { chromium } from 'playwright';
import { dev } from 'astro';

// @ts-expect-error think there is an export missing in astro
import type { DevServer } from 'astro/dist/core/dev/dev';

setWorldConstructor(PlaywrightWorld);

BeforeAll(async function (this) {
  PlaywrightWorld.browser = await newBrowser();
  if (this.parameters.useDevServer) {
    PlaywrightWorld.devServer = await newAstroDevServer();
  }
});

Before(async function (this: PlaywrightWorld) {
  return await this.init();
});

After(async function (this: PlaywrightWorld) {
  return await this.close();
});

AfterAll(async function (this) {
  await closeBrowser(PlaywrightWorld.browser);
  if (this.parameters.useDevServer) {
    await closeAstroDevServer(PlaywrightWorld.devServer);
  }
});
const newBrowser = async (): Promise<Browser> => {
  return await chromium.launch({
    headless: false,
  });
};

// those helper might be needed again if we also use playwright for pdf generation!
const closeBrowser = async (browser: Browser): Promise<void> => {
  await browser.close();
};

const newAstroDevServer = async (): Promise<DevServer> => {
  return await dev({});
};

const closeAstroDevServer = async (devServer: DevServer): Promise<void> => {
  await devServer.stop();
};
