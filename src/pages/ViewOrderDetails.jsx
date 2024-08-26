import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';
import currencyFormatter from '../utils/currencyFormater';

function ViewOrderDetails() {
  const params = useParams();
  const { getOrder, getDollarPrice } = useOrder();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      const fetchedOrder = await getOrder(params.id);
      setOrder(fetchedOrder);
    }

    fetchOrder();
  }, [params.id, getOrder]);

  if (!order) {
    return <div>Loading...</div>;
  }

  const value = order.totalPrice;
  const colombianPrice = Math.round(order.totalPrice * getDollarPrice());

  const dollar = currencyFormatter({
    currency: 'USD',
    value,
  });

  const peso = currencyFormatter({
    currency: 'COP',
    value: colombianPrice,
  });

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Client Details</h2>
        <p className="mb-1">
          <strong>Document:</strong> {order.clientId.document}
        </p>
        <p className="mb-1">
          <strong>Name:</strong> {order.clientId.name}
        </p>
        <p className="mb-1">
          <strong>Address:</strong> {order.clientId.address}
        </p>
        <p className="mb-1">
          <strong>Phone:</strong> {order.clientId.phone}
        </p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Products</h2>
        {order.productsDetails.map((product) => (
          <div key={product._id} className="mb-4 p-4 border rounded-lg">
            <p className="mb-1">
              <strong>Product Name:</strong> {product.productId.name}
            </p>
            <p className="mb-1">
              <strong>Quantity:</strong> {product.quantity}
            </p>
            <p className="mb-1">
              <strong>Unit Price:</strong> {product.unitPrice}
            </p>
            <p className="mb-1">
              <strong>Total Price:</strong> {product.price}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p className="mb-1">
          <strong>Total Price USD:</strong> {dollar}
        </p>
        <p className="mb-1">
          <strong>Total Price:</strong> {peso}
        </p>
        <p className="mb-1">
          <strong>Order Date:</strong>{' '}
          {new Date(order.orderDate).toLocaleString()}
        </p>
        <p className="mb-1">
          <strong>Created At:</strong>{' '}
          {new Date(order.createdAt).toLocaleString()}
        </p>
        <p className="mb-1">
          <strong>Updated At:</strong>{' '}
          {new Date(order.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default ViewOrderDetails;
