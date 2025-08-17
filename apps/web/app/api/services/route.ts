import { NextResponse } from 'next/server';
import { db } from '@company-portfolio/database';
import type { Service } from '@company-portfolio/shared';

export async function GET() {
  try {
    const services = await db.getAll<Service>('services');
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}