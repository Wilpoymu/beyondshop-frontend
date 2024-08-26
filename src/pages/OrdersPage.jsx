import { useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import { useOrder } from '../context/OrderContext';

function OrdersPage() {
  const { getOrders, orders } = useOrder();


  useEffect(() => {
    getOrders();
  }, []);

  if (!orders.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-2xl font-bold text-gray-500">No orders</h1>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}

export default OrdersPage;
