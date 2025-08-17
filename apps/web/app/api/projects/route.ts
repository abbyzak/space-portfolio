import { NextResponse } from 'next/server';
import { db } from '@company-portfolio/database';
import type { Project } from '@company-portfolio/shared';

export async function GET() {
  try {
    const projects = await db.getAll<Project>('projects');
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}