import records from '@/data/drugs.json';
import type { Drug, DrugPage, DrugStatus } from '@/lib/types';
const drugs = records as Drug[];
export const STATUSES: DrugStatus[] = [
  'In Development',
  'Approved',
  'Clinical Trial',
  'On Hold',
];
export function listDrugs({
  search = '',
  status = '',
  page = 1,
  pageSize = 6,
}: {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
} = {}): DrugPage {
  const query = search.trim().toLocaleLowerCase();
  const filtered = drugs.filter(
    (d) =>
      d.name.toLocaleLowerCase().includes(query) &&
      (!status || d.status === status),
  );
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  return {
    items: filtered.slice((page - 1) * pageSize, page * pageSize),
    total,
    page,
    pageSize,
    totalPages,
  };
}
export function getDrug(id: string): Drug | undefined {
  return drugs.find((d) => d.id === id);
}
