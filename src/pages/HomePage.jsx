import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useCustomer } from '../context/CustomerContext';
import { useOrder } from '../context/OrderContext';

function HomePage() {
  const { isAuthenticated } = useAuth();
  const {products, getProducts} = useProduct();
  const {customers, getCustomers} = useCustomer();
  const {orders, getOrders} = useOrder();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    getProducts();
    getCustomers();
    getOrders();
  }, []);

  const totalProducts = products.length;
  const totalCustomers = customers.length;
  const totalOrders = orders.length;

  const lastestProduct = products[products.length - 1] ? products[products.length - 1] : 'No products yet';
  const lastestOrder = orders[orders.length - 1] ? orders[orders.length - 1].clientId.name : 'No orders yet';
  console.log("🚀 ~ HomePage ~ orders:", orders)

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">HomePage</h1>
      
      {/* Estadísticas y Panel de Actividad */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-zinc-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sumary</h2>
          <p>Total Products: {totalProducts}</p>
          <p>Total Customers: {totalCustomers}</p>
          <p>Total Orders: {totalOrders}</p>
        </div>
        <div className="bg-zinc-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent activity</h2>
          <ul>
            <li>Lastest order created: {lastestOrder}</li>
            <li>Lastest product added: {lastestProduct.name}</li>
          </ul>
        </div>
      </div>

      {/* Enlaces de Navegación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col space-y-4">
          <Link
            className="card bg-zinc-700 rounded-md p-5 hover:bg-zinc-800"
            to="/products"
          >
            View Products
          </Link>
          <Link
            className="card bg-zinc-700 rounded-md p-5 hover:bg-zinc-800"
            to="/add-product"
          >
            Add Product
          </Link>
        </div>

        <div className="flex flex-col space-y-4">
          <Link
            className="card bg-zinc-700 rounded-md p-5 hover:bg-zinc-800"
            to="/customers"
          >
            View Customers
          </Link>
          <Link
            className="card bg-zinc-700 rounded-md p-5 hover:bg-zinc-800"
            to="/add-customer"
          >
            Add Customer
          </Link>
        </div>

        <div className="flex flex-col space-y-4">
          <Link
            className="card bg-zinc-700 rounded-md p-5 hover:bg-zinc-800"
            to="/orders"
          >
            View Orders
          </Link>
          <Link
            className="card bg-zinc-700 rounded-md p-5 hover:bg-zinc-800"
            to="/create-orders"
          >
            Create Order
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
