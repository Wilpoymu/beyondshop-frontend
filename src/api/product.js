import axios from './axios';

export const getProductsRequest = () => axios.get('/products');

export const getProductRequest = (id) => axios.get(`/products/${id}`);

export const createProductsRequest = (product) =>
  axios.post('/products', product);

export const updateProductsRequest = (id, product) =>
  axios.put(`/products/${id}`, product);

export const deleteProductsRequest = (id) => axios.delete(`/products/${id}`);
