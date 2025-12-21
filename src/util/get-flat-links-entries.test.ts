import { describe, expect, it } from 'vitest';
import { getAllExternalLinksEntries } from './get-flat-links-entries.ts';

describe('getAllExternalLinksEntries', async () => {
  it('return on empty', async () => {
    const result = await getAllExternalLinksEntries([]);
    expect(result).toEqual([]);
  });

  it('should reduce the entries', async () => {
    const result = await getAllExternalLinksEntries([
      {
        id: 'id1',
        filePath: 'filePath1.yml',
        collection: 'links',
        data: {
          all: {
            type: 'AUDIO',
            lastChecked: new Date('2012-12-12'),
            noCheckUntil: new Date('2024-02-04'),
          },
          de: {
            slug: 'slugde',
            url: 'example.de',
          },
          en: {
            slug: 'slugen',
            url: 'example.com',
          },
        },
      },
      {
        id: 'id2',
        filePath: 'filePath2.yml',
        collection: 'links',
        data: {
          de: {
            slug: 'slugde',
            url: 'example.de',
            type: 'DOC',
            lastChecked: new Date('2012-12-12'),
          },
          en: {
            slug: 'slugde',
            url: 'example.de',
            type: 'VIDEO',
          },
        },
      },
    ]);
    expect(result).toEqual([
      {
        filePath: 'filePath1.yml',
        lastChecked: new Date('2012-12-12'),
        noCheckUntil: new Date('2024-02-04'),
        slug: 'slugde',
        url: 'example.de',
      },
      {
        filePath: 'filePath1.yml',
        lastChecked: new Date('2012-12-12'),
        noCheckUntil: new Date('2024-02-04'),
        slug: 'slugen',
        url: 'example.com',
      },
      {
        filePath: 'filePath2.yml',
        lastChecked: new Date('2012-12-12'),
        noCheckUntil: undefined,
        slug: 'slugde',
        type: 'DOC',
        url: 'example.de',
      },
      {
        filePath: 'filePath2.yml',
        lastChecked: undefined,
        noCheckUntil: undefined,
        slug: 'slugde',
        type: 'VIDEO',
        url: 'example.de',
      },
    ]);
  });
});
