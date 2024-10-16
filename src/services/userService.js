// src/services/userService.js
import axios from 'axios';
import axiosInstance from '../api/axiosInstance';

const API_URL = process.env.REACT_APP_API_URL;

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');

    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
