import { useEffect, useState } from 'react';
import { getOrdersRequest } from '../api/order';
import OrderCard from '../components/OrderCard';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await getOrdersRequest();
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
