import { describe, it, expect } from 'vitest';
import { listDrugs, getDrug } from '../lib/repository';

describe('drug repository', () => {
  it('filters names case-insensitively', () => {
    const r = listDrugs({ search: 'ONCORA' });

    expect(r.total).toBeGreaterThan(0);

    expect(
      r.items.every((drug) => drug.name.toLowerCase().includes('oncora')),
    ).toBe(true);

    expect(r.items[0].name).toBe('Oncora-101');
  });

  it('filters by status', () => {
    const r = listDrugs({ status: 'Approved' });

    expect(r.total).toBeGreaterThan(0);
    expect(r.items.every((drug) => drug.status === 'Approved')).toBe(true);
  });

  it('paginates consistently', () => {
    const first = listDrugs({ page: 1, pageSize: 10 });
    const second = listDrugs({ page: 2, pageSize: 10 });

    expect(first.items).toHaveLength(10);
    expect(second.items).toHaveLength(10);
    expect(first.items[0].id).not.toBe(second.items[0].id);
  });

  it('returns undefined for missing IDs', () => {
    expect(getDrug('99999')).toBeUndefined();
  });

  it('returns an empty result for unmatched names', () => {
    const r = listDrugs({ search: 'NONEXISTENT-DRUG' });

    expect(r.total).toBe(0);
    expect(r.items).toHaveLength(0);
  });
});
