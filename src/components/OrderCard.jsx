import PropTypes from 'prop-types';
import { useProduct } from '../context/ProductContext';
import currencyFormatter from '../utils/currencyFormater';

function OrderCard({ order }) {
  const { deleteProduct, getDollarPrice } = useProduct();

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
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{formattedDate}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => {
              deleteProduct(order._id);
            }}
          >
            delete
          </button>
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
  }).isRequired,
};
