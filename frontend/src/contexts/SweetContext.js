import React, { createContext, useContext, useState, useEffect } from 'react';
import { sweetAPI } from '../services/api';

const SweetContext = createContext();

export const useSweet = () => {
  const context = useContext(SweetContext);
  if (!context) {
    throw new Error('useSweet must be used within a SweetProvider');
  }
  return context;
};

export const SweetProvider = ({ children }) => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const fetchSweets = async () => {
    setLoading(true);
    try {
      const response = await sweetAPI.getAllSweets();
      setSweets(response.data);
    } catch (error) {
      console.error('Error fetching sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchSweets = async (params) => {
    setLoading(true);
    try {
      const response = await sweetAPI.searchSweets(params);
      setSweets(response.data);
      setSearchParams(params);
    } catch (error) {
      console.error('Error searching sweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSweet = async (sweetData) => {
    try {
      const response = await sweetAPI.createSweet(sweetData);
      setSweets(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateSweet = async (id, sweetData) => {
    try {
      const response = await sweetAPI.updateSweet(id, sweetData);
      setSweets(prev => prev.map(sweet => 
        sweet.id === id ? response.data : sweet
      ));
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteSweet = async (id) => {
    try {
      await sweetAPI.deleteSweet(id);
      setSweets(prev => prev.filter(sweet => sweet.id !== id));
    } catch (error) {
      throw error;
    }
  };

  const purchaseSweet = async (id, quantity) => {
    try {
      const response = await sweetAPI.purchaseSweet(id, quantity);
      setSweets(prev => prev.map(sweet => 
        sweet.id === id ? response.data : sweet
      ));
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const restockSweet = async (id, quantity) => {
    try {
      const response = await sweetAPI.restockSweet(id, quantity);
      setSweets(prev => prev.map(sweet => 
        sweet.id === id ? response.data : sweet
      ));
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const value = {
    sweets,
    loading,
    searchParams,
    fetchSweets,
    searchSweets,
    createSweet,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet
  };

  return (
    <SweetContext.Provider value={value}>
      {children}
    </SweetContext.Provider>
  );
};



