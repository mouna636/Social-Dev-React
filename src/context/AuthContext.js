// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(process.env.REACT_APP_API_URL + '/auth/profile', {
          withCredentials: true,
        });

        setIsAuthenticated(true);
        navigate('/');
      } catch (error) {
        setIsAuthenticated(false);
        // navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const login = async (credentials) => {
    try {
      console.log(`${process.env.REACT_APP_API_URL}/auth/login`);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        credentials,
        {
          withCredentials: true,
        },
      );

      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const register = async (credentials) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        credentials,
        {
          withCredentials: true,
        },
      );

      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = async () => {
    // try {
    //   await axios.post('/api/logout', {}, { withCredentials: true });
    //   setIsAuthenticated(false);
    // } catch (error) {
    //   console.error('Logout failed', error);
    // }
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, register, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
