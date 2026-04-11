import { describe, expect, it } from 'vitest';
import { render } from '../../testing/render.ts';

import TranslationTableRow from './TranslationTableRow.astro';

describe('TranslationTableRow', () => {
  it('should render table rows with id, from, and to slots', async () => {
    const { getByText } = await render(TranslationTableRow, {
      slots: {
        id: '<span>id</span>',
        fromDate: '<span>fromDate</span>',
        toDate: '<span>toDate</span>',
        from: '<span>from</span>',
        to: '<span>to</span>',
      },
    });

    expect(getByText('id')).toBeInTheDocument();
    expect(getByText('from')).toBeInTheDocument();
    expect(getByText('to')).toBeInTheDocument();
    expect(getByText('fromDate')).toBeInTheDocument();
    expect(getByText('toDate')).toBeInTheDocument();

  });
});
