import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the contexts to avoid dependency issues in tests
jest.mock('./contexts/AuthContext', () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => ({
    user: null,
    token: null,
    loading: false,
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    isAdmin: () => false,
    isAuthenticated: false
  })
}));

jest.mock('./contexts/SweetContext', () => ({
  SweetProvider: ({ children }) => children,
  useSweet: () => ({
    sweets: [],
    loading: false,
    searchParams: {},
    fetchSweets: jest.fn(),
    searchSweets: jest.fn(),
    createSweet: jest.fn(),
    updateSweet: jest.fn(),
    deleteSweet: jest.fn(),
    purchaseSweet: jest.fn(),
    restockSweet: jest.fn()
  })
}));

test('renders Sweet Shop title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Sweet Shop/i);
  expect(titleElement).toBeInTheDocument();
});


