import { useEffect, useState } from 'react';
import { getOrdersRequest } from '../api/order';
import OrderCard from '../components/OrderCard';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await getOrdersRequest();
      setOrders(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}

export default OrdersPage;
