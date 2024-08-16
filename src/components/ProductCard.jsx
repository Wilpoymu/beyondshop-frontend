import PropTypes from 'prop-types';
import { useProduct } from '../context/ProductContext';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { deleteProduct } = useProduct();

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
          <Link to={`/task/${product._id}`}>edit</Link>
        </div>
      </header>
      <p className="text-slate-300">{product.price}</p> <br />
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
