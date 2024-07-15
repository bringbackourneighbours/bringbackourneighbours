import { type LanguagesValue, RTL_LANGUAGES, Languages } from './languages.ts';

export const getLanguageDirection = (lang: LanguagesValue): 'rtl' | 'ltr' => {
  return RTL_LANGUAGES.includes(lang as Languages) ? 'rtl' : 'ltr';
};
