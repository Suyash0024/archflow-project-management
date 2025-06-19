// client/pages/DashboardPage.tsx
import React from 'react';
import Header from '../components/Header'; // Adjust import path
import Sidebar from '../components/Sidebar'; // Adjust import path
import MainContent from '../components/MainContent'; // Adjust import path

const DashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;