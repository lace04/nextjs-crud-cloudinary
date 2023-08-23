import axios from 'axios';
import ProductCard from './ProductCard';

async function loadProducts() {
  const { data } = await axios.get('http://localhost:3000/api/products');
  return data;
}

async function ProductList({ product }) {
  const products = await loadProducts();
  return (
    <div className='container mx-auto'>
      <h1 className='text-center text-white text-4xl m-5'>Products</h1>
      <ul className='text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
