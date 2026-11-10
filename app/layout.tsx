import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = {
  title: 'Drug Candidate Explorer',
  description: 'Demo drug candidate discovery dashboard',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body>
        <header className='border-b border-slate-200 bg-white'>
          <div className='mx-auto flex max-w-6xl items-center justify-between px-5 py-5'>
            <Link
              href='/'
              className='flex items-center gap-3 font-bold text-xl text-slate-900'
            >
              <span className='rounded-xl bg-blue-700 px-3 py-2 text-white'>
                D
              </span>
              Drug Candidate Explorer
            </Link>
          </div>
        </header>
        <main className='mx-auto max-w-6xl px-5 py-10'>{children}</main>
      </body>
    </html>
  );
}
