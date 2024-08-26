import { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import Cart from '../components/Cart';
import currencyFormatter from '../utils/currencyFormater';
import { useCustomer } from '../context/CustomerContext';
import Option from '../components/Option';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/OrderContext';

function CreateOrdersPage() {
  const { products, getProducts, getDollarPrice } = useProduct();
  const { addToCart, cart } = useCart();
  const { createOrder, getOrders } = useOrder();
  const { customers, getCustomers } = useCustomer();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    getProducts();
    getCustomers();
  }, []);

  const handleSelectChange = (event) => {
    const productId = event.target.value;
    const product = products.find((p) => p._id === productId);
    setSelectedProduct(product);
  };

  const handleCustomerChange = (event) => {
    const customerId = event.target.value;
    setSelectedCustomer(customerId); // Actualiza el cliente seleccionado
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const productWithQuantity = {
        ...selectedProduct,
        quantity,
      };

      if (!cart.some((product) => product._id === selectedProduct._id)) {
        addToCart(productWithQuantity);
      } else {
        console.log('Product already in cart');
      }
    } else {
      console.log('No product selected');
    }
  };

  const calculatePrice = () => {
    return cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
  };

  const dollar = currencyFormatter({
    currency: 'USD',
    value: calculatePrice(),
  });

  const peso = currencyFormatter({
    currency: 'COP',
    value: calculatePrice() * getDollarPrice(),
  });

  const totalPrice = calculatePrice();

  const handleCreateOrder = async () => {
    if (!selectedCustomer) {
      console.log('No customer selected');
      return;
    }

    const order = {
      clientId: selectedCustomer,
      totalPrice: totalPrice,
      productsDetails: cart.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
        price: product.price * product.quantity,
        unitPrice: product.price,
      })),
    };

    await createOrder(order);
    await getOrders(); // Actualizar las órdenes después de crear una nueva
    navigate('/orders');
  };

  if (products.length === 0) return <h1>No Products</h1>;

  return (
    <div>
      <h1 className="text-3xl font-bold mt-10">Select your products</h1>
      <select
        className="py-2.5 px-4 bg-zinc-700 rounded-md mr-5 my-10"
        onChange={handleSelectChange}
        value={selectedProduct ? selectedProduct._id : ''}
      >
        <option value="">Select a product</option>
        {products.map((product) => (
          <Option key={product._id} value={product._id} label={product.name} />
        ))}
      </select>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-2 rounded-md"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
      <Cart />
      <h2 className="text-2xl font-bold mt-10">Total: {dollar}</h2>
      <h2>Total Peso: {peso}</h2>

      <div>
        <select
          name=""
          id=""
          className="py-2.5 px-4 bg-zinc-700 rounded-md mr-5 my-10"
          onChange={handleCustomerChange} // Evento para manejar el cambio de cliente
          value={selectedCustomer || ''}
        >
          <option value="" defaultValue={''}>
            Select a customer
          </option>
          {customers.map((customer) => (
            <Option
              key={customer._id}
              value={customer._id}
              label={customer.name}
            />
          ))}
        </select>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 my-2 rounded-md"
        onClick={handleCreateOrder}
      >
        Create Order
      </button>
    </div>
  );
}

export default CreateOrdersPage;
