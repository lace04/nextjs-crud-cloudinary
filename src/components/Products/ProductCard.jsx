import Link from 'next/link';

function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <li className='bg-white hover:bg-zinc-100 hover:cursor-pointer text-black rounded-md border-gray-800 mb-3 p-4'>
        <h1 className='text-xl font-bold'>{product.name}</h1>
        <p className='text-sm font-semibold'>{product.description}</p>
        <p className='flex justify-end'>$ {product.price}</p>
        {product.image && (
          <div className='flex justify-center items-center'>
            <img src={product.image} alt={product.name} className='h-32' />
          </div>
        )}
        <p className='text-xs text-zinc-600'>
          Create: {new Date(product.createdAt).toLocaleString()}
        </p>
        <p className='text-xs text-zinc-500'>
          Update: {new Date(product.updatedAt).toLocaleString()}
        </p>
      </li>
    </Link>
  );
}

export default ProductCard;
