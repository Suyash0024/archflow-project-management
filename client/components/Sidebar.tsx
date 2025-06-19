// client/components/Sidebar.tsx
import React from 'react';
import { FolderIcon, UsersIcon, DocumentTextIcon, BuildingOfficeIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';


const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg">
      <div className="flex items-center justify-center h-16 border-b border-gray-700 mb-4">
        <span className="text-2xl font-semibold text-white">Arch Flow</span>
      </div>
      <nav className="flex-1">
        <ul>
          <li className="mb-2">
            <a
              href="#"
              className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition duration-200"
            >
              <FolderIcon className="h-5 w-5 mr-3" />
              Project
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition duration-200"
            >
              <UsersIcon className="h-5 w-5 mr-3" />
              Clients
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition duration-200"
            >
              <BuildingOfficeIcon className="h-5 w-5 mr-3" />
              Site Vists
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition duration-200"
            >
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              Invoices
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition duration-200"
            >
              <ChartBarIcon className="h-5 w-5 mr-3" />
              Reports
            </a>
          </li>
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <ul>
          <li className="mb-2">
            <a
              href="#"
              className="flex items-center p-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition duration-200"
            >
              <Cog6ToothIcon className="h-5 w-5 mr-3" />
              Settings
            </a>
          </li>  
        </ul>
       
      </div>
    </aside>
  );
};

export default Sidebar;