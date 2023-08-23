import { NextResponse } from 'next/server';
import { dbConnect } from '@/libs/mysql';

export async function GET() {
  try {
    const results = await dbConnect.query(`SELECT * FROM products`);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { name, description, price } = await request.json();

    const result = await dbConnect.query(`INSERT INTO products SET ?`, {
      name,
      description,
      price,
    });

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Failed to insert product' });
    }

    return NextResponse.json({
      name,
      description,
      price,
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
