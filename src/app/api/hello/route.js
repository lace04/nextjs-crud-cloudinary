import { NextResponse } from 'next/server';
import { dbConnect } from '@/libs/mysql';

export async function GET() {
  const result = await dbConnect.query('SELECT NOW()');
  return NextResponse.json({
    message: result[0]['NOW()'],
  });
}
