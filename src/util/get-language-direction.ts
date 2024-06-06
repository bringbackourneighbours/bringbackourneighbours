import { Languages, RTL_LANGUAGES } from './languages.enum.ts';

export const getLanguageDirection = (lang: string): 'rtl' | 'ltr' => {
  // TODO: we could check that the lang is actually a language.
  return RTL_LANGUAGES.includes(lang as Languages) ? 'rtl' : 'ltr';
};
