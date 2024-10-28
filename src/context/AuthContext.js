// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resp = await axiosInstance.get('/auth/profile');
        setUser(resp.data);

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const login = async (credentials) => {
    try {
      await axiosInstance.post('/auth/login', credentials);

      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (credentials) => {
    try {
      await axiosInstance.post('/auth/register', credentials);

      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      console.log(response.data);

      setIsAuthenticated(false);
      setUser({});
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
