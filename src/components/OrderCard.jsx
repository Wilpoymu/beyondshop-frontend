import PropTypes from 'prop-types';
import currencyFormatter from '../utils/currencyFormater';
import { Link } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

function OrderCard({ order }) {
  const { getDollarPrice, deleteOrder } = useOrder();

  //format the date full date in DD/MM/YYYY
  const date = new Date(order.orderDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

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
    <div className="bg-zinc-800 max-w-sm w-full p-10 rounded-md">
      <header className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{order.clientId.name}</h1>
          <h3 className="text-xl font-bold">{formattedDate}</h3>
        </div>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => {
              deleteOrder(order._id);
            }}
          >
            delete
          </button>
          <Link to={`/orders/${order._id}`}>View</Link>
        </div>
      </header>{' '}
      <br />
      <p className="text-slate-300">Price USD: {dollar}</p>
      <p className="text-slate-300">Price: {peso}</p>
    </div>
  );
}

export default OrderCard;

OrderCard.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    clientId: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
