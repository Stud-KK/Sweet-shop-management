import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Users, Package, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Sweet Shop</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your one-stop destination for managing sweet inventory with ease. 
            Discover, purchase, and manage your favorite sweets all in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/dashboard" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Sweets
            </Link>
            <Link to="/register" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Sweet Shop?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Shopping</h3>
              <p className="text-gray-600">
                Browse and purchase your favorite sweets with just a few clicks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Inventory Management</h3>
              <p className="text-gray-600">
                Real-time inventory tracking and management for all your sweets.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">User Friendly</h3>
              <p className="text-gray-600">
                Intuitive interface designed for both customers and administrators.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure</h3>
              <p className="text-gray-600">
                Secure authentication and data protection for all users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers and start exploring our sweet collection today.
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-3">
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;



