import { useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import { useOrder } from '../context/OrderContext';
import { Link } from 'react-router-dom';
import '../index.css'; // Asegúrate de importar el archivo de estilos

function OrdersPage() {
  const { getOrders, orders } = useOrder();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (!orders.length) {
    return (
      <>
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl font-bold text-gray-500">No orders</h1>
        </div>
        <Link className="fixed-bottom-right" to="/create-orders">
          Create an order
        </Link>
      </>
    );
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
      <Link className="fixed-bottom-right" to="/create-orders">
        Create an order
      </Link>
    </div>
  );
}

export default OrdersPage;
