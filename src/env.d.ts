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
     * when set then this is a kit, so some things can be more verbose when printing
     */
    isKit: boolean;
    /**
     * when set then this is a flyer, so some things can be more compact when printing
     */
    isFlyer: boolean;
    /**
     * when set then this is a zine, so some things can be super compact when printing
     */
    isZine: boolean;
    /**
     * the current context is in this language: all components can use this if not set explicitly
     */
    lang: import('./model/languages.ts').LanguagesValue;
    /**
     * there was a note about machineTranslation displayed in the context
     * so we don't need to show the same note again
     */
    machineTranslationNoteWasDisplayed?: boolean;
    /**
     * When we embed content within other content we have to make sure the level of the headings stil makes sense
     * therefore we will set this when ever the headings need to be shifted up
     */
    levelShift?: number;
  }
}
