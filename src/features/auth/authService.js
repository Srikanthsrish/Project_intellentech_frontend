import axios from 'axios';

const API_URL = 'https://project-intellentech-backend.onrender.com/api/auth';

export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};

export const googleLogin = async (token) => {
  const res = await axios.post(`${API_URL}/google`, {
    token
  });
  return res.data;
};

