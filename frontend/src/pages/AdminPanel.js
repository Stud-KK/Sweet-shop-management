import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSweet } from '../contexts/SweetContext';
import SweetCard from '../components/SweetCard';
import SweetForm from '../components/SweetForm';
import { Plus, Package } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { sweets, loading, createSweet, updateSweet, deleteSweet, restockSweet } = useSweet();
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);

  useEffect(() => {
    if (!user || (!user.isAdmin && user.role !== 'ADMIN')) {  // Fix: Check both conditions
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
    }
  }, [user, navigate]);

  const handleCreate = async (sweetData) => {
    try {
      await createSweet(sweetData);
      toast.success('Sweet created successfully!');
      setShowForm(false);
    } catch (error) {
      toast.error('Failed to create sweet. Please try again.');
    }
  };

  const handleUpdate = async (sweetData) => {
    try {
      await updateSweet(editingSweet.id, sweetData);
      toast.success('Sweet updated successfully!');
      setEditingSweet(null);
    } catch (error) {
      toast.error('Failed to update sweet. Please try again.');
    }
  };

  const handleDelete = async (sweetId) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
      try {
        await deleteSweet(sweetId);
        toast.success('Sweet deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete sweet. Please try again.');
      }
    }
  };

  const handleRestock = async (sweetId, quantity) => {
    try {
      await restockSweet(sweetId, quantity);
      toast.success('Sweet restocked successfully!');
    } catch (error) {
      toast.error('Failed to restock sweet. Please try again.');
    }
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSweet(null);
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage your sweet inventory</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Sweet</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Stock</p>
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
        
        <div className="card">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(sweets.map(sweet => sweet.category)).size}
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
          <p className="text-gray-600">Add your first sweet to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRestock={handleRestock}
              isAdmin={true}
            />
          ))}
        </div>
      )}

      {/* Sweet Form Modal */}
      {showForm && (
        <SweetForm
          sweet={editingSweet}
          onSubmit={editingSweet ? handleUpdate : handleCreate}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default AdminPanel;



