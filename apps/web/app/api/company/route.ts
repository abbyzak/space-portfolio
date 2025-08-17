import { NextResponse } from 'next/server';
import { db } from '@company-portfolio/database';

export async function GET() {
  try {
    const company = await db.getCompany();
    return NextResponse.json(company);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch company data' }, { status: 500 });
  }
}