// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="astro/client" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    /**
     * when set then we ari trying to print thi current page: so please try to look printlike
     */
    isPrint: boolean;
  }
}
