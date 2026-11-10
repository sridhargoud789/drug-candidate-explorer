import { NextResponse } from 'next/server';
import { getDrug } from '@/lib/repository';
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const drug = getDrug(id);
  if (!drug)
    return NextResponse.json({ error: 'Drug not found' }, { status: 404 });
  return NextResponse.json(drug);
}
