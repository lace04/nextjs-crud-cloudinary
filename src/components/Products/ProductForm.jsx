'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

function ProductForm() {
  const router = useRouter(); //router to redirect
  const { id } = useParams(); //get the id from the url
  //function to handle the all the inputs (form)
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
  });

  const [file, setFile] = useState(null); //state to handle the image

  const form = useRef(null); //reference to the form

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //create a new form data js
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    if (file) {
      formData.append('image', file);
    }
    if (!id) {
      const res = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', //form + image
        },
      });
    } else {
      const res = await axios.patch(`/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', //form + image
        },
      });
    }
    form.current.reset(); //reset the form
    router.push('/products');
    router.refresh();
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    }); //set the product state
  };

  useEffect(() => {
    if (id) {
      axios.get(`/api/products/${id}`).then((res) => {
        setProduct({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
        });
      });
    }
  }, []);

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
        value={product.name}
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
        value={product.price}
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
        value={product.description}
      />

      <label htmlFor='productImage' className='text-sm font-semibold'>
        Product image:
      </label>
      <input
        type='file'
        name='productImage'
        id='productImage'
        className='p-2 rounded-md mb-2 border border-b-2 text-zinc-700'
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt='image'
          width={300}
          className='object-contain mx-auto rounded-sm'
        />
      )}

      <button className='mt-2 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded trasition duration-300'>
        {id ? 'Edit Product' : 'Save Product'}
      </button>
    </form>
  );
}

export default ProductForm;
