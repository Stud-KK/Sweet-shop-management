import React, { useState } from 'react';
import { ShoppingCart, Package, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SweetCard = ({ sweet, onPurchase, onEdit, onDelete, onRestock, isAdmin = false }) => {
  const { isAuthenticated } = useAuth();
  const [restockQuantity, setRestockQuantity] = useState(1);

  const handlePurchase = () => {
    if (onPurchase) {
      onPurchase(sweet.id, 1);
    }
  };

  const handleRestock = () => {
    if (onRestock && restockQuantity > 0) {
      onRestock(sweet.id, restockQuantity);
    }
  };

  return (
    <div className="sweet-card">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{sweet.name}</h3>
        <span className="text-sm bg-secondary-100 text-secondary-800 px-2 py-1 rounded-full">
          {sweet.category}
        </span>
      </div>
      
      {sweet.description && (
        <p className="text-gray-600 text-sm mb-3">{sweet.description}</p>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold text-primary-600">
          ${sweet.price}
        </span>
        <div className="flex items-center space-x-1">
          <Package className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{sweet.quantity} in stock</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {isAuthenticated && !isAdmin && (
          <button
            onClick={handlePurchase}
            disabled={sweet.quantity === 0}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
              sweet.quantity === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>{sweet.quantity === 0 ? 'Out of Stock' : 'Purchase'}</span>
          </button>
        )}
        
        {isAdmin && (
          <div className="space-y-2">
            {/* Restock Section */}
            <div className="flex space-x-2">
              <input
                type="number"
                min="1"
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(parseInt(e.target.value) || 1)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="Qty"
              />
              <button
                onClick={handleRestock}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm flex items-center space-x-1"
              >
                <Plus className="h-3 w-3" />
                <span>Restock</span>
              </button>
            </div>
            
            {/* Admin Actions */}
            <div className="flex space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(sweet)}
                  className="flex-1 px-3 py-2 border border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white rounded-lg transition-colors text-sm"
                >
                  Edit
                </button>
              )}
              
              {onDelete && (
                <button
                  onClick={() => onDelete(sweet.id)}
                  className="flex-1 px-3 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SweetCard;
