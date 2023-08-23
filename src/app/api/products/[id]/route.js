import { NextResponse } from 'next/server';
import { dbConnect } from '@/libs/mysql';

export async function GET(request, { params: { id } }) {
  try {
    const result = await dbConnect.query(
      `SELECT * FROM products WHERE id = ?`,
      [id]
    );
    if (result.length === 0) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params: { id } }) {
  try {
    const data = await request.json();
    const result = await dbConnect.query(
      `
      UPDATE products SET ? WHERE id = ?`,
      [data, id]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    if (result.changedRows === 0) {
      return NextResponse.json({ message: 'Nothing changed' }, { status: 400 });
    }

    const updatedProduct = await dbConnect.query(
      `
      SELECT * FROM products WHERE id = ?`,
      [id]
    );

    return NextResponse.json(updatedProduct[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params: { id } }) {
  try {
    const result = await dbConnect.query(`DELETE FROM products WHERE id = ?`, [
      id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
