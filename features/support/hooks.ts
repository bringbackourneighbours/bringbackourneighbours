import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  setDefaultTimeout,
  setWorldConstructor,
} from '@cucumber/cucumber';
import { PlaywrightWorld } from './world.ts';
import type { Browser } from 'playwright';
import { chromium } from 'playwright';
import { dev } from 'astro';

interface DevServer {
  //  think there is an export missing in astro, so we define it ourselves
  stop(): Promise<void>;
}

setWorldConstructor(PlaywrightWorld);

BeforeAll(async function (this) {
  PlaywrightWorld.browser = await newBrowser(!!this.parameters?.headless);
  if (this.parameters.useDevServer) {
    PlaywrightWorld.devServer = await newAstroDevServer();
  }

  if (this.parameters.timeout) {
    setDefaultTimeout(this.parameters.timeout as number);
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

// those helper might be needed again if we also use playwright for pdf generation!
const newBrowser = async (headless: boolean): Promise<Browser> => {
  return await chromium.launch({ headless });
};

const closeBrowser = async (browser: Browser): Promise<void> => {
  await browser.close();
};

const newAstroDevServer = async (): Promise<DevServer> => {
  return await dev({});
};

const closeAstroDevServer = async (devServer: DevServer): Promise<void> => {
  await devServer.stop();
};
