import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, User, LogOut, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingCart className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-800">Sweet Shop</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 transition-colors">
              Dashboard
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin() && (
                  <Link to="/admin" className="text-gray-600 hover:text-primary-600 transition-colors">
                    <Settings className="h-5 w-5" />
                  </Link>
                )}
                
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">{user.username}</span>
                  <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                    {user.role}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


