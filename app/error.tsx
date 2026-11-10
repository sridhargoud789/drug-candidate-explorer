'use client';
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role='alert' className='rounded-xl bg-red-50 p-8'>
      <h1 className='text-xl font-bold'>Something went wrong</h1>
      <button
        onClick={reset}
        className='mt-4 rounded bg-blue-700 px-4 py-2 text-white'
      >
        Try again
      </button>
    </div>
  );
}
