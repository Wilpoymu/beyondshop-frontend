import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';
import {
  createCustomersRequest,
  getCustomersRequest,
  deleteCustomersRequest,
  getCustomerRequest,
  updateCustomersRequest,
} from '../api/customer';

const CustomerContext = createContext();

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }

  return context;
};

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    const res = await getCustomersRequest();
    try {
      setCustomers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createCustomer = async (customer) => {
    const res = await createCustomersRequest(customer);
    console.log(res);
  };

  const deleteCustomer = async (id) => {
    try {
      const res = await deleteCustomersRequest(id);
      if (res.status === 204)
        setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getCustomer = async (id) => {
    try {
      const res = await getCustomerRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateCustomer = async (id, customer) => {
    try {
      updateCustomersRequest(id, customer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        createCustomer,
        getCustomers,
        deleteCustomer,
        getCustomer,
        updateCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

CustomerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
