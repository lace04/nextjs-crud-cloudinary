import { NextResponse } from 'next/server';
import { dbConnect } from '@/libs/mysql';
import cloudinary from '@/libs/cloudinary';
import { unlink } from 'fs/promises';
import { processImage } from '@/libs/processImage';

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
    const data = await request.formData();
    const image = data.get('image');

    if (!image) {
      return NextResponse.json(
        { message: 'No image uploaded' },
        { status: 400 }
      );
    }

    const filePatch = await processImage(image);

    const res = await cloudinary.uploader.upload(filePatch);
    // console.log(res.secure_url);

    if (res) {
      await unlink(filePatch);
    }

    const result = await dbConnect.query(`INSERT INTO products SET ?`, {
      name: data.get('name'),
      description: data.get('description'),
      price: data.get('price'),
      image: res.secure_url,
    });

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: 'Failed to insert product' });
    }

    return NextResponse.json({
      name: data.get('name'),
      description: data.get('description'),
      price: data.get('price'),
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
