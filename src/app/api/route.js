import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    Documentation: {
      'GET /api/products': 'Get Products',
      'POST /api/products': 'Create Product',
      'GET /api/products/[id]': 'Get Product',
      'PATCH /api/products/[id]': 'Update Product',
      'DELETE /api/products/[id]': 'Delete Product',
      'GET /api/hello': 'Hello World',
    },
  });
}
