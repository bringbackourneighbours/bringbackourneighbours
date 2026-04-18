import { After, Before, setWorldConstructor } from '@cucumber/cucumber';
import { PlaywrightWorld } from './world.ts';

setWorldConstructor(PlaywrightWorld);

Before(async function (this: PlaywrightWorld) {
  // TODO: this is not very effectiv: we now reinit the woulp browser and dev server on every scenario
  // better uses BeforeAll
  return await this.init();
});

After(async function (this: PlaywrightWorld) {
  return await this.close();
});
