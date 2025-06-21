import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FolderIcon, UsersIcon, DocumentTextIcon, BuildingOfficeIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';


const Sidebar: React.FC = () => {
  return (
    // Applied more consistent Tailwind classes for sidebar appearance
    <aside className="w-64 sidebar-bg text-dark flex flex-col p-4 shadow-lg min-h-screen">
      <nav className="flex-1">
        <ul>
          <li className="mb-2">
            {/* Use Link to navigate to project-related content */}
            <Link
              to="/dashboard/projects"
              className="flex items-center p-2 text-dark hover:bg-gray-700 hover:text-white rounded-md transition duration-200"
            >
              <FolderIcon className="h-5 w-5 mr-3" />
              Project
            </Link>
          </li>
          <li className="mb-2">
            {/* Use Link to navigate to the clients form within the dashboard */}
            <Link
              to="/dashboard/clients" // This path will render ClientDetails in MainContent
              className="flex items-center p-2 text-dark hover:bg-gray-700 hover:text-white rounded-md transition duration-200"
            >
              <UsersIcon className="h-5 w-5 mr-3" />
              Clients
            </Link>
          </li>
          <li className="mb-2">
            {/* Link for Site Visits */}
            <Link
              to="/dashboard/site-visits"
              className="flex items-center p-2 text-dark hover:bg-gray-700 hover:text-white rounded-md transition duration-200"
            >
              <BuildingOfficeIcon className="h-5 w-5 mr-3" />
              Site Visits
            </Link>
          </li>
          <li className="mb-2">
            {/* Link for Invoices */}
            <Link
              to="/dashboard/invoices"
              className="flex items-center p-2 text-dark hover:bg-gray-700 hover:text-white rounded-md transition duration-200"
            >
              <DocumentTextIcon className="h-5 w-5 mr-3" />
              Invoices
            </Link>
          </li>
          <li className="mb-2">
            {/* Link for Reports */}
            <Link
              to="/dashboard/reports"
              className="flex items-center p-2 text-dark hover:bg-gray-700 hover:text-white rounded-md transition duration-200"
            >
              <ChartBarIcon className="h-5 w-5 mr-3" />
              Reports
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <ul>
          <li className="mb-2">
            {/* Link for Settings */}
            <Link
              to="/dashboard/settings"
              className="flex items-center p-2 text-dark hover:bg-gray-700 hover:text-white rounded-md transition duration-200"
            >
              <Cog6ToothIcon className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
