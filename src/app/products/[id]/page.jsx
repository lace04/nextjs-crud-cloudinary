import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Buttons from './Components/Buttons';

async function loadProduct(productId) {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/products/${productId}`
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function ProductPage({ params }) {
  const product = await loadProduct(params.id);

  if (!product) {
    return (
      <section className='flex flex-col items-center'>
        <h1 className='text-center text-white text-3xl m-5'>
          Product Not Found
        </h1>
        <div className='flex justify-center'>
          <Image
            src='/notProduct.svg'
            alt='Not Product'
            width={500}
            height={500}
          />
        </div>
        <Link
          href='/products'
          className='bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 mt-4 w-1/6 text-center'
        >
          Go Back
        </Link>
      </section>
    );
  }

  return (
    <>
      <h1 className='text-center text-white text-3xl m-5'>Product</h1>
      <section className='w-[400px] mx-auto bg-white p-4 rounded-md'>
        <h1 className='text-xl font-bold'>{product.name}</h1>
        <p className='text-sm font-semibold'>{product.description}</p>
        {product.image && (
          <div className='flex justify-center items-center'>
            <img src={product.image} alt={product.name} className='h-64' />
          </div>
        )}
        <p className='flex justify-end'>$ {product.price}</p>
        <p className='text-xs text-zinc-600'>
          Create: {new Date(product.createdAt).toLocaleString()}
        </p>
        <p className='text-xs text-zinc-500'>
          Update: {new Date(product.updatedAt).toLocaleString()}
        </p>
        <Buttons productId={product.id} />
      </section>
    </>
  );
}

export default ProductPage;
