import { NextRequest, NextResponse } from 'next/server';
import { listDrugs, STATUSES } from '@/lib/repository';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams;
  const rawPage = q.get('page') ?? '1';
  const rawSize = q.get('pageSize') ?? '6';
  const page = Number(rawPage),
    pageSize = Number(rawSize);

  const status = q.get('status') ?? '';
  if (
    !Number.isSafeInteger(page) ||
    page < 1 ||
    !Number.isSafeInteger(pageSize) ||
    pageSize < 1 ||
    pageSize > 100
  )
    return NextResponse.json(
      { error: 'Invalid pagination parameters' },
      { status: 400 },
    );

  if (status && !STATUSES.includes(status as (typeof STATUSES)[number]))
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });

  return NextResponse.json(
    listDrugs({ search: q.get('search') ?? '', status, page, pageSize }),
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
