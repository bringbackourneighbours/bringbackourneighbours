import {
  Languages,
  type LanguagesValue,
  RTL_LANGUAGES,
} from '../model/languages.ts';

export const getLanguageDirection = (lang: LanguagesValue): 'rtl' | 'ltr' => {
  return RTL_LANGUAGES.includes(lang as Languages) ? 'rtl' : 'ltr';
};
