'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, RotateCcw } from 'lucide-react';
import { StatusBadge } from '@/components/status-badge';
import type { DrugPage } from '@/lib/types';

const PAGE_SIZE = 6;

export function DrugExplorer() {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<DrugPage | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(input.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [input]);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams({
          search,
          status,
          page: String(page),
          pageSize: String(PAGE_SIZE),
        });
        const response = await fetch(`/api/drugs?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error('Unable to load drug candidates. Please try again.');
        const payload: DrugPage = await response.json();
        if (!controller.signal.aborted) setResult(payload);
      } catch (e) {
        if (!controller.signal.aborted)
          setError(e instanceof Error ? e.message : 'Unexpected error');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [search, status, page, retry]);
  
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
          Explore drug candidates
        </h1>
        <p className='mt-3 max-w-2xl text-slate-600'>
          Search and review a sample pharmaceutical research pipeline. Discover
          candidate details, status and therapeutic areas.
        </p>
      </div>
      <section
        aria-label='Search and filter candidates'
        className='mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row'
      >
        <label className='relative flex-1'>
          <span className='sr-only'>Search by drug name</span>
          <Search
            aria-hidden='true'
            size={19}
            className='absolute left-4 top-3.5 text-slate-400'
          />
          <input
            className='w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600'
            placeholder='Search drug candidates by name...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <label className='sm:w-52'>
          <span className='sr-only'>Filter by status</span>
          <select
            className='w-full rounded-xl border border-slate-300 bg-white px-4 py-3'
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value=''>All statuses</option>
            <option>In Development</option>
            <option>Approved</option>
            <option>Clinical Trial</option>
            <option>On Hold</option>
          </select>
        </label>
        <button
          className='flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 hover:bg-slate-50'
          onClick={() => {
            setInput('');
            setSearch('');
            setStatus('');
            setPage(1);
          }}
        >
          <RotateCcw size={16} /> Reset
        </button>
      </section>
      <div className='mb-4 flex justify-between text-sm text-slate-600'>
        <p role='status' aria-live='polite'>
          {loading
            ? 'Loading candidates...'
            : error
              ? 'Could not load candidates'
              : `${result?.total ?? 0} candidates found`}
        </p>
        <span>
          Page {page} of {result?.totalPages ?? 1}
        </span>
      </div>
      {error ? (
        <div
          role='alert'
          className='rounded-xl border border-red-200 bg-red-50 p-6 text-red-800'
        >
          {error}
          <button
            onClick={() => setRetry((x) => x + 1)}
            className='ml-4 font-bold underline'
          >
            Retry
          </button>
        </div>
      ) : loading ? (
        <div
          className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'
          aria-label='Loading'
        >
          <div className='h-52 animate-pulse rounded-2xl bg-slate-200' />
          <div className='h-52 animate-pulse rounded-2xl bg-slate-200' />
          <div className='h-52 animate-pulse rounded-2xl bg-slate-200' />
        </div>
      ) : result?.items.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center'>
          <h2 className='text-xl font-semibold'>No candidates found</h2>
          <p className='mt-2 text-slate-600'>
            Try a different name or status filter.
          </p>
        </div>
      ) : (
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {result?.items.map((drug) => (
            <Link
              key={drug.id}
              href={`/drugs/${drug.id}`}
              className='group flex min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md'
            >
              <div className='mb-5 flex items-center justify-between gap-2'>
                <StatusBadge status={drug.status} />
                <span className='text-xs text-slate-500'>
                  {drug.therapeuticArea}
                </span>
              </div>
              <h2 className='text-xl font-bold text-slate-900'>{drug.name}</h2>
              <p className='mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600'>
                {drug.description}
              </p>
              <span className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700'>
                View details{' '}
                <ArrowRight
                  size={16}
                  className='transition group-hover:translate-x-1'
                />
              </span>
            </Link>
          ))}
        </div>
      )}
      {!loading && !error && (result?.totalPages ?? 0) > 1 && (
        <nav
          aria-label='Pagination'
          className='mt-8 flex items-center justify-center gap-4'
        >
          <button
            className='rounded-lg border border-slate-300 bg-white px-5 py-2 disabled:opacity-40'
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          <span className='text-sm'>
            {page} / {result?.totalPages}
          </span>
          <button
            className='rounded-lg border border-slate-300 bg-white px-5 py-2 disabled:opacity-40'
            disabled={page >= (result?.totalPages ?? 1)}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
