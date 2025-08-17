import { NextResponse } from 'next/server';
import { db } from '@company-portfolio/database';
import { BookingSchema } from '@company-portfolio/shared';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slotId, clientName, clientEmail, clientPhone, company, message } = body;

    // Validate required fields
    if (!slotId || !clientName || !clientEmail || !clientPhone || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const booking = await db.bookSlot(slotId, {
      clientName,
      clientEmail,
      clientPhone,
      company: company || '',
      message,
    });

    if (!booking) {
      return NextResponse.json({ error: 'Slot not available' }, { status: 400 });
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}