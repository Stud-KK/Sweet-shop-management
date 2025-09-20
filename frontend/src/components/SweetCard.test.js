import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SweetCard from './SweetCard';

// Mock the AuthContext
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: true
  })
}));

const mockSweet = {
  id: '1',
  name: 'Chocolate Cake',
  category: 'Cakes',
  price: 25.99,
  quantity: 10,
  description: 'Delicious chocolate cake'
};

test('renders sweet card with correct information', () => {
  render(<SweetCard sweet={mockSweet} />);
  
  expect(screen.getByText('Chocolate Cake')).toBeInTheDocument();
  expect(screen.getByText('Cakes')).toBeInTheDocument();
  expect(screen.getByText('$25.99')).toBeInTheDocument();
  expect(screen.getByText('10 in stock')).toBeInTheDocument();
  expect(screen.getByText('Delicious chocolate cake')).toBeInTheDocument();
});

test('shows purchase button when authenticated', () => {
  render(<SweetCard sweet={mockSweet} onPurchase={jest.fn()} />);
  
  expect(screen.getByText('Purchase')).toBeInTheDocument();
});

test('shows out of stock when quantity is zero', () => {
  const outOfStockSweet = { ...mockSweet, quantity: 0 };
  render(<SweetCard sweet={outOfStockSweet} onPurchase={jest.fn()} />);
  
  expect(screen.getByText('Out of Stock')).toBeInTheDocument();
});

test('calls onPurchase when purchase button is clicked', () => {
  const mockOnPurchase = jest.fn();
  render(<SweetCard sweet={mockSweet} onPurchase={mockOnPurchase} />);
  
  fireEvent.click(screen.getByText('Purchase'));
  expect(mockOnPurchase).toHaveBeenCalledWith('1', 1);
});

test('shows admin controls when isAdmin is true', () => {
  render(
    <SweetCard 
      sweet={mockSweet} 
      onEdit={jest.fn()} 
      onDelete={jest.fn()} 
      onRestock={jest.fn()}
      isAdmin={true} 
    />
  );
  
  expect(screen.getByText('Edit')).toBeInTheDocument();
  expect(screen.getByText('Delete')).toBeInTheDocument();
  expect(screen.getByText('Restock')).toBeInTheDocument();
});


