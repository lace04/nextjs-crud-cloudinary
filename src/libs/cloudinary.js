import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'your name cloudinary',
  api_key: 'your api key cloudinary',
  api_secret: 'your api secret cloudinary',
});

// Configuración de cloudinary delete images
export const deleteImage = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};

export default cloudinary;
