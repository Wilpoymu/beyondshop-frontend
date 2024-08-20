import axios from './axios';

export const getCustomersRequest = () => axios.get('/customers');

export const getCustomerRequest = (id) => axios.get(`/customers/${id}`);

export const createCustomersRequest = (customer) =>
  axios.post('/customers', customer);

export const updateCustomersRequest = (id, customer) =>
  axios.put(`/customers/${id}`, customer);

export const deleteCustomersRequest = (id) => axios.delete(`/customers/${id}`);
