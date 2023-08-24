import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';

export async function processImage(image) {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePatch = join(process.cwd(), 'public', image.name);
  await writeFile(filePatch, buffer);
  return filePatch;
}

//este archivo lo que hace es que cuando se sube una imagen al servidor, la sube a cloudinary y luego la borra del servidor
