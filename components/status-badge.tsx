import type { DrugStatus } from '@/lib/types';
const classes: Record<DrugStatus, string> = {
  Approved: 'bg-emerald-100 text-emerald-800',
  'In Development': 'bg-blue-100 text-blue-800',
  'Clinical Trial': 'bg-violet-100 text-violet-800',
  'On Hold': 'bg-amber-100 text-amber-800',
};
export function StatusBadge({ status }: { status: DrugStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classes[status]}`}
    >
      {status}
    </span>
  );
}
