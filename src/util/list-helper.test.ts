import { describe, it, expect } from 'vitest';
import { chunks } from './list-helper';

describe('chunks', () => {
  it('splits an array into chunks of the given size', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = Array.from(chunks(arr, 2));
    expect(result).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('returns an empty array for empty input', () => {
    const arr: number[] = [];
    const result = Array.from(chunks(arr, 3));
    expect(result).toEqual([]);
  });

  it('handles chunkSize larger than array length', () => {
    const arr = [1, 2];
    const result = Array.from(chunks(arr, 5));
    expect(result).toEqual([[1, 2]]);
  });

  it('handles chunkSize of 1', () => {
    const arr = [1, 2, 3];
    const result = Array.from(chunks(arr, 1));
    expect(result).toEqual([[1], [2], [3]]);
  });

  it('handles chunkSize equal to array length', () => {
    const arr = [1, 2, 3];
    const result = Array.from(chunks(arr, 3));
    expect(result).toEqual([[1, 2, 3]]);
  });
});
