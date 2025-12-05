import { describe, expect, it } from 'vitest';

import { render } from '../../testing/render.ts';
import { Languages } from '../../model/languages.ts';

import Accordion from './Accordion.astro';

describe('Accordion', () => {
  describe('In the Web', () => {
    it('should show defaults', async () => {
      const { getByRole } = await render(Accordion, {
        props: {
          title: 'title',
        },
        locals: {
          isPrint: false,
          isFlyer: false,
          isKit: false,
          lang: Languages.GERMAN,
        },
        slots: { default: 'content' },
      });

      const detailEl: HTMLDetailsElement = getByRole('group', {
        name: 'title',
      });

      expect(detailEl).toBeInTheDocument();
      expect(
        getByRole('heading', { name: 'title', level: 3 }),
      ).toBeInTheDocument();
      expect(getByRole('article', { name: 'title' })).toBeInTheDocument();
      expect(getByRole('img', { name: '' })).toBeInTheDocument();

      expect(detailEl.open).toBe(false);
      expect(detailEl.className).toContain('primary');
      expect(detailEl.className).not.toContain('is-print');
      expect(getByRole('img', { name: '' }).className).toContain(
        'inverted-primary',
      );
    });

    it('should apply the props ', async () => {
      const { getByRole, getByText } = await render(Accordion, {
        props: {
          title: 'title',
          level: 4,
          open: true,
          variant: 'secondary',
        },
        locals: {
          isPrint: false,
          isFlyer: false,
          isKit: false,
          lang: Languages.GERMAN,
        },
        slots: { default: 'content' },
      });

      const detailEl: HTMLDetailsElement = getByRole('group', {
        name: 'title',
      });

      expect(detailEl).toBeInTheDocument();
      expect(
        getByRole('heading', { name: 'title', level: 4 }),
      ).toBeInTheDocument();
      expect(getByText('content')).toBeInTheDocument();

      expect(detailEl.open).toBe(true);
      expect(detailEl.className).toContain('secondary');
      expect(getByRole('img', { name: '' }).className).toContain(
        'inverted-secondary',
      );
    });

    it('should show summary slot', async () => {
      const { getByRole, getByText } = await render(Accordion, {
        props: {
          title: 'title',
        },
        locals: {
          isPrint: false,
          isFlyer: false,
          isKit: false,
          lang: Languages.GERMAN,
        },
        slots: { default: 'content', summary: 'mySummary' },
      });

      const detailEl: HTMLDetailsElement = getByRole('group', {
        name: 'mySummary',
      });

      expect(detailEl).toBeInTheDocument();
      expect(getByRole('article', { name: 'mySummary' })).toBeInTheDocument();
      expect(getByText('content')).toBeInTheDocument();
    });
  });
  describe('In the print', () => {
    it('should show defaults', async () => {
      const { getByRole, queryByRole } = await render(Accordion, {
        props: {
          title: 'title',
        },
        locals: {
          isPrint: true,
          isFlyer: false,
          isKit: false,
          lang: Languages.GERMAN,
        },
        slots: { default: 'content' },
      });

      const detailEl: HTMLDetailsElement = getByRole('group', {
        name: 'title',
      });

      expect(detailEl).toBeInTheDocument();
      expect(
        getByRole('heading', { name: 'title', level: 3 }),
      ).toBeInTheDocument();
      expect(getByRole('article', { name: 'title' })).toBeInTheDocument();
      expect(queryByRole('img', { name: '' })).not.toBeInTheDocument();

      expect(detailEl.open).toBe(true);
      expect(detailEl.className).toContain('primary');
      expect(detailEl.className).toContain('is-print');
    });
  });
});
