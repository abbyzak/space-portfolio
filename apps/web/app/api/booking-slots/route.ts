import { NextResponse } from 'next/server';
import { db } from '@company-portfolio/database';
import type { BookingSlot } from '@company-portfolio/shared';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    const slots = await db.getAvailableSlots(date || undefined);
    return NextResponse.json(slots);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch booking slots' }, { status: 500 });
  }
}