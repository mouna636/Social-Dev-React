// src/services/userService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
