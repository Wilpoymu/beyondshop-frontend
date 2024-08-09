import axios from "axios";

const API = "http://localhost:5000/api";

export const registerRequest = (user) =>
  axios.post(`${API}/auth/signup`, user);
