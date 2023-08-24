import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import ProductCard from './ProductCard';

async function loadProducts() {
  const { data } = await axios.get('http://localhost:3000/api/products');
  return data;
}

async function ProductList({ product }) {
  const products = await loadProducts();

  if (products.length === 0) {
    return (
      <section className='flex flex-col items-center'>
        <h1 className='text-center text-white text-3xl m-5'>
          No products found
        </h1>
        <div className='flex justify-center'>
          <Image
            src='/notProduct.svg'
            alt='Not Product'
            width={300}
            height={300}
          />
        </div>
        <Link
          href='/new'
          className='bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 mt-4 w-1/6 text-center'
        >
          Add Product
        </Link>
      </section>
    );
  }

  return (
    <div className=''>
      <h1 className='text-center text-white text-4xl m-5'>Products</h1>
      <ul className='text-white mx-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
