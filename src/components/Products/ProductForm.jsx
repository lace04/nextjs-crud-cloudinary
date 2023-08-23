'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function ProductForm() {
  const router = useRouter(); //router to redirect
  //function to handle the all the inputs (form)
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
  });

  const form = useRef(null); //reference to the form

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent the default behavior of the form
    const res = await axios.post('/api/products', product);
    console.log(res.data)
    form.current.reset(); //reset the form
    router.refresh();
    router.push('/products');
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    }); //set the product state
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={form}
      className='bg-white rounded-md px-8 py-6 mb-4 w-1/2 flex flex-col mx-auto mt-20'
    >
      <label htmlFor='productName' className='text-sm font-semibold'>
        Product name:
      </label>
      <input
        type='text'
        placeholder='Write a name'
        name='name'
        id='productName'
        onChange={handleChange}
        className='p-2 rounded-md mb-2 border border-b-2 text-zinc-700'
        autoComplete='off'
        autoFocus
      />

      <label htmlFor='productPrice' className='text-sm font-semibold'>
        Product price:
      </label>
      <input
        type='text'
        placeholder='00.00'
        name='price'
        id='productPrice'
        onChange={handleChange}
        className='p-2 rounded-md mb-2 border border-b-2 text-zinc-700'
        autoComplete='off'
      />

      <label htmlFor='productDescription' className='text-sm font-semibold'>
        Product description:
      </label>
      <textarea
        cols={3}
        placeholder='Write a description'
        name='description'
        id='productDescription'
        onChange={handleChange}
        className='p-2 rounded-md mb-2 border border-b-2 text-zinc-700'
        autoComplete='off'
      />

      <button className='bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded trasition duration-300'>
        Save Product
      </button>
    </form>
  );
}

export default ProductForm;
