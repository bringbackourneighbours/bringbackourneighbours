// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="astro/client" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    /**
     * when set then we are trying to print this current page: so please try to look printlike
     */
    isPrint: boolean;
    /**
     * the current context is in this language: all components can use this if not set explicitly
     */
    lang: import('./util/languages.ts').LanguagesValue;
  }
}
