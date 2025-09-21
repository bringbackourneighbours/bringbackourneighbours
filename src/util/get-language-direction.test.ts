import { describe, expect, it } from 'vitest';
import { getLanguageDirection } from './get-language-direction';
import type { LanguagesValue } from '../model/languages.ts';

describe('getLanguageDirection', () => {
  it('returns ltr as default', () => {
    expect(getLanguageDirection(undefined as unknown as LanguagesValue)).toBe(
      'ltr',
    );
    expect(getLanguageDirection('' as unknown as LanguagesValue)).toBe('ltr');
    expect(getLanguageDirection(null as unknown as LanguagesValue)).toBe('ltr');
    expect(
      getLanguageDirection('notALanguage' as unknown as LanguagesValue),
    ).toBe('ltr');
  });

  it('returns ltr for LTR languages', () => {
    // Test with some common RTL languages
    expect(getLanguageDirection('de')).toBe('ltr');
    expect(getLanguageDirection('fr')).toBe('ltr');
    expect(getLanguageDirection('uk')).toBe('ltr');
    expect(getLanguageDirection('bs')).toBe('ltr');
  });

  it('returns rtl for RTL languages', () => {
    // Test with some common RTL languages
    expect(getLanguageDirection('ar')).toBe('rtl');
    expect(getLanguageDirection('fa')).toBe('rtl');
    expect(getLanguageDirection('ur')).toBe('rtl');
    expect(getLanguageDirection('ps')).toBe('rtl');
  });
});
