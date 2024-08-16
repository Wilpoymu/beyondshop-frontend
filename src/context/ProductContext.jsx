import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import {
  createProductsRequest,
  getProductsRequest,
  deleteProductsRequest,
} from '../api/product';

const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }

  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await getProductsRequest();
    try {
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createProduct = async (product) => {
    const res = await createProductsRequest(product);
    console.log(res);
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductsRequest(id);
      if (res.status === 204)
        setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, createProduct, getProducts, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
