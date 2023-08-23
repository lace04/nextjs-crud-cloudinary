function ProductCard({ product }) {
  return (
    <li className='bg-white text-black rounded-md border-gray-800 mb-3 p-4'>
      <h1 className='text-xl font-bold'>{product.name}</h1>
      <p className='text-sm font-semibold'>{product.description}</p>
      <p className='flex justify-end'>$ {product.price}</p>
      <p className='text-xs text-zinc-600'>
        Create: {new Date(product.createdAt).toLocaleString()}
      </p>
      <p className='text-xs text-zinc-400'>
        Update: {new Date(product.updatedAt).toLocaleString()}
      </p>
    </li>
  );
}

export default ProductCard;
