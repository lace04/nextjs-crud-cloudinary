import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ message: 'Get Product' });
}

export function PATCH() {
  return NextResponse.json({ message: 'Update Product' });
}

export function DELETE() {
  return NextResponse.json({ message: 'Delete Product' });
}
