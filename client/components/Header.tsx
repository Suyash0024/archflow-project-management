// client/components/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, logout } from '../services/authService';
import { isLoggedIn } from '../utils/authUtils';
import { BellIcon } from '@heroicons/react/24/outline';





const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to log out. Please try again.');
    }
  };


  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between z-10">
      <div className="flex items-center space-x-4">
        <span className="text-2xl font-semibold text-dark">Arch Flow</span>
      <span className="text-xl text-gray-700 ml-8">Proplet Name</span> {/* Adjust margin-left (ml-8) as needed */}
      </div>

      <div className="flex items-center space-x-4">
        
       
          <BellIcon className="h-6 w-6" aria-hidden="true" />

          
        

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;