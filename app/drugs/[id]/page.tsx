import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { StatusBadge } from '@/components/status-badge';
import { getDrug } from '@/lib/repository';
export default async function DrugDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const drug = getDrug(id);
  if (!drug) notFound();
  return (
    <div className='max-w-4xl'>
      <Link
        href='/'
        className='mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline'
      >
        <ArrowLeft size={17} /> Back to candidates
      </Link>
      <div className='rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10'>
        <div className='mb-5 flex flex-wrap items-center gap-3'>
          <StatusBadge status={drug.status} />
          <span className='text-sm text-slate-500'>{drug.therapeuticArea}</span>
        </div>
        <h1 className='text-3xl font-bold sm:text-4xl'>{drug.name}</h1>
        <p className='mt-5 text-lg leading-8 text-slate-600'>
          {drug.description}
        </p>
        <div className='my-8 border-t border-slate-200' />
        <dl className='grid gap-7 sm:grid-cols-2'>
          <div>
            <dt className='text-sm font-semibold text-slate-500'>
              Development phase
            </dt>
            <dd className='mt-2 font-medium'>{drug.phase}</dd>
          </div>
          <div>
            <dt className='text-sm font-semibold text-slate-500'>
              Therapeutic area
            </dt>
            <dd className='mt-2 font-medium'>{drug.therapeuticArea}</dd>
          </div>
          <div className='sm:col-span-2'>
            <dt className='text-sm font-semibold text-slate-500'>
              Mechanism of action
            </dt>
            <dd className='mt-2 leading-7'>{drug.mechanismOfAction}</dd>
          </div>
          <div className='sm:col-span-2'>
            <dt className='text-sm font-semibold text-slate-500'>
              Potential side effects
            </dt>
            <dd className='mt-2'>
              <ul className='list-inside list-disc space-y-1'>
                {drug.sideEffects.map((effect) => (
                  <li key={effect}>{effect}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className='text-sm font-semibold text-slate-500'>
              Last updated
            </dt>
            <dd className='mt-2'>{drug.updatedAt}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
