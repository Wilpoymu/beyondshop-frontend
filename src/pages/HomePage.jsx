import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1 className="text-3xl font-bold py-5">HomePage</h1>
      <div className="flex flex-row">
        <Link
          className="card bg-zinc-700 rounded-md p-5 m-5 hover:bg-zinc-800"
          to="/products"
        >
          Products
        </Link>
        <Link
          className="card bg-zinc-700 rounded-md p-5 m-5 hover:bg-zinc-800"
          to="/add-product"
        >
          Add products
        </Link>
        <Link
          className="card bg-zinc-700 rounded-md p-5 m-5 hover:bg-zinc-800"
          to="/create-orders"
        >
          Create an order
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
