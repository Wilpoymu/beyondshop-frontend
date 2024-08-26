
import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import {
  createOrderRequest,
  getOrdersRequest,
  deleteOrderRequest,
  getOrderRequest,
  updateOrderRequest,
} from '../api/order';
import ax from 'axios';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within a OrderProvider');
  }

  return context;
};

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [dollarPrice, setDollarPrice] = useState([]);

  const getDollarPrice = () => {
    ax.get('https://www.datos.gov.co/resource/mcec-87by.json').then((res) => {
      setDollarPrice(res.data[0].valor);
    });

    return dollarPrice;
  };

  const getOrders = async () => {
    const res = await getOrdersRequest();
    try {
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createOrder = async (order) => {
    const res = await createOrderRequest(order);
    console.log(res);
  };

  const deleteOrder = async (id) => {
    try {
      const res = await deleteOrderRequest(id);
      if (res.status === 204)
        setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getOrder = async (id) => {
    try {
      const res = await getOrderRequest(id);
      return res.data;
    } catch (error) {
        console.error(error);
    }
  };

  const updateOrder = async (id, order) => {
    try {
      updateOrderRequest(id, order);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrders,
        deleteOrder,
        getOrder,
        updateOrder,
        getDollarPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

OrderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
