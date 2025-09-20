import React from 'react';
import { useSweet } from '../contexts/SweetContext';
import { useAuth } from '../contexts/AuthContext';
import SweetCard from '../components/SweetCard';
import SearchFilter from '../components/SearchFilter';
import { Package, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { sweets, loading, searchSweets, purchaseSweet } = useSweet();
  const { isAuthenticated } = useAuth();

  const handleSearch = (params) => {
    searchSweets(params);
  };

  const handlePurchase = async (sweetId, quantity) => {
    try {
      await purchaseSweet(sweetId, quantity);
      toast.success('Purchase successful!');
    } catch (error) {
      toast.error('Purchase failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sweet Shop Dashboard</h1>
        <p className="text-gray-600">Discover and purchase your favorite sweets</p>
      </div>

      <SearchFilter onSearch={handleSearch} loading={loading} />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Sweets</p>
              <p className="text-2xl font-bold text-gray-900">{sweets.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {sweets.filter(sweet => sweet.quantity > 0).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {sweets.filter(sweet => sweet.quantity === 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sweets Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : sweets.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sweets found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              onPurchase={isAuthenticated ? handlePurchase : null}
            />
          ))}
        </div>
      )}
    </div>
  );
};


export default Dashboard;



