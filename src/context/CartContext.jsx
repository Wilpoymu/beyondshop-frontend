import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }
  function removeFromCart(productId) {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === productId);

      if (existingProduct.quantity > 1) {
        return prevCart.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      } else {
        return prevCart.filter((item) => item._id !== productId);
      }
    });
  }

  function updateCartQuantity(productId, quantity) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCartQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
