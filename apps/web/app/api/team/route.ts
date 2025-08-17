import { NextResponse } from 'next/server';
import { db } from '@company-portfolio/database';
import type { TeamMember } from '@company-portfolio/shared';

export async function GET() {
  try {
    const team = await db.getAll<TeamMember>('team');
    return NextResponse.json(team);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch team data' }, { status: 500 });
  }
}