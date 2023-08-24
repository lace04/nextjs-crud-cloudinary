import Link from 'next/link';

function Navbar() {
  return (
    <nav className='text-center bg-zinc-900 text-white flex justify-between p-4'>
      <h3>
        <Link href='/'>NextMysql</Link>
      </h3>
      <ul>
        <li>
          <Link href='/new'>New</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
