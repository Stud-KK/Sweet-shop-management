import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Package } from 'lucide-react';

const SweetForm = ({ sweet, onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (sweet) {
      reset({
        name: sweet.name,
        category: sweet.category,
        price: sweet.price,
        quantity: sweet.quantity,
        description: sweet.description || ''
      });
    } else {
      reset({
        name: '',
        category: '',
        price: '',
        quantity: '',
        description: ''
      });
    }
  }, [sweet, reset]);

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {sweet ? 'Edit Sweet' : 'Add New Sweet'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="input-field"
              placeholder="Enter sweet name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <input
              {...register('category', { required: 'Category is required' })}
              type="text"
              className="input-field"
              placeholder="e.g., Cakes, Cookies, Chocolates"
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price *
            </label>
            <input
              {...register('price', { 
                required: 'Price is required',
                min: { value: 0.01, message: 'Price must be greater than 0' }
              })}
              type="number"
              step="0.01"
              min="0.01"
              className="input-field"
              placeholder="0.00"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity *
            </label>
            <input
              {...register('quantity', { 
                required: 'Quantity is required',
                min: { value: 0, message: 'Quantity must be non-negative' }
              })}
              type="number"
              min="0"
              className="input-field"
              placeholder="0"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register('description')}
              rows="3"
              className="input-field"
              placeholder="Enter sweet description (optional)"
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <Package className="h-4 w-4" />
              <span>{isSubmitting ? 'Saving...' : (sweet ? 'Update Sweet' : 'Add Sweet')}</span>
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SweetForm;


