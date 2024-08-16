import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between items-center px-10 rounded-lg">
      <Link to={'/'}>
        <h1 className="text-2xl font-bold">Beyond Shop</h1>
      </Link>
      <ul className="flex gap-x-4">
        {isAuthenticated ? (
          <>
          <li>
            <h1 className='flex justify-center items-center py-5 px-2 h-full'>Welcome {user.username}</h1>
          </li>
            <li className='flex justify-center items-center py-5 px-2 h-full rounded-md hover:bg-gray-300 hover:text-gray-800'>
              <Link to={'/products'}>Products</Link>
            </li>
            <li className='flex justify-center items-center py-5 px-2 h-full rounded-md hover:bg-gray-300 hover:text-gray-800'>
              <Link to={'/add-product'}>Add Product</Link>
            </li>
            <li className='flex justify-center items-center py-5 px-2 h-full rounded-md hover:bg-gray-300 hover:text-gray-800'>
              <Link to={'/profile'}>Profile</Link>
            </li>
            <li className='flex justify-center items-center py-5 px-2 h-full rounded-md hover:bg-gray-300 hover:text-gray-800'>
              <Link
                to={'/'}
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className='flex justify-center items-center py-5 px-2 h-full rounded-md hover:bg-gray-300 hover:text-gray-800'>
              <Link to={'/login'}>Login</Link>
            </li>
            <li className='flex justify-center items-center py-5 px-2 h-full rounded-md hover:bg-gray-300 hover:text-gray-800'>
              <Link to={'/register'}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
