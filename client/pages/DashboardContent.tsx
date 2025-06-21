// src/pages/DashboardContent.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import ClientDetails from './ClientDetails'; // Import the ClientDetails form

const DashboardContent: React.FC = () => {
  // This function handles the data submitted from the ClientDetails form
  const handleClientFormSubmit = (clientData: {
    name: string;
    company: string;
    contact: number | string; // Matches the ClientDetailsData interface
    email: string;
    address: string;
  }) => {
    console.log('Client data submitted from DashboardContent:', clientData);
    // Here, you would typically send this clientData to your backend API
    // Example: fetch('/api/clients', { method: 'POST', body: JSON.stringify(clientData) })
    alert(`Client "${clientData.name}" saved successfully! (Check console)`);
    // After submission, you might want to redirect, show a success message, or update a list.
  };

  return (
    <div className="p-6 bg-gray-200 min-h-full w-full"> {/* Ensure it takes full width and height */}
      <Routes>
        {/* Default content for /dashboard (when no sub-route is active) */}
        <Route
          index // This route matches the parent path ("/dashboard")
          element={
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Welcome to your Dashboard! Select an item from the sidebar.
            </h1>
          }
        />

        {/* Route for the ClientDetails form - accessible at /dashboard/clients */}
        <Route
          path="clients" // This is a relative path to "/dashboard"
          element={
            <ClientDetails
              onSubmit={handleClientFormSubmit}
              formTitle="Add New Client" // Customize form title
            />
          }
        />

        {/* Placeholder routes for other sidebar items */}
        <Route path="projects" element={
          <h2 className="text-2xl font-bold text-gray-700 text-center py-10">Projects Management Section</h2>
        } />
        <Route path="site-visits" element={
          <h2 className="text-2xl font-bold text-gray-700 text-center py-10">Site Visits Overview</h2>
        } />
        <Route path="invoices" element={
          <h2 className="text-2xl font-bold text-gray-700 text-center py-10">Invoices Section</h2>
        } />
        <Route path="reports" element={
          <h2 className="text-2xl font-bold text-gray-700 text-center py-10">Reports and Analytics</h2>
        } />
        <Route path="settings" element={
          <h2 className="text-2xl font-bold text-gray-700 text-center py-10">Application Settings</h2>
        } />

        {/* Catch-all for any unknown paths under /dashboard */}
        <Route path="*" element={
          <h2 className="text-2xl font-bold text-gray-700 text-center py-10">Dashboard Content Not Found</h2>
        } />
      </Routes>
    </div>
  );
};

export default DashboardContent;
