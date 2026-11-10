import Link from 'next/link';
export default function NotFound() {
  return (
    <div className='py-24 text-center'>
      <h1 className='text-3xl font-bold'>Candidate not found</h1>
      <p className='mt-3 text-slate-600'>This drug candidate does not exist.</p>
      <Link className='mt-6 inline-block text-blue-700 underline' href='/'>
        Return to candidate list
      </Link>
    </div>
  );
}
