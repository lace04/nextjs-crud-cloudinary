import { NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import cloudinary, { deleteImage } from '@/libs/cloudinary';
import { dbConnect } from '@/libs/mysql';
import { processImage } from '@/libs/processImage';

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
    const data = await request.formData();
    const image = data.get('image');

    const updatedData = {
      name: data.get('name'),
      description: data.get('description'),
      price: data.get('price'),
    };

    if (!data.get('name')) {
      return NextResponse.json(
        { message: 'Name is required' },
        { status: 400 }
      );
    }

    if (data.get('image')) {
      const filePatch = await processImage(image);
      const res = await cloudinary.uploader.upload(filePatch);
      updatedData.image = res.secure_url;
      if (res) {
        await unlink(filePatch);
      }
    }

    const result = await dbConnect.query(
      `
      UPDATE products SET ? WHERE id = ?`,
      [updatedData, id]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
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
