import { NextResponse } from 'next/server';
import { db } from '@company-portfolio/database';
import type { Skill } from '@company-portfolio/shared';

export async function GET() {
  try {
    const skills = await db.getAll<Skill>('skills');
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}