import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const SearchFilter = ({ onSearch, loading }) => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const handleClear = () => {
    setSearchParams({
      name: '',
      category: '',
      minPrice: '',
      maxPrice: ''
    });
    onSearch({});
  };

  return (
    <div className="card mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-primary-600" />
        <h2 className="text-lg font-semibold text-gray-800">Search & Filter</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={searchParams.name}
              onChange={handleInputChange}
              placeholder="Search by name..."
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={searchParams.category}
              onChange={handleInputChange}
              placeholder="Filter by category..."
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={searchParams.minPrice}
              onChange={handleInputChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={searchParams.maxPrice}
              onChange={handleInputChange}
              placeholder="100.00"
              min="0"
              step="0.01"
              className="input-field"
            />
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>{loading ? 'Searching...' : 'Search'}</span>
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            className="btn-outline"
          >
            Clear Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;


