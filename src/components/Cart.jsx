import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, updateCartQuantity, removeFromCart } = useCart();

  if (cart.length === 0) return <h1>Your Cart is Empty</h1>;

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value);
    updateCartQuantity(productId, newQuantity);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <ul className="flex flex-col gap-5 justify-between">
        {cart.map((product) => (
          <li className='flex flex-row items-center justify-between w-50/100' key={product._id}>
            {product.name} - ${product.price}
            <select
              value={product.quantity}
              onChange={(e) => handleQuantityChange(product._id, e)}
              className="mx-2 bg-zinc-700 rounded-md p-2"
            >
              {[...Array(10).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button
              className="bg-red-500 py-2 px-5 mx-5 rounded-md"
              onClick={() => removeFromCart(product._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
