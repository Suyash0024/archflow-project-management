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
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
       
          <BellIcon className="h-6 w-6" aria-hidden="true" />

          {/* {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {notificationCount}
            </span>
          )}  */}
        

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