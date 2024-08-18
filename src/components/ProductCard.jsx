import PropTypes from 'prop-types';
import { useProduct } from '../context/ProductContext';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { deleteProduct, getDollarPrice } = useProduct();

  function currencyFormatter({ currency, value }) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      minimumFractionDigits: 2,
      currency,
    });
    return formatter.format(value);
  }

  const value = product.price;
  const colombianPrice = Math.round(product.price * getDollarPrice());

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
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => {
              deleteProduct(product._id);
            }}
          >
            delete
          </button>
          <Link to={`/products/${product._id}`}>edit</Link>
        </div>
      </header>{' '}
      <br />
      <p className="text-slate-300">Price USD: {dollar}</p>
      <p className="text-slate-300">Price: {peso}</p>
    </div>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
