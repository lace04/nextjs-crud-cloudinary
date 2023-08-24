'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Buttons({ productId }) {
  const router = useRouter();
  return (
    <div className='flex justify-end'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 mt-4'
        onClick={() => {
          router.push(`/products/edit/${productId}`);
        }}
      >
        Edit
      </button>
      <button
        className='bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 mt-4 ml-4'
        onClick={async () => {
          if (confirm('Are you sure?')) {
            const res = await axios.delete(`/api/products/${productId}`);
            if (res.status === 204) {
              router.push('/products');
              router.refresh();
            } else {
              alert('Something went wrong');
            }
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Buttons;
